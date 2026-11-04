
/* dg-pay2 2026-11-04: 모바일 구매창의 네이버페이·카카오페이 버튼을 깔끔한 2칸 버튼으로 (keepyourfit 스타일)
   원래 버튼은 화면 밖에 그대로 두고, 새 버튼을 누르면 원래 버튼을 눌러준다 → 결제 흐름은 카페24·네이버·카카오 그대로.
   선물 모드처럼 원래 버튼이 숨겨지면 새 버튼도 같이 숨는다.
   ON=false 동안은 주소에 pay_ui=1 을 붙였을 때만 동작 (테스트용). 블록을 지우면 원래 버튼으로 돌아간다. */
(function () {
  var ON = false;
  if (/[?&]pay_ui=1/.test(location.search)) ON = true;
  if (/[?&]pay_ui=0/.test(location.search)) ON = false;
  if (!ON) return;

  var css =
    'html.dg-pay2 #fixedActionButton #NaverChk_Button,html.dg-pay2 #fixedActionButton #appPaymentButtonBox{position:absolute!important;left:-9999px!important;top:0!important;width:360px!important;height:1px!important;overflow:hidden!important;margin:0!important}' +
    '.dg-pay2-row{display:flex;gap:10px;margin:10px 0 0}' +
    '.dg-pay2-row button{flex:1 1 0;min-width:0;height:54px;border:0;border-radius:12px;display:flex;align-items:center;justify-content:center;gap:8px;font-family:inherit;font-size:17px;font-weight:700;letter-spacing:-.02em;cursor:pointer;-webkit-tap-highlight-color:transparent}' +
    '.dg-pay2-row button[hidden]{display:none}' +
    '.dg-pay2-n{background:#03C75A;color:#fff}' +
    '.dg-pay2-n i{width:24px;height:24px;border-radius:50%;background:#fff;color:#03C75A;font-style:normal;font-weight:900;font-size:14px;display:flex;align-items:center;justify-content:center}' +
    '.dg-pay2-k{background:#FEE500;color:#191919}' +
    '.dg-pay2-row button:active{filter:brightness(.95)}';

  function shown(el, stop) {
    for (var x = el; x && x !== stop; x = x.parentElement) {
      if (getComputedStyle(x).display === 'none') return false;
    }
    return !!el;
  }
  function npay() { return document.querySelector('#fixedActionButton #NaverChk_Button .npay_btn_pay'); }
  function kpay() { return document.querySelector('#fixedActionButton #appPaymentButtonBox .__checkout_btn_buy'); }

  var row = null;
  function build() {
    var fx = document.getElementById('fixedActionButton');
    var nb = document.querySelector('#fixedActionButton #NaverChk_Button');
    if (!fx || !nb || row) return;
    var st = document.createElement('style'); st.id = 'dg-pay2-css'; st.textContent = css; document.head.appendChild(st);
    row = document.createElement('div'); row.className = 'dg-pay2-row';
    row.innerHTML =
      '<button type="button" class="dg-pay2-n" hidden><i>N</i>pay 구매</button>' +
      '<button type="button" class="dg-pay2-k" hidden><svg width="22" height="20" viewBox="0 0 24 22" aria-hidden="true"><path fill="#191919" d="M12 1C5.9 1 1 4.9 1 9.7c0 3.1 2 5.8 5.1 7.3l-1.1 4c-.1.4.3.7.6.5l4.7-3.1c.6.1 1.1.1 1.7.1 6.1 0 11-3.9 11-8.8S18.1 1 12 1z"/></svg>간편구매</button>';
    fx.insertBefore(row, nb);
    document.documentElement.classList.add('dg-pay2');
    row.querySelector('.dg-pay2-n').addEventListener('click', function () { var b = npay(); if (b) b.click(); });
    row.querySelector('.dg-pay2-k').addEventListener('click', function () { var b = kpay(); if (b) b.click(); });
    sync();
    setInterval(sync, 400);
  }
  function sync() {
    if (!row) return;
    var fx = document.getElementById('fixedActionButton');
    var n = npay(), k = kpay();
    var nOn = !!n && shown(n, fx), kOn = !!k && shown(k, fx);
    row.querySelector('.dg-pay2-n').hidden = !nOn;
    row.querySelector('.dg-pay2-k').hidden = !kOn;
    row.style.display = (nOn || kOn) ? '' : 'none';
  }
  var tries = 0;
  (function wait() {
    build();
    if (!row && ++tries < 60) setTimeout(wait, 250);
  })();
})();
