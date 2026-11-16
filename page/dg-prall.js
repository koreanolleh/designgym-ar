/* dg-prall 2026-11-16: 상단 사진 리뷰 줄을 리뷰 목록 썸네일로 바로 만든다. 원래 스킨은 리뷰마다 Board/Get 을 1번씩(29번 상품 286회) 불렀음 → 0회. 사진 리뷰 순서는 최신순. 되돌리려면 이 script 블록 삭제 */
(function(){try{
var held;
function fix(R){
 if(!R||typeof R.getPrAll!=='function'||R.__dgp)return;R.__dgp=1;var orig=R.getPrAll;
 R.getPrAll=function(){
  var $=window.$||window.jQuery;if(!$){return orig.apply(this,arguments);}
  $.ajax({url:'/moa/import/board/prdt_data.html',dataType:'html',
   success:function(result){try{
    var boardPrdNo=$('#prdReview').data('prd-no');var item=$(result).find('.jsRvItem');
    var getScoreCount=0,scoreHasLength=0,pick=[];
    item.each(function(){
     var it=$(this);var ipn=String(it.data('prd-link')||'').split('product_no=')[1];
     if(ipn==boardPrdNo){
      if(it.data('point-count')!==""){getScoreCount+=it.data('point-count');scoreHasLength+=1;}
      var st=it.find('.pr-all__thumbnail').attr('style')||'';
      if(/url\(\s*['"]?[^'")\s]+\.(jpe?g|png|gif|webp)/i.test(st)){
       var no=String(it.data('read-link')||'').replace(/(\S*)[?&]no=(\d+)(\S*)/g,'$2');
       it.attr('data-list-no',no);pick.push(it);
      }
     }
    });
    var scoreRate=getScoreCount/scoreHasLength.toFixed(1);var scoreFillVal=100*scoreRate/5;var num_check=/^[0-9]*$/;
    if(!num_check.test(scoreRate)){scoreRate=scoreRate.toFixed(1);}
    if(scoreRate&&!isNaN(scoreRate)){$('.jsScoreRate').text(scoreRate);$('.jsScoreUiFill').attr('style','width: '+scoreFillVal+'%');$('.review-score, .info-review').addClass('on');}
    /* 스킨의 runPrAll 은 .jsPrApd 에 항목이 '붙는 것'을 지켜보다가 정렬·슬라이더를 만든다 → 먼저 감시를 켜고 그 다음에 붙인다 */
    R.runPrAll();
    for(var q=0;q<pick.length;q++){pick[q].appendTo($('.jsPrApd'));}
    if(pick.length){
     $('.jsPrApd').find('.jsRvItem').addClass('swiper-slide');
     $('.jsPrAll').addClass('swiper-container').end().find('.jsPrApd').addClass('swiper-wrapper');
    }
   }catch(e){}}});
 };
}
if(window.REVIEW){fix(window.REVIEW);}
else{Object.defineProperty(window,'REVIEW',{configurable:true,enumerable:true,get:function(){return held;},set:function(o){held=o;try{fix(o);}catch(e){}}});}
}catch(e){}})();
