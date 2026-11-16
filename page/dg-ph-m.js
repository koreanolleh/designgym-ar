/* dg-ph 2026-11-16 모바일 구매/선물 시트 위 ∨ 닫기 손잡이 (누르면 기존 배경 닫기와 동일하게 닫힘, 되돌리려면 이 script 블록 삭제) */
(function(){try{
var st=document.createElement('style');st.id='dg-ph-css';st.textContent='.buy-popup .dg-ph{position:absolute;left:50%;top:-30px;transform:translateX(-50%);width:76px;height:30px;background:#fff;border-radius:12px 12px 0 0;display:flex;align-items:center;justify-content:center;cursor:pointer;z-index:2;-webkit-tap-highlight-color:transparent;box-shadow:0 -4px 10px rgba(0,0,0,.06)}.buy-popup:not(.on) .dg-ph{display:none}';
(document.head||document.documentElement).appendChild(st);
function add(){var p=document.querySelector('.buy-popup');if(!p)return false;if(p.querySelector('.dg-ph'))return true;var h=document.createElement('div');h.className='dg-ph';h.setAttribute('role','button');h.setAttribute('aria-label','닫기');h.innerHTML='<svg width="20" height="11" viewBox="0 0 22 12"><path d="M1 1l10 10L21 1" fill="none" stroke="#555" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';
h.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();var bg=document.querySelector('.jsPopupBG');if(bg)bg.click();});p.appendChild(h);return true;}
if(!add())document.addEventListener('DOMContentLoaded',add);
}catch(e){}})();
