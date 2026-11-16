(function(){
const I=['https://designgym.co.kr/web/product/option_button/202607/285e1dc4bb84097ac57c4695ed74ad1d.jpg','https://designgym.co.kr/web/product/option_button/202607/798fe6a1817631dd00006eba887658f3.jpg','https://designgym.co.kr/web/product/option_button/202607/cc3aad185665d62cb19a8212b2f00e2a.jpg'];
const G='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="9" width="16" height="11"/><path d="M3 9h18M12 9v11M12 9c-2-4-6-4-6-1.5S12 9 12 9zm0 0c2-4 6-4 6-1.5S12 9 12 9z"/></svg>';
const C='<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#222" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 4h2.6l2.3 10.4h10.4l2-7.4H6.2"/><circle cx="9" cy="19" r="1.4"/><circle cx="17" cy="19" r="1.4"/></svg>';
const K='<svg width="18" height="16" viewBox="0 0 24 22"><path d="M12 1C5.9 1 1 4.9 1 9.7c0 3.1 2 5.8 5.1 7.3l-1.1 4c-.1.4.3.7.6.5l4.7-3.1c.6.1 1.1.1 1.7.1 6.1 0 11-3.9 11-8.8S18.1 1 12 1z" fill="#191919"/></svg>';
const CSS=`#dgsb-mock{font-family:'Noto Sans KR',sans-serif;color:#111;position:fixed;left:0;right:0;bottom:0;z-index:9999}
#dgsb-mock .dr{background:#fff;border-top:1px solid #e5e5e5;box-shadow:0 -10px 30px rgba(0,0,0,.08);position:relative}
#dgsb-mock .hdl{position:absolute;left:50%;top:-34px;transform:translateX(-50%);width:120px;height:34px;background:#fff;border:1px solid #e5e5e5;border-bottom:0;display:flex;align-items:center;justify-content:center}
#dgsb-mock .din{max-width:1280px;margin:0 auto;padding:24px 40px 22px;display:grid;grid-template-columns:minmax(0,1fr) 450px;gap:60px}
#dgsb-mock .lb{font-size:14px;font-weight:700;margin-bottom:12px}#dgsb-mock .lb span{font-weight:400;color:#555}
#dgsb-mock .ch{display:flex;gap:10px}
#dgsb-mock .ch div{width:96px;text-align:center;font-size:11.5px;color:#888;border:1px solid #ddd;padding:3px}
#dgsb-mock .ch div.on{border:2px solid #111;color:#111;font-weight:600}
#dgsb-mock .ch img{width:100%;height:68px;object-fit:cover;display:block;margin-bottom:3px}
#dgsb-mock .it{display:flex;justify-content:space-between;align-items:center;font-size:14px;border-top:1px solid #e5e5e5;border-bottom:1px solid #e5e5e5;padding:12px 0}
#dgsb-mock .tot{text-align:right;padding:12px 0 14px;font-size:14px}#dgsb-mock .tot b{font-size:20px;font-weight:600}
#dgsb-mock .r{display:flex;gap:6px;margin-top:6px}
#dgsb-mock .b{height:52px;flex:1;display:flex;align-items:center;justify-content:center;gap:6px;border:1px solid #333;background:#fff;font-size:15px;font-weight:600}
#dgsb-mock .buy{background:#EF4B45;border-color:#EF4B45;color:#fff;font-weight:500;font-size:16px}
#dgsb-mock .np{background:#03C75A;border-color:#03C75A;color:#fff;font:800 16px Arial}
#dgsb-mock .np i{display:inline-flex;width:18px;height:18px;border-radius:50%;background:#fff;color:#03C75A;font:800 11px Arial;font-style:normal;align-items:center;justify-content:center}
#dgsb-mock .kk{background:#FEE500;border-color:#FEE500;font-size:14px;font-weight:700}
#dgsb-mock .gb{border-color:#EF4B45;color:#EF4B45;font-weight:700}
#dgsb-mock .nt{font-size:12px;color:#888;margin-top:8px;text-align:right}
#dgsb-mock .bar{background:#fff;border-top:1px solid #eee}
#dgsb-mock .bin{max-width:1280px;margin:0 auto;padding:12px 40px;display:flex;align-items:center;gap:10px}
#dgsb-mock .bin img{width:48px;height:48px;object-fit:cover;margin-right:6px}
#dgsb-mock .t{flex:1;font-size:15px;font-weight:500}#dgsb-mock .t small{display:block;font-size:12.5px;color:#888;font-weight:400}
#dgsb-mock .pp{font-size:19px;font-weight:700;margin-right:14px}#dgsb-mock .pp s{font-size:13px;color:#999;font-weight:400;margin-right:6px}
#dgsb-mock .bb{width:150px;flex:none}#dgsb-mock .bb.buy{width:230px}`;
window.__mock=function(mode){var o=document.getElementById('dgsb-mock');if(o)o.remove();
var gift=mode==='gift',open=mode!=='closed';
var drawer='<div class="dr"><div class="hdl"><svg width="22" height="12" viewBox="0 0 22 12"><path d="M1 1l10 10L21 1" fill="none" stroke="#555" stroke-width="1.6"/></svg></div><div class="din">'+
'<div><div class="lb">디자인 스타일 <span>: 2. Before sunrise</span></div><div class="ch"><div><img src="'+I[0]+'">1. Active steps</div><div class="on"><img src="'+I[1]+'">2. Before sunrise</div><div><img src="'+I[2]+'">3. Warm sunlight</div></div></div>'+
'<div><div class="it"><div>디자인짐 루틴 매트<br><span style="color:#888">2. Before sunrise</span></div><div>−&nbsp;&nbsp;1&nbsp;&nbsp;+</div><div>58,000원</div></div><div class="tot">Total : <b>58,000원</b> (1개)</div>'+
(gift?'<div class="r"><div class="b" style="flex:0 0 52px">'+C+'</div><div class="b gb">'+G+'바로 선물하기</div></div><div class="nt">받는 분 연락처만 입력하면, 주소는 받는 분이 직접 입력해요</div>'
:'<div class="r"><div class="b buy">구매하기</div></div><div class="r"><div class="b">'+C+'장바구니</div><div class="b np"><i>N</i>pay</div><div class="b kk">'+K+'톡 구매</div></div>')+'</div></div></div>';
var bar='<div class="bar"><div class="bin"><img src="https://designgym.co.kr/web/product/big/202610/20a859c8c353232e95a4c4cf0935cccb.jpg"><div class="t">디자인짐 루틴 매트<small>8mm TPE 스웨이드 요가매트 · 3가지 디자인</small></div><div class="pp"><s>79,000원</s>58,000원</div><div class="b bb">'+G+'선물하기</div><div class="b bb buy">구매하기</div></div></div>';
var b=document.createElement('div');b.id='dgsb-mock';b.innerHTML='<style>'+CSS+'</style>'+(open?drawer:bar);document.body.appendChild(b);};
})();
