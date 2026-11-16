/* dg-nopay 2026-11-16: 로그인 등으로 N pay·카카오 버튼이 안 나올 때, 구매창을 선물하기처럼 [장바구니 아이콘][구매하기] 한 줄로. 버튼 동작은 그대로(모양만). 되돌리려면 이 블록 삭제 */
(function(){try{
var st=document.createElement('style');st.id='dg-nopay';
st.textContent='.buy-popup.dg-mode-buy.dg-nopay #fixedActionButton #NaverChk_Button,.buy-popup.dg-mode-buy.dg-nopay #fixedActionButton #appPaymentButtonBox{position:absolute!important;left:0;top:0;width:1px!important;height:1px!important;overflow:hidden!important;opacity:0!important;pointer-events:none!important}'
+'.buy-popup.dg-mode-buy.dg-nopay #fixedActionButton{flex-wrap:nowrap!important;position:relative}'
+'.buy-popup.dg-mode-buy.dg-nopay #fixedActionButton #actionCart{order:1!important;flex:0 0 52px!important;width:52px!important;height:52px!important;border-color:#333!important;background-position:center center!important}'
+'.buy-popup.dg-mode-buy.dg-nopay #fixedActionButton #actionCart::after{content:none!important;display:none!important}'
+'.buy-popup.dg-mode-buy.dg-nopay #fixedActionButton .detail-btn--buy{order:2!important;flex:1 1 0!important;min-width:0}';
document.head.appendChild(st);
function shown(s){var e=document.querySelector(s);return !!(e&&e.offsetHeight>0);}
function check(){var p=document.querySelector('.buy-popup');if(!p)return;
 var pay=shown('#NaverChk_Button a.npay_btn_pay')||shown('#appPaymentButtonBox .__checkout_btn_buy');
 var has=p.classList.contains('dg-nopay');if(pay&&has)p.classList.remove('dg-nopay');else if(!pay&&!has)p.classList.add('dg-nopay');}
function start(){check();var n=0,t=setInterval(function(){check();if(++n>20)clearInterval(t);},500);
 var p=document.querySelector('.buy-popup');if(p&&window.MutationObserver){new MutationObserver(check).observe(p,{attributes:true,attributeFilter:['class']});
  ['NaverChk_Button','appPaymentButtonBox'].forEach(function(id){var b=document.getElementById(id);if(b)new MutationObserver(check).observe(b,{childList:true,subtree:true,attributes:true});});}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
}catch(e){}})();
