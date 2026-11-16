/* dg-rv 2026-11-16 mobile: hide culture box, collapse Q&A, best reviews first */
try{(function(){
if(!document.getElementById('dg-rv-css')){var s=document.createElement('style');s.id='dg-rv-css';s.textContent='#dgpa{display:none!important}#prdQnA .xans-product-qna,#prdQnA .ec-base-paginate{display:none!important}#prdQnA .board__btn-wrap{padding-top:4px!important}';(document.head||document.documentElement).appendChild(s);}
function pno(){var m=location.search.match(/product_no=(\d+)/)||location.pathname.match(/\/product\/[^\/]+\/(\d+)\//)||location.pathname.match(/\/(\d+)\/category\//);if(m)return m[1];if(typeof iProductNo!=='undefined'&&iProductNo)return String(iProductNo);return null;}
function run(){var ul=document.querySelector('#prdReview ul.board-list');if(!ul||ul.getAttribute('data-rv'))return;var no=pno();if(!no)return;ul.setAttribute('data-rv','1');
var items=[],seen={};function add(li){var a=li.querySelector('a.board-item__link');var k=a?a.getAttribute('href'):li.textContent;if(seen[k])return;seen[k]=1;var t=((li.querySelector('.board-item__subject')||{}).textContent||'').replace(/\s+/g,' ').trim();var img=!!li.querySelector('.board-item__attach[style*="url"]');var m=((li.querySelector('.board-item__score')||{}).className||'').match(/--(\d)/);var st=m?+m[1]:5;items.push({h:li.outerHTML,s:(img?1000:0)+Math.min(t.length,200)+(st>=4?0:-5000),i:items.length});}
var orig=[].slice.call(ul.children);orig.forEach(add);var n=orig.length||5;
var p=2,P=4;function next(){if(p>P){fin();return;}fetch('/product/detail.html?product_no='+no+'&page_4='+p,{credentials:'same-origin'}).then(function(r){return r.text();}).then(function(h){var doc=new DOMParser().parseFromString(h,'text/html');[].slice.call(doc.querySelectorAll('#prdReview ul.board-list>li')).forEach(add);p++;next();}).catch(function(){fin();});}
function fin(){if(items.length<=n)return;var top=items.slice().sort(function(a,b){return (b.s-a.s)||(a.i-b.i);}).slice(0,n);var cur=document.querySelector('#prdReview ul.board-list');if(!cur)return;cur.innerHTML=top.map(function(x){return x.h;}).join('');}
next();}
function go(){setTimeout(run,1200);}
if(document.readyState==='complete')go();else window.addEventListener('load',go);
})()}catch(e){}
