/* dg-rv-pc 2026-11-16 v1 PC: show real review text instead of "만족" title (date order kept) */
try{(function(){
if(!document.getElementById('dg-rvpc-css')){var s=document.createElement('style');s.id='dg-rvpc-css';s.textContent='#prdReview ul.board-list{transition:opacity .25s}#prdReview ul.board-list:not([data-rv-done]){opacity:0}#prdReview ul.board-list[data-rv-done]>li:not([data-rc]){opacity:0;animation:dgrvLi .2s 5s forwards}#prdReview ul.board-list>li{transition:opacity .2s}@keyframes dgrvLi{to{opacity:1}}';(document.head||document.documentElement).appendChild(s);}
function reveal(){var u=document.querySelector('#prdReview ul.board-list');if(u)u.setAttribute('data-rv-done','1');}
setTimeout(reveal,8000);
function rno(li){var a=li.querySelector('a[href*="no="]');var m=(a&&a.getAttribute('href')||'').match(/[?&]no=(\d+)/);return m?m[1]:'';}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v);}catch(e){return null;}}
function clean(html){var d=document.createElement('div');d.innerHTML=html||'';return (d.textContent||'').replace(/\(\s*\d{4}-\d{2}-\d{2}[^)]*구매평\s*\)/g,'').replace(/\s+/g,' ').trim();}
function body(k){var c=ls('dgrc_'+k);if(c!==null&&c!==undefined)return Promise.resolve(c);return fetch('/exec/front/Board/Get?no='+k+'&board_no=4',{credentials:'same-origin'}).then(function(r){return r.json();}).then(function(j){var t=clean(j&&j.data&&j.data.content);ls('dgrc_'+k,t);return t;}).catch(function(){return '';});}
function fix(li){if(li.getAttribute('data-rc')||li.__rc)return Promise.resolve();li.__rc=1;var el=li.querySelector('.board-item__subject');var s=el?(el.textContent||'').replace(/\s/g,''):'';var k=rno(li);if(!el||s.length>=10||!k){li.setAttribute('data-rc','1');return Promise.resolve();}
return body(k).then(function(t){if(t&&t.replace(/\s/g,'').length>s.length)el.textContent=t;li.setAttribute('data-rc','1');});}
function run(){var ul=document.querySelector('#prdReview ul.board-list');if(!ul){reveal();return;}if(ul.getAttribute('data-rv'))return;ul.setAttribute('data-rv','1');
Promise.all([].slice.call(ul.children).map(fix)).then(reveal,reveal);
if(window.MutationObserver){new MutationObserver(function(ms){ms.forEach(function(m){[].slice.call(m.addedNodes).forEach(function(n){if(n.nodeType===1&&n.tagName==='LI')fix(n);});});}).observe(ul,{childList:true});}
setInterval(function(){var u=document.querySelector('#prdReview ul.board-list');if(u)[].slice.call(u.children).forEach(function(li){if(!li.getAttribute('data-rc'))fix(li);});},1500);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})()}catch(e){try{var u=document.querySelector('#prdReview ul.board-list');if(u)u.setAttribute('data-rv-done','1');}catch(x){}}
