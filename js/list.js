$(function() {
    let data = ``;
    phoneData.forEach(function(e, i) {
       data += `<li class="goods-list-item">
       <a href="detail.html">
         <div class="item-img">
           <img src="${e.imgSrc}" alt="">
         </div>
         <div class="item-title">
           ${e.name}
         </div>
         <div class="item-price">
           <span class="now">¥6088</span> <s>￥${e.price}</s>
         </div>
         <div class="sold">
           <span> 已售 <em>${e.percent}% </em></span>
           <div class="scroll">
             <div class="per" style="width:${e.percent}%"></div>
           </div>
           <span>剩余<i>${e.left}</i>件</span>
         </div>
       </a>
       <a href="#" class="buy">
         查看详情
       </a>
     </li>`
    })
    $(".goods-list>ul").html(data);
})