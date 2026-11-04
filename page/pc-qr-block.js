
/* dg-pc-qr 2026-11-04: PC 오버레이의 '내 방에 놓아보기' → 냥냥으로 넘기지 않고 QR 코드 표시
   폰으로 찍으면 모바일 카메라 AR(/ar-inapp.html)이 바로 열린다. 모바일 스킨과 무관.
   ON=false 동안은 주소에 ar_qr=1 을 붙였을 때만 동작 (테스트용). 확정되면 ON=true. 블록을 지우면 예전 방식. */
(function () {
  var ON = false;
  if (/[?&]ar_qr=1/.test(location.search)) ON = true;
  if (/[?&]ar_qr=0/.test(location.search)) ON = false;
  if (!ON) return;

  function key() { var on = document.querySelector('.dg-ar-chip.on[data-key]'); return on ? on.getAttribute('data-key') : 'active_steps'; }
  function arUrl(k) { return 'https://m.designgym.co.kr/ar-inapp.html?c=' + k + '&utm_source=pc&utm_medium=qr'; }
  function loadQr(cb) {
    if (window.qrcode) return cb(window.qrcode);
    var s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.min.js';
    s.onload = function () { cb(window.qrcode || null); };
    s.onerror = function () { cb(null); };
    document.head.appendChild(s);
  }
  function css() {
    if (document.getElementById('dg-pcqr-css')) return;
    var st = document.createElement('style'); st.id = 'dg-pcqr-css';
    st.textContent =
      '.dg-ar-stage{position:relative}' +
      '.dg-pcqr{display:none;position:absolute;inset:0;z-index:5;background:rgba(246,243,238,.97);flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:20px;border-radius:inherit;box-sizing:border-box}' +
      '.dg-pcqr.on{display:flex}' +
      '.dg-pcqr i{display:block;width:180px;height:180px;background:#fff;border-radius:14px;padding:10px;box-shadow:0 6px 20px rgba(0,0,0,.08);box-sizing:border-box}' +
      '.dg-pcqr i svg{width:100%;height:100%;display:block}' +
      '.dg-pcqr b{display:block;font-size:18px;font-weight:700;color:#1a1a1a;margin:16px 0 6px;letter-spacing:-.02em}' +
      '.dg-pcqr p{font-size:13px;color:#666;line-height:1.6;margin:0 0 14px}' +
      '.dg-pcqr button{border:1.5px solid #1a1a1a;background:none;border-radius:10px;height:40px;padding:0 18px;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer;color:#1a1a1a}';
    document.head.appendChild(st);
  }
  function hide() { var q = document.querySelector('.dg-pcqr.on'); if (q) q.classList.remove('on'); }
  function show(sheet) {
    css();
    var host = sheet.querySelector('.dg-ar-stage') || sheet;
    var q = host.querySelector('.dg-pcqr');
    if (!q) {
      q = document.createElement('div'); q.className = 'dg-pcqr';
      q.innerHTML = '<i></i><b>폰 카메라로 찍어주세요</b><p>바닥을 비추면 이 매트가<br>우리 집에 실제 크기로 펼쳐져요.</p><button type="button" class="dg-pcqr-back">360° 보기로 돌아가기</button>';
      q.querySelector('.dg-pcqr-back').addEventListener('click', function (e) { e.preventDefault(); q.classList.remove('on'); });
      host.appendChild(q);
    }
    var box = q.querySelector('i'); box.innerHTML = '';
    loadQr(function (qr) {
      if (!qr) return;
      var g = qr(0, 'M'); g.addData(arUrl(key())); g.make();
      box.innerHTML = g.createSvgTag({ cellSize: 4, margin: 2, scalable: true });
    });
    q.classList.add('on');
  }
  window.addEventListener('click', function (ev) {
    var t = ev.target;
    if (!t || !t.closest) return;
    var a = t.closest('a.dg-ar-go, a.dg-ar-live');
    if (a && a.closest('.dg-ar-sheet')) {
      ev.preventDefault(); ev.stopImmediatePropagation();
      show(a.closest('.dg-ar-sheet'));
      return;
    }
    if (t.closest('a.dg-ar-pill, a.dgt-btn, .dg-ar-x, .dg-ar-dim, .dg-ar-scrim')) { hide(); return; }
    var c = t.closest('.dg-ar-chip');
    if (c) { var q = document.querySelector('.dg-pcqr.on'); if (q) setTimeout(function () { show(q.closest('.dg-ar-sheet') || document); }, 0); }
  }, true);
})();
