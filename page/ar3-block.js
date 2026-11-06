
/* dg-ar3 2026-11-06: 매트 AR — 사진 위 '우리 집에 펼쳐보기' 버튼 → 360° 미리보기 창 → '내 방에 놓아보기'
   - 모바일: 카메라 AR 페이지(/ar-inapp.html)로 가는 일반 링크 / PC: 폰으로 찍는 QR 코드
   - 외부 파일은 jsDelivr(버전·커밋 고정)에서만 받음. 기기(UA) 구분, 전역 함수 덮어쓰기, 다른 링크 클릭 가로채기, 자동 이동 없음.
   - 이 블록을 통째로 지우면 AR 버튼이 사라진다. 구매·장바구니 버튼은 건드리지 않는다. */
(function () {
  'use strict';
  var TEST = true;   /* 테스트 중: 주소에 ar3=1 이 있을 때만 동작. 실제 적용 때 이 두 줄을 지운다 */
  if (TEST && !/[?&]ar3=1/.test(location.search)) return;

  var PC = __PC__;   /* PC 스킨 파일은 true, 모바일 스킨 파일은 false (스킨 파일이 달라서 나누는 것, 기기 감지 아님) */
  var CDN = 'https://cdn.jsdelivr.net/gh/koreanolleh/designgym-ar@01e4d5c7bda6edfe610e91d818ca92d12eba914c/assets/';
  var MV_SRC = CDN + 'model-viewer.min.js';
  var QR_SRC = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
  var ITEMS = { '29': 'active_steps', '33': 'before_sunrise', '34': 'warm_sunlight' };
  var COLORS = [
    { k: 'active_steps', n: 'Active steps' },
    { k: 'before_sunrise', n: 'Before sunrise' },
    { k: 'warm_sunlight', n: 'Warm sunlight' }
  ];

  function productNo() {
    var m = document.querySelector('meta[property="product:retailer_item_id"]');
    if (m && m.content) return String(m.content).trim();
    var q = location.search.match(/[?&]product_no=(\d+)/) || location.pathname.match(/\/product\/[^\/]+\/(\d+)\//);
    return q ? q[1] : '';
  }
  var cur = ITEMS[productNo()];
  if (!cur) return;

  function arPage(k) { return (PC ? 'https://m.designgym.co.kr' : '') + '/ar-inapp.html?c=' + k; }

  /* ---------- 스타일 ---------- */
  function css() {
    if (document.getElementById('dg3-css')) return;
    var s = document.createElement('style'); s.id = 'dg3-css';
    s.textContent =
      '.dg-ar-pill{position:absolute;top:14px;right:14px;z-index:5;display:flex;align-items:center;gap:7px;cursor:pointer;font-family:inherit;line-height:1;-webkit-tap-highlight-color:transparent}' +
      '.dg-ar-pill svg{flex:none}' +
      '.dg3-scrim{position:fixed;inset:0;z-index:2147483000;background:rgba(0,0,0,.45);opacity:0;pointer-events:none;transition:opacity .25s}' +
      '.dg3-scrim.on{opacity:1;pointer-events:auto}' +
      '.dg3-sheet{position:fixed;left:0;right:0;bottom:0;z-index:2147483001;background:#fff;border-radius:22px 22px 0 0;padding:10px 16px calc(16px + env(safe-area-inset-bottom,0px));box-sizing:border-box;transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.8,.2,1);max-height:92vh;overflow:auto;font-family:inherit;color:#1a1a1a}' +
      '.dg3-sheet.on{transform:none}' +
      '.dg3-grip{display:block;width:44px;height:5px;border-radius:3px;background:#ddd;margin:0 auto 10px}' +
      '@media (min-width:768px){.dg3-sheet{left:50%;right:auto;bottom:auto;top:50%;width:460px;border-radius:20px;padding:16px 16px 18px;transform:translate(-50%,-46%);opacity:0;pointer-events:none;transition:transform .25s,opacity .25s}.dg3-sheet.on{transform:translate(-50%,-50%);opacity:1;pointer-events:auto}.dg3-grip{display:none}}' +
      '.dg3-head{position:relative;text-align:center;padding:2px 36px 12px}' +
      '.dg3-head b{display:block;font-size:17px;font-weight:700;letter-spacing:-.02em}' +
      '.dg3-head small{display:block;margin-top:4px;font-size:12.5px;color:#888;letter-spacing:-.01em}' +
      '.dg3-x{position:absolute;top:-2px;right:0;width:36px;height:36px;border:0;background:none;font-size:24px;line-height:36px;color:#999;cursor:pointer;padding:0}' +
      '.dg3-stage{position:relative;height:min(52vh,380px);border-radius:16px;overflow:hidden;background:radial-gradient(ellipse at 50% 35%,#3a3632,#1f1d1b 75%)}' +
      '.dg3-stage model-viewer{width:100%;height:100%;--poster-color:transparent;background:transparent}' +
      '.dg3-size{position:absolute;left:50%;bottom:12px;transform:translateX(-50%);padding:6px 12px;border-radius:999px;background:rgba(0,0,0,.45);color:#fff;font-size:12px;pointer-events:none}' +
      '.dg3-load{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;color:rgba(255,255,255,.7);font-size:13px;pointer-events:none}' +
      '.dg3-chips{display:flex;gap:8px;margin-top:12px}' +
      '.dg3-chip{flex:1;min-width:0;border:1.5px solid #e6e6e6;background:#fff;border-radius:12px;padding:6px 6px 8px;cursor:pointer;font-family:inherit}' +
      '.dg3-chip img{display:block;width:100%;height:30px;object-fit:cover;border-radius:6px}' +
      '.dg3-chip span{display:block;margin-top:6px;font-size:12px;color:#777;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}' +
      '.dg3-chip.on{border-color:#1a1a1a}.dg3-chip.on span{color:#1a1a1a;font-weight:700}' +
      '.dg3-help{margin-top:12px;border-top:1px solid #eee;padding-top:10px;font-size:13px;color:#666}' +
      '.dg3-help summary{cursor:pointer;list-style:none;color:#888}.dg3-help summary::-webkit-details-marker{display:none}' +
      '.dg3-help p{margin:8px 0 0;line-height:1.6}' +
      '.dg3-go{display:flex;align-items:center;justify-content:center;width:100%;height:52px;margin-top:12px;border:0;border-radius:12px;background:#1a1a1a;color:#fff!important;font-size:16px;font-weight:700;text-decoration:none!important;letter-spacing:-.02em;cursor:pointer;font-family:inherit;box-sizing:border-box}' +
      '.dg3-qr{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;justify-content:center;text-align:center;background:#F6F3EE;padding:20px;box-sizing:border-box}' +
      '.dg3-qr.on{display:flex}' +
      '.dg3-qr i{display:block;width:180px;height:180px;background:#fff;border-radius:14px;padding:10px;box-shadow:0 6px 20px rgba(0,0,0,.08);box-sizing:border-box}' +
      '.dg3-qr i svg{width:100%;height:100%;display:block}' +
      '.dg3-qr b{display:block;font-size:18px;font-weight:700;margin:16px 0 6px;letter-spacing:-.02em}' +
      '.dg3-qr p{font-size:13px;color:#666;line-height:1.6;margin:0 0 14px}' +
      '.dg3-qr button{border:1.5px solid #1a1a1a;background:none;border-radius:10px;height:40px;padding:0 18px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;color:#1a1a1a}' +
      'html.dg3-lock,html.dg3-lock body{overflow:hidden!important}';
    document.head.appendChild(s);
  }

  var ICON = '<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#333" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l8 4.5v9L12 21l-8-4.5v-9z"/><path d="M4 7.5l8 4.5 8-4.5M12 12v9"/></svg>';

  /* ---------- 사진 위 버튼 ---------- */
  function placePill() {
    if (document.querySelector('.dg-ar-pill')) return true;
    var host = document.querySelector('.xans-product-addimage.detail-img') || document.querySelector('.xans-product-image');
    if (!host) return false;
    if (getComputedStyle(host).position === 'static') host.style.position = 'relative';
    var b = document.createElement('button');
    b.type = 'button';
    b.className = 'dg-ar-pill';
    b.innerHTML = ICON + '<span>우리 집에 펼쳐보기</span>';
    b.addEventListener('click', function (e) { e.preventDefault(); openSheet(); });
    host.appendChild(b);
    return true;
  }

  /* ---------- 360° 미리보기 창 ---------- */
  var el = null, mvLoading = null;
  function loadScript(src, module) {
    return new Promise(function (res, rej) {
      var s = document.createElement('script');
      if (module) s.type = 'module';
      s.src = src; s.onload = res; s.onerror = rej;
      document.head.appendChild(s);
    });
  }
  function build() {
    if (el) return el;
    var scrim = document.createElement('div'); scrim.className = 'dg3-scrim';
    var sheet = document.createElement('div'); sheet.className = 'dg3-sheet';
    sheet.setAttribute('role', 'dialog'); sheet.setAttribute('aria-modal', 'true'); sheet.setAttribute('aria-label', '360° 제품보기');
    var chips = COLORS.map(function (c) {
      return '<button type="button" class="dg3-chip" data-k="' + c.k + '"><img src="' + CDN + 'thumbs/' + c.k + '.jpg" alt=""><span>' + c.n + '</span></button>';
    }).join('');
    sheet.innerHTML =
      '<span class="dg3-grip"></span>' +
      '<div class="dg3-head"><b>360° 제품보기</b><small>183 × 61cm · 두께 8mm · 손가락으로 돌려보세요</small><button type="button" class="dg3-x" aria-label="닫기">×</button></div>' +
      '<div class="dg3-stage"><div class="dg3-load">불러오는 중…</div><span class="dg3-size">183 × 61 cm</span>' +
        (PC ? '<div class="dg3-qr"><i></i><b>폰 카메라로 찍어주세요</b><p>바닥을 비추면 이 매트가<br>우리 집에 실제 크기로 펼쳐져요.</p><button type="button" class="dg3-back">360° 보기로 돌아가기</button></div>' : '') +
      '</div>' +
      '<div class="dg3-chips">' + chips + '</div>' +
      '<details class="dg3-help"><summary>사용 방법 ⌄</summary><p>' +
        (PC ? '아래 버튼을 누르면 QR 코드가 나와요. 폰 카메라로 찍으면 카메라가 열리고, 바닥을 비추면 매트가 실제 크기로 놓여요.'
            : '아래 버튼을 누르면 카메라 화면이 열려요. 카메라 켜기를 누르고 바닥을 비춘 뒤 화면을 톡 누르면 매트가 실제 크기로 놓여요.') +
      '</p></details>' +
      (PC ? '<button type="button" class="dg3-go">내 방에 놓아보기</button>'
          : '<a class="dg3-go" href="' + arPage(cur) + '">내 방에 놓아보기</a>');
    document.body.appendChild(scrim); document.body.appendChild(sheet);
    scrim.addEventListener('click', close);
    sheet.querySelector('.dg3-x').addEventListener('click', close);
    [].forEach.call(sheet.querySelectorAll('.dg3-chip'), function (b) {
      b.addEventListener('click', function () { setColor(b.getAttribute('data-k')); });
    });
    if (PC) {
      sheet.querySelector('.dg3-go').addEventListener('click', showQr);
      sheet.querySelector('.dg3-back').addEventListener('click', function () { sheet.querySelector('.dg3-qr').classList.remove('on'); });
    }
    el = { scrim: scrim, sheet: sheet, stage: sheet.querySelector('.dg3-stage'), mv: null };
    return el;
  }
  function ensureViewer() {
    var e = build();
    if (e.mv) return;
    if (!mvLoading) mvLoading = loadScript(MV_SRC, true);
    var mv = document.createElement('model-viewer');
    var attrs = {
      alt: '디자인짐 루틴 매트 3D 모델', 'camera-controls': '', 'touch-action': 'pan-y', 'interaction-prompt': 'none',
      'auto-rotate': '', 'auto-rotate-delay': '2500', 'rotation-per-second': '6deg', 'interpolation-decay': '160',
      'camera-orbit': '35deg 62deg 108%', 'camera-target': '0m -0.07m 0m',
      'min-camera-orbit': 'auto 0deg 70%', 'max-camera-orbit': 'auto 88deg 180%',
      'shadow-intensity': '1.1', 'shadow-softness': '0.7', exposure: '1.05'
    };
    Object.keys(attrs).forEach(function (k) { mv.setAttribute(k, attrs[k]); });
    mv.setAttribute('src', CDN + 'models/mat_' + cur + '.glb');
    mv.addEventListener('load', function () { var l = e.stage.querySelector('.dg3-load'); if (l) l.style.display = 'none'; });
    e.stage.insertBefore(mv, e.stage.firstChild);
    e.mv = mv;
    mvLoading['catch'](function () { var l = e.stage.querySelector('.dg3-load'); if (l) l.textContent = '3D 미리보기를 불러오지 못했어요.'; });
  }
  function setColor(k) {
    cur = k;
    var e = build();
    if (e.mv) e.mv.setAttribute('src', CDN + 'models/mat_' + k + '.glb');
    [].forEach.call(e.sheet.querySelectorAll('.dg3-chip'), function (b) { b.classList.toggle('on', b.getAttribute('data-k') === k); });
    var go = e.sheet.querySelector('a.dg3-go'); if (go) go.setAttribute('href', arPage(k));
    if (PC && e.sheet.querySelector('.dg3-qr.on')) drawQr();
  }
  function drawQr() {
    var box = el.sheet.querySelector('.dg3-qr i'); box.innerHTML = '';
    var go = window.qrcode ? Promise.resolve() : loadScript(QR_SRC, false);
    go.then(function () {
      if (!window.qrcode) return;
      var q = window.qrcode(0, 'M'); q.addData(arPage(cur)); q.make();
      box.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
    })['catch'](function () {});
  }
  function showQr() { drawQr(); el.sheet.querySelector('.dg3-qr').classList.add('on'); }

  function openSheet() {
    css();
    var e = build();
    ensureViewer();
    setColor(cur);
    var q = e.sheet.querySelector('.dg3-qr'); if (q) q.classList.remove('on');
    document.documentElement.classList.add('dg3-lock');
    e.scrim.classList.add('on'); e.sheet.classList.add('on');
  }
  function close() {
    if (!el) return;
    el.scrim.classList.remove('on'); el.sheet.classList.remove('on');
    document.documentElement.classList.remove('dg3-lock');
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') close(); });
  window.addEventListener('pageshow', function () { close(); });   /* 카메라 페이지에서 뒤로 왔을 때 창이 열린 채로 남지 않게 */

  /* ---------- 시작: 사진 영역이 그려질 때까지 잠깐 기다렸다가 버튼을 붙인다 ---------- */
  css();
  var tries = 0;
  (function wait() { if (!placePill() && ++tries < 40) setTimeout(wait, 250); })();
})();
