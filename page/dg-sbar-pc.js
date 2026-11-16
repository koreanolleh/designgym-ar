/* dg-sbar 2026-11-16 PC: 하단 고정 구매바 (선물하기/구매하기 → 원래 옵션·버튼을 하단 서랍으로 잠깐 옮겨 보여줌, 닫으면 제자리 복귀) */
(function(){try{
if(window.__dgsb)return;window.__dgsb=1;
function init(){
var ia=document.querySelector('.xans-product-detail .infoArea');if(!ia)return;
var act=ia.querySelector('.xans-product-action');if(!act)return;
var nodes=[ia.querySelector('table.xans-product-option'),document.getElementById('totalProducts'),document.getElementById('totalPrice'),ia.querySelector('.EC-price-warning'),act].filter(function(n){return n&&n.parentNode===ia;});
if(nodes.indexOf(act)<0)return;
var nameEl=ia.querySelector('.product-name');var name=nameEl?(nameEl.innerText||'').trim().split('\n')[0]:document.title;
var og=document.querySelector('meta[property="og:image"]');var img=og?og.content:'';
var pr=[];var pd=ia.querySelector('.xans-product-detail')||ia;[].forEach.call(pd.querySelectorAll('*'),function(e){if(!e.children.length){var t=(e.textContent||'').trim();if(/^[\d,]+원$/.test(t)&&pr.length<2&&e.offsetParent)pr.push(t);}});
var sale=pr.length>1?pr[1]:pr[0]||'',orig=pr.length>1?pr[0]:'';
var ddt=((ia.querySelector('.info-dropdown')||{}).textContent||'').replace(/\s+/g,' ');
var m1=ddt.match(/소비자가 ([\d,]+원)/),m2=ddt.match(/판매가 ([\d,]+원)/),m3=ddt.match(/배송비 (.+?)(?= 배송 ·| 상품|$)/);
if(m2){sale=m2[1];orig=(m1&&m1[1]!==m2[1])?m1[1]:'';}
var ship=m3?m3[1].trim():'';
var pct='';try{var a=+orig.replace(/\D/g,''),b=+sale.replace(/\D/g,'');if(a>b&&b)pct=Math.round((a-b)/a*100)+'%';}catch(e){}
var sold=!!act.querySelector('.btn-action--soldout:not(.displaynone)')||!!act.querySelector('.btn-action.buy.displaynone');
var hasGift=!!act.querySelector('.dg-gift-btn');
var G='<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="9" width="16" height="11"/><path d="M3 9h18M12 9v11M12 9c-2-4-6-4-6-1.5S12 9 12 9zm0 0c2-4 6-4 6-1.5S12 9 12 9z"/></svg>';
var css=document.createElement('style');css.id='dgsb-css';css.textContent=
'#dgsb{position:fixed;left:0;right:0;bottom:0;z-index:9990;font-family:inherit;color:#111;transform:translateY(110%);transition:transform .25s ease}'+
'#dgsb.show{transform:none}'+
'#dgsb .dgsb-bar{background:#fff;border-top:1px solid #e5e5e5;box-shadow:0 -6px 20px rgba(0,0,0,.06)}'+
'#dgsb .dgsb-bin{max-width:1280px;margin:0 auto;padding:12px 40px;display:flex;align-items:center;gap:10px;box-sizing:border-box}'+
'#dgsb .dgsb-bin img{width:48px;height:48px;object-fit:cover;margin-right:6px;flex:none}'+
'#dgsb .dgsb-t{flex:1;min-width:0;font-size:15px;font-weight:500;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'+
'#dgsb .dgsb-pp{font-size:19px;font-weight:700;margin-right:14px;white-space:nowrap}#dgsb .dgsb-pp s{font-size:13px;color:#999;font-weight:400;margin-right:6px}'+
'#dgsb .dgsb-b{height:52px;display:flex;align-items:center;justify-content:center;gap:6px;border:1px solid #333;background:#fff;font-size:15px;font-weight:600;width:150px;cursor:pointer;flex:none;box-sizing:border-box;color:#111;font-family:inherit}'+
'#dgsb .dgsb-b.buy{background:#EF4B45;border-color:#EF4B45;color:#fff;font-weight:500;font-size:16px;width:230px}'+
'#dgsb .dgsb-b.off{background:#ddd;border-color:#ddd;color:#777;cursor:default}'+
'#dgsb-dr{position:fixed;left:0;right:0;bottom:0;z-index:9991;background:#fff;border-top:1px solid #e5e5e5;box-shadow:0 -10px 30px rgba(0,0,0,.10);transform:translateY(calc(100% + 60px));visibility:hidden;transition:transform .28s ease,visibility 0s .28s;max-height:80vh}'+
'#dgsb-dr.open{transform:none;visibility:visible;transition:transform .28s ease}'+
'#dgsb-dr .dgsb-hdl{position:absolute;left:50%;top:-34px;transform:translateX(-50%);width:120px;height:34px;background:#fff;border:1px solid #e5e5e5;border-bottom:0;display:flex;align-items:center;justify-content:center;cursor:pointer}'+
'#dgsb-dr .dgsb-din{max-width:1280px;margin:0 auto;padding:22px 40px 20px;display:grid;grid-template-columns:minmax(0,1fr) 520px;gap:60px;box-sizing:border-box;max-height:80vh;overflow:auto}'+
'#dgsb-dr .dgsb-L>*,#dgsb-dr .dgsb-R>*{margin-top:0!important}'+
'#dgsb-dr .dgsb-R table.xans-product-option{width:100%;border-top:0!important}'+'#dgsb-dr .dgsb-info{display:flex;gap:18px;align-items:flex-start}'+'#dgsb-dr .dgsb-info img{width:96px;height:96px;object-fit:cover;flex:none}'+'#dgsb-dr .dgsb-nm{font-size:17px;font-weight:500;line-height:1.45;margin-bottom:10px;word-break:keep-all}'+'#dgsb-dr .dgsb-pr{font-size:22px;font-weight:700;margin-bottom:16px}#dgsb-dr .dgsb-pr s{font-size:14px;color:#999;font-weight:400;margin-right:8px}#dgsb-dr .dgsb-pr em{font-style:normal;color:#EF4B45;margin-right:6px}'+'#dgsb-dr .dgsb-rows{border-top:1px solid #eee;padding-top:12px;font-size:13.5px;line-height:1.9;color:#333}#dgsb-dr .dgsb-rows b{display:inline-block;width:64px;color:#888;font-weight:400}'+
'#dgsb-dr.m-buy .dg-gift-btn,#dgsb-dr.m-buy .btn-action--wish{display:none!important}'+
'#dgsb-dr.m-buy .xans-product-action .btn-action.buy{order:1!important}'+
'#dgsb-dr.m-buy .xans-product-action .btn-action--cart{order:2!important;flex:1 1 0!important;display:flex!important;align-items:center;justify-content:center;width:auto!important;background-position:calc(50% - 34px) center!important}'+
'#dgsb-dr.m-buy .xans-product-action .btn-action--cart::after{content:"장바구니";font-size:15px;font-weight:600;color:#222;margin-left:30px}'+
'#dgsb-dr.m-buy #NaverChk_Button{order:3!important}#dgsb-dr.m-buy #appPaymentButtonBox{order:4!important}'+
'#dgsb-dr.m-gift .btn-action.buy,#dgsb-dr.m-gift .btn-action--wish,#dgsb-dr.m-gift #NaverChk_Button,#dgsb-dr.m-gift #appPaymentButtonBox{display:none!important}'+
'#dgsb-dr.m-gift .xans-product-action .btn-action--cart{order:1!important}#dgsb-dr.m-gift .dg-gift-btn{order:2!important;border-color:#EF4B45!important;color:#EF4B45!important}';
document.head.appendChild(css);
var bar=document.createElement('div');bar.id='dgsb';
bar.innerHTML='<div class="dgsb-bar"><div class="dgsb-bin">'+(img?'<img src="'+img+'" alt="">':'')+'<div class="dgsb-t"></div><div class="dgsb-pp">'+(orig?'<s>'+orig+'</s>':'')+sale+'</div>'+
(sold?'<div class="dgsb-b buy off">품절</div>':(hasGift?'<button type="button" class="dgsb-b" data-m="gift">'+G+'선물하기</button>':'')+'<button type="button" class="dgsb-b buy" data-m="buy">구매하기</button>')+'</div></div>';
bar.querySelector('.dgsb-t').textContent=name;
var dr=document.createElement('div');dr.id='dgsb-dr';
dr.innerHTML='<div class="dgsb-hdl" title="닫기"><svg width="22" height="12" viewBox="0 0 22 12"><path d="M1 1l10 10L21 1" fill="none" stroke="#555" stroke-width="1.6"/></svg></div><div class="dgsb-din"><div class="dgsb-L"></div><div class="dgsb-R"></div></div>';
var L0=dr.querySelector('.dgsb-L');L0.innerHTML='<div class="dgsb-info">'+(img?'<img src="'+img+'" alt="">':'')+'<div style="flex:1;min-width:0"><div class="dgsb-nm"></div><div class="dgsb-pr">'+(orig?'<s>'+orig+'</s>':'')+(pct?'<em>'+pct+'</em>':'')+sale+'</div><div class="dgsb-rows">'+(ship?'<div><b>배송비</b><span class="dgsb-ship"></span></div>':'')+'<div><b>결제</b>카드 · 네이버페이 · 카카오페이</div></div></div></div>';L0.querySelector('.dgsb-nm').textContent=name;if(ship)L0.querySelector('.dgsb-ship').textContent=ship;
ia.appendChild(bar);ia.appendChild(dr);
var phs=nodes.map(function(n){var c=document.createComment('dgsb');n.parentNode.insertBefore(c,n);return c;});
var anchor=phs[phs.length-1];var isOpen=false;
function anchorTop(){var r=document.createRange();r.selectNode(anchor);return r.getBoundingClientRect();}
function open(m){if(isOpen){dr.className='open m-'+m;return;}
 var L=dr.querySelector('.dgsb-L'),R=dr.querySelector('.dgsb-R');
 nodes.forEach(function(n){R.appendChild(n);});
 dr.className='m-'+m;void dr.offsetWidth;dr.className='open m-'+m;isOpen=true;bar.classList.remove('show');}
function close(){if(!isOpen)return;nodes.forEach(function(n,i){phs[i].parentNode.insertBefore(n,phs[i].nextSibling);});dr.className='';isOpen=false;tick();}
bar.addEventListener('click',function(e){var b=e.target.closest('[data-m]');if(b)open(b.getAttribute('data-m'));});
dr.querySelector('.dgsb-hdl').addEventListener('click',close);
document.addEventListener('keydown',function(e){if(e.key==='Escape')close();});
function lift(on){ia.style.zIndex=on?'50':'';}
var raf=0;function tick(){raf=0;var past=isOpen?anchorTop().top<80:act.getBoundingClientRect().bottom<80;
 if(isOpen){lift(1);if(!past)close();return;}
 bar.classList.toggle('show',past);lift(past);}
window.addEventListener('scroll',function(){if(!raf)raf=requestAnimationFrame(tick);},{passive:true});
window.addEventListener('resize',function(){if(!raf)raf=requestAnimationFrame(tick);});
tick();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',function(){setTimeout(init,300);});else setTimeout(init,300);
}catch(e){}})();
