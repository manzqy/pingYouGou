$(function() {
    let data = location.search.split('=')[1];
    let obj = {};
    obj = phoneData.find(e => {
        return e.pID == data;
    })
    $(".sku-name").text(obj.name);
    $(".dd>em").text(`¥${obj.price}`);
    $(".preview-img>img").attr("src", obj.imgSrc);
    /* ==== 添加购物车 */
    
    $(".addshopcar").on("click", function() {
        let arr = jTools.getData('cartList');
        let num = $(".choose-number").val();
        if (num.length == 0 || isNaN(num) || parseInt(num) <= 0) {
            return;
        }
        let exist = arr.find(e => {
            return obj.pID == e.pID;
        })
        num = parseInt(num);
        if (exist) {
            exist.number += num;
        }
        var allThing = {
            pID: obj.pID,
            imgSrc: obj.imgSrc,
            name: obj.name,
            price:obj.price,
            number: num,
            check: true
        }
        exist || arr.push(allThing);
        jTools.setData('cartList', arr);
        // location.href = './cart.html';
        window.open('./cart.html');
    })
    /* ===== 加减 */
    $(".add").on("click", function() {
        let num = $(".choose-number").val();
        $(".reduce").removeClass("disabled");
        num++;
        num <= 1? 
        $(".reduce").addClass("disabled") : num; 
        num <= 1? num = 1 : num;
        $(".choose-number").val(num);
    })
    $(".reduce").on("click", function() {
        let num = $(".choose-number").val();
        $(".reduce").removeClass("disabled");
        num--;
        num <= 1? $(".reduce").addClass("disabled") : num;
        num <= 1? num = 1 : num;
        $(".choose-number").val(num);
    })
})