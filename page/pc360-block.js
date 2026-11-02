
/* dg-pc360 2026-11-02: PC 상품 페이지의 '360° 제품보기' · '우리 집에 펼쳐보기' 버튼 → 모바일과 같은 360° 창(가운데 팝업).
   PC는 뒤 카메라가 없어서 코랄 버튼을 누르면 QR 코드가 나오고, 폰으로 찍으면 바로 카메라 AR이 열린다.
   되돌리려면 이 블록만 지우면 된다 (예전 360 보기로 돌아감). */
(function () {
  if (window.__dgPc360) return; window.__dgPc360 = true;
  var BY_NO = { 29: 'active_steps', 33: 'before_sunrise', 34: 'warm_sunlight' };
  var COLS = [['active_steps', 'Active steps', '#2f3542'], ['before_sunrise', 'Before sunrise', '#d9b7a7'], ['warm_sunlight', 'Warm sunlight', '#e7c86a']];
  var OV = null, KEY = 'active_steps', qrLib = null;
  function pno() { return (location.search.match(/product_no=(\d+)/) || location.pathname.match(/\/product\/[^\/]+\/(\d+)\//) || [])[1]; }
  function arUrl(k) { return 'https://m.designgym.co.kr/ar-inapp.html?c=' + k + '&utm_source=pc&utm_medium=qr'; }
  function loadQr(cb) {
    if (window.qrcode) return cb(window.qrcode);
    var s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
    s.onload = function () { cb(window.qrcode); }; document.head.appendChild(s);
  }
  function drawQr() {
    var box = OV.querySelector('.qr i'); box.innerHTML = '';
    loadQr(function (qrcode) { if (!qrcode) return; var q = qrcode(0, 'M'); q.addData(arUrl(KEY)); q.make(); box.innerHTML = q.createSvgTag({ cellSize: 4, margin: 2, scalable: true }); });
  }
  function build() {
    if (OV) return OV;
    var st = document.createElement('style');
    st.textContent = '#dgpc360{position:fixed;inset:0;z-index:2147483000;background:rgba(20,20,20,.55);display:none;align-items:center;justify-content:center;font-family:-apple-system,system-ui,"Apple SD Gothic Neo","Noto Sans KR",sans-serif;-webkit-font-smoothing:antialiased}'
      + '#dgpc360.on{display:flex}'
      + '#dgpc360 .w{position:relative;width:min(560px,92vw);height:min(760px,90vh);background:#f6f3ee;border-radius:20px;display:flex;flex-direction:column;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.35)}'
      + '#dgpc360 model-viewer{display:block;flex:1;width:100%;min-height:0;--poster-color:#f6f3ee;--progress-bar-color:transparent;--progress-bar-height:0px}'
      + '#dgpc360 .t{display:flex;align-items:center;justify-content:space-between;padding:16px 18px 0}'
      + '#dgpc360 .t b{font-size:11px;letter-spacing:.22em;font-weight:500;color:#9a948b}'
      + '#dgpc360 .x{width:38px;height:38px;border-radius:50%;border:0;background:#1a1a1a;color:#fff;font-size:22px;line-height:38px;text-align:center;padding:0;cursor:pointer}'
      + '#dgpc360 .b{padding:0 24px 22px}'
      + '#dgpc360 .h{text-align:center;font-size:12px;color:#9a948b;margin:0 0 12px}'
      + '#dgpc360 .cs{display:flex;justify-content:center;gap:22px;margin:0 0 14px}'
      + '#dgpc360 .c{background:none;border:0;padding:0;display:flex;flex-direction:column;align-items:center;gap:6px;font-family:inherit;color:#777;font-size:12px;cursor:pointer}'
      + '#dgpc360 .c i{width:34px;height:34px;border-radius:50%;border:3px solid transparent;display:block}'
      + '#dgpc360 .c.on{color:#1a1a1a;font-weight:600}#dgpc360 .c.on i{border-color:#1a1a1a}'
      + '#dgpc360 .ar{width:100%;display:flex;align-items:center;justify-content:center;gap:10px;height:58px;border:0;border-radius:12px;background:#EF4B45;color:#fff;font-family:inherit;font-size:17px;font-weight:700;letter-spacing:-.02em;cursor:pointer;box-shadow:0 8px 22px rgba(239,75,69,.33);animation:dgpcp 1.8s ease-in-out infinite}'
      + '#dgpc360 .ar small{display:block;font-size:11.5px;font-weight:400;opacity:.9;margin-top:1px;text-align:left}'
      + '#dgpc360 .ar .cam{width:34px;height:34px;border-radius:50%;background:rgba(255,255,255,.2);display:flex;align-items:center;justify-content:center;flex:0 0 auto}'
      + '@keyframes dgpcp{0%,100%{box-shadow:0 8px 22px rgba(239,75,69,.33)}50%{box-shadow:0 8px 30px rgba(239,75,69,.6)}}'
      + '#dgpc360 .qr{display:none;position:absolute;inset:0;background:rgba(246,243,238,.97);flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:30px}'
      + '#dgpc360 .qr.on{display:flex}'
      + '#dgpc360 .qr i{display:block;width:210px;height:210px;background:#fff;border-radius:14px;padding:12px;box-shadow:0 6px 20px rgba(0,0,0,.08)}'
      + '#dgpc360 .qr i svg{width:100%;height:100%;display:block}'
      + '#dgpc360 .qr b{display:block;font-size:20px;font-weight:700;color:#1a1a1a;margin:22px 0 8px;letter-spacing:-.02em}'
      + '#dgpc360 .qr p{font-size:14px;color:#666;line-height:1.6;margin:0 0 20px}'
      + '#dgpc360 .qr button{border:1.5px solid #1a1a1a;background:none;border-radius:10px;height:44px;padding:0 22px;font-family:inherit;font-size:14px;font-weight:600;cursor:pointer}';
    document.head.appendChild(st);
    var d = document.createElement('div'); d.id = 'dgpc360'; d.setAttribute('aria-hidden', 'true');
    var chips = COLS.map(function (c) { return '<button type="button" class="c" data-k="' + c[0] + '"><i style="background:' + c[2] + '"></i>' + c[1] + '</button>'; }).join('');
    d.innerHTML = '<div class="w"><div class="t"><b>360° VIEW</b><button type="button" class="x" aria-label="닫기">×</button></div>'
      + '<model-viewer camera-controls auto-rotate rotation-per-second="20deg" shadow-intensity="0.35" exposure="0.72" tone-mapping="aces" camera-orbit="35deg 70deg auto" alt="루틴 매트 360도 보기"><div slot="progress-bar"></div></model-viewer>'
      + '<div class="b"><p class="h">드래그해서 돌려보세요</p><div class="cs">' + chips + '</div>'
      + '<button type="button" class="ar"><span class="cam"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8h3l2-3h6l2 3h3v11H4z"/><circle cx="12" cy="13" r="3.2"/></svg></span><span>우리 집에 어울리는지 펼쳐보기<small>폰으로 QR 찍으면 바로 실제 크기로</small></span></button></div>'
      + '<div class="qr"><i></i><b>폰 카메라로 찍어주세요</b><p>바닥을 비추면 이 매트가<br>우리 집에 실제 크기로 펼쳐져요.</p><button type="button" class="back">360° 보기로 돌아가기</button></div></div>';
    document.body.appendChild(d);
    d.addEventListener('click', function (ev) { if (ev.target === d) close(); });
    d.querySelector('.x').addEventListener('click', close);
    d.querySelector('.back').addEventListener('click', function () { d.querySelector('.qr').className = 'qr'; });
    d.querySelector('.ar').addEventListener('click', function () { drawQr(); d.querySelector('.qr').className = 'qr on'; });
    [].forEach.call(d.querySelectorAll('.c'), function (b) { b.addEventListener('click', function () { setKey(b.getAttribute('data-k')); }); });
    document.addEventListener('keydown', function (ev) { if (ev.key === 'Escape' && OV && OV.className === 'on') close(); });
    if (!window.customElements || !customElements.get('model-viewer')) {
      var sc = document.createElement('script'); sc.type = 'module'; sc.src = 'https://nyangnyang.kr/ar/model-viewer.min.js'; document.head.appendChild(sc);
    }
    OV = d; return d;
  }
  function setKey(k) {
    KEY = k; var d = build();
    d.querySelector('model-viewer').setAttribute('src', 'https://nyangnyang.kr/ar/models/mat_' + k + '.glb?v=dg360');
    [].forEach.call(d.querySelectorAll('.c'), function (b) { b.className = 'c' + (b.getAttribute('data-k') === k ? ' on' : ''); });
    if (d.querySelector('.qr').className === 'qr on') drawQr();
  }
  function open(k) { var d = build(); setKey(k || KEY); d.querySelector('.qr').className = 'qr'; d.className = 'on'; d.setAttribute('aria-hidden', 'false'); document.documentElement.style.overflow = 'hidden'; }
  function close() { if (!OV) return; OV.className = ''; OV.setAttribute('aria-hidden', 'true'); document.documentElement.style.overflow = ''; }
  window.addEventListener('click', function (ev) {
    var a = ev.target && ev.target.closest && ev.target.closest('a.dg-ar-pill, a.dgt-btn');
    if (!a) return;
    ev.preventDefault(); ev.stopImmediatePropagation();
    var href = a.getAttribute('href') || '', m = href.match(/[?&]c=([a-z_]+)/);
    open(BY_NO[pno()] || (m && m[1]) || 'active_steps');
  }, true);
})();
