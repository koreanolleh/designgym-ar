/* dg-rv 2026-11-16 v8 mobile: hide culture box, collapse Q&A, show real review text (not "만족" title), best reviews first incl. "more" */
try{(function(){
if(!document.getElementById('dg-rv-css')){var s=document.createElement('style');s.id='dg-rv-css';s.textContent='#dgpa{display:none!important}#prdQnA .xans-product-qna,#prdQnA .ec-base-paginate{display:none!important}#prdQnA .board__btn-wrap{padding-top:4px!important}#prdReview ul.board-list{transition:opacity .25s}#prdReview ul.board-list:not([data-rv-done]){opacity:0}';(document.head||document.documentElement).appendChild(s);}
function reveal(){var u=document.querySelector('#prdReview ul.board-list');if(u)u.setAttribute('data-rv-done','1');}
function settle(){var u=document.querySelector('#prdReview ul.board-list');if(!u||!window.MutationObserver){reveal();return;}var t=setTimeout(fin,450);var mo=new MutationObserver(function(){clearTimeout(t);t=setTimeout(fin,450);});function fin(){mo.disconnect();reveal();}mo.observe(u,{childList:true,subtree:true,characterData:true});}
setTimeout(reveal,6000);
function pno(){var m=location.search.match(/product_no=(\d+)/)||location.pathname.match(/\/product\/[^\/]+\/(\d+)\//)||location.pathname.match(/\/(\d+)\/category\//);if(m)return m[1];if(typeof iProductNo!=='undefined'&&iProductNo)return String(iProductNo);return null;}
function rno(li){var a=li.querySelector('a[href*="no="]');var m=(a&&a.getAttribute('href')||'').match(/[?&]no=(\d+)/);return m?m[1]:'';}
function hasImg(li){var a=li.querySelector('.board-item__attach');return !!a&&/\.(jpe?g|png|gif|webp)/i.test(a.getAttribute('style')||'');}
function date(li){return (((li.querySelector('.board-item__date')||{}).textContent||'').replace(/\D/g,'')+'00000000').slice(0,8);}
function txt(li){return ((li.querySelector('.board-item__subject')||{}).textContent||'').replace(/\s+/g,' ').trim();}
function tier(li){var t=txt(li).replace(/\s/g,'').length;var m=((li.querySelector('.board-item__score')||{}).className||'').match(/--(\d)/);var st=m?+m[1]:5;if(st<4)return 0;return 1+(hasImg(li)?2:0)+(t>=10?1:0);}
function cmp(a,b){return (b.t-a.t)||(a.d<b.d?1:a.d>b.d?-1:0)||(+b.k-+a.k);}
function ls(k,v){try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,v);}catch(e){return null;}}
function clean(html){var d=document.createElement('div');d.innerHTML=html||'';var t=(d.textContent||'').replace(/\(\s*\d{4}-\d{2}-\d{2}[^)]*구매평\s*\)/g,'').replace(/\s+/g,' ').trim();return t;}
function body(k){var c=ls('dgrc_'+k);if(c!==null&&c!==undefined)return Promise.resolve(c);return fetch('/exec/front/Board/Get?no='+k+'&board_no=4',{credentials:'same-origin'}).then(function(r){return r.json();}).then(function(j){var t=clean(j&&j.data&&j.data.content);ls('dgrc_'+k,t);return t;}).catch(function(){return '';});}
function enrich(list){return Promise.all(list.map(function(x){var s=txt(x.li).replace(/\s/g,'');if(s.length>=10)return null;return body(x.k).then(function(t){if(t&&t.replace(/\s/g,'').length>s.length){var el=x.li.querySelector('.board-item__subject');if(el)el.textContent=t;x.t=tier(x.li);}});}));}
function run(){var ul=document.querySelector('#prdReview ul.board-list');if(!ul){reveal();return;}if(ul.getAttribute('data-rv'))return;ul.setAttribute('data-rv','1');var no=pno();if(!no){reveal();return;}
var first=[].slice.call(ul.children);var size=first.length||5;if(!first.length){reveal();return;}
function getTotal(){var tab=[].filter.call(document.querySelectorAll('.jsTabBtn'),function(b){return /리뷰/.test(b.innerText);})[0];var c=document.querySelector('#prdReview .board__list-count');var a=tab?+((tab.innerText.match(/(\d+)/)||[])[1]||0):0;var b=c?+((c.textContent.match(/(\d+)/)||[])[1]||0):0;return Math.max(a,b);}
var pool=[],seen={},shown=0,next=2,last=99,busy=false,done=false;
function add(li,arr){var k=rno(li);if(!k||seen[k])return;seen[k]=1;var it={k:k,li:li,t:tier(li),d:date(li)};pool.push(it);if(arr)arr.push(it);}
var fresh=[];first.forEach(function(li){add(li,fresh);});
function fetchPages(n){var ps=[];while(n-->0&&next<=last){ps.push(next++);}if(!ps.length){done=true;return Promise.resolve();}
return Promise.all(ps.map(function(p){return fetch('/product/detail.html?product_no='+no+'&page_4='+p,{credentials:'same-origin'}).then(function(r){return r.text();}).then(function(h){return new DOMParser().parseFromString(h,'text/html');}).catch(function(){return null;});})).then(function(docs){var got=0,nw=[];docs.forEach(function(doc){if(!doc)return;var l=doc.querySelectorAll('#prdReview ul.board-list>li');got+=l.length;[].slice.call(l).forEach(function(li){add(document.importNode(li,true),nw);});});if(!got)done=true;return enrich(nw);});}
function goodLeft(){var c=0;for(var i=0;i<pool.length;i++)if(pool[i].t>=2)c++;return c;}
function take(n){pool.sort(cmp);var out=pool.splice(0,n);shown+=out.length;return out.map(function(x){return x.li;});}
var btn=document.querySelector('#prdReview a.board__btn');
function label(){if(!btn)return;var total=getTotal();if(total)last=Math.ceil(total/size);var rem=total?Math.max(0,total-shown):pool.length;if(rem<=0&&done&&!pool.length){var w=btn.closest('.board__btn-wrap')||btn;if(w.parentNode)w.parentNode.removeChild(w);btn=null;return;}btn.textContent='리뷰 더보기'+(rem?' ('+rem+')':'');}
if(btn){var nb=btn.cloneNode(true);btn.parentNode.replaceChild(nb,btn);btn=nb;btn.__dgBound=true;
btn.addEventListener('click',function(e){e.preventDefault();e.stopPropagation();if(busy)return;busy=true;var old=btn.textContent;btn.textContent='불러오는 중…';
var p=(goodLeft()<size&&!done)?fetchPages(3):Promise.resolve();p.then(function(){if(pool.length<size&&!done)return fetchPages(2);}).then(function(){var cur=document.querySelector('#prdReview ul.board-list');if(cur)take(size).forEach(function(li){cur.appendChild(li);});busy=false;label();}).catch(function(){busy=false;if(btn)btn.textContent=old;});},true);}
Promise.all([enrich(fresh),fetchPages(2)]).then(function(){var cur=document.querySelector('#prdReview ul.board-list');if(cur){var top=take(size);cur.innerHTML='';top.forEach(function(li){cur.appendChild(li);});}label();settle();}).catch(reveal);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})()}catch(e){try{var u=document.querySelector('#prdReview ul.board-list');if(u)u.setAttribute('data-rv-done','1');}catch(x){}}
