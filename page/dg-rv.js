/* dg-rv 2026-11-16 v2 mobile: hide culture box, collapse Q&A, best reviews first (no flicker) */
try{(function(){
var ul0=null;
if(!document.getElementById('dg-rv-css')){var s=document.createElement('style');s.id='dg-rv-css';s.textContent='#dgpa{display:none!important}#prdQnA .xans-product-qna,#prdQnA .ec-base-paginate{display:none!important}#prdQnA .board__btn-wrap{padding-top:4px!important}#prdReview ul.board-list{transition:opacity .25s}#prdReview ul.board-list:not([data-rv-done]){opacity:0}';(document.head||document.documentElement).appendChild(s);}
function show(){var u=document.querySelector('#prdReview ul.board-list');if(u)u.setAttribute('data-rv-done','1');}
setTimeout(show,3000);
function pno(){var m=location.search.match(/product_no=(\d+)/)||location.pathname.match(/\/product\/[^\/]+\/(\d+)\//)||location.pathname.match(/\/(\d+)\/category\//);if(m)return m[1];if(typeof iProductNo!=='undefined'&&iProductNo)return String(iProductNo);return null;}
function ls(k,v){try{if(v===undefined)return JSON.parse(localStorage.getItem(k)||'null');localStorage.setItem(k,JSON.stringify(v));}catch(e){return null;}}
function run(){var ul=document.querySelector('#prdReview ul.board-list');if(!ul){show();return;}if(ul.getAttribute('data-rv'))return;ul.setAttribute('data-rv','1');var no=pno();if(!no){show();return;}
var orig=[].slice.call(ul.children);var n=orig.length;if(n<2){show();return;}
var key='dgrv_'+no,c=ls(key);var firstHref=(orig[0].querySelector('a.board-item__link')||{getAttribute:function(){return ''}}).getAttribute('href');
if(c&&c.h&&c.f===firstHref&&(Date.now()-c.t)<6*3600*1000){ul.innerHTML=c.h;show();return;}
var items=[],seen={};function add(li){var a=li.querySelector('a.board-item__link');var k=a?a.getAttribute('href'):li.textContent;if(seen[k])return;seen[k]=1;var t=((li.querySelector('.board-item__subject')||{}).textContent||'').replace(/\s+/g,' ').trim();var img=!!li.querySelector('.board-item__attach[style*="url"]');var m=((li.querySelector('.board-item__score')||{}).className||'').match(/--(\d)/);var st=m?+m[1]:5;items.push({h:li.outerHTML,s:(img?1000:0)+Math.min(t.length,200)+(st>=4?0:-5000),i:items.length});}
orig.forEach(add);
var jobs=[2,3,4].map(function(p){return fetch('/product/detail.html?product_no='+no+'&page_4='+p,{credentials:'same-origin'}).then(function(r){return r.text();}).then(function(h){return new DOMParser().parseFromString(h,'text/html');}).catch(function(){return null;});});
Promise.all(jobs).then(function(docs){docs.forEach(function(doc){if(doc)[].slice.call(doc.querySelectorAll('#prdReview ul.board-list>li')).forEach(add);});
var top=items.slice().sort(function(a,b){return (b.s-a.s)||(a.i-b.i);}).slice(0,n);var html=top.map(function(x){return x.h;}).join('');var cur=document.querySelector('#prdReview ul.board-list');if(cur&&items.length>n){cur.innerHTML=html;ls(key,{h:html,f:firstHref,t:Date.now()});}show();}).catch(show);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})()}catch(e){try{var u=document.querySelector('#prdReview ul.board-list');if(u)u.setAttribute('data-rv-done','1');}catch(x){}}
