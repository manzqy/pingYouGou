$(function() {
  let arr = jTools.getData("cartList");
  let str = "";
  arr.forEach(e => {
    str += `<div class="item" data-id="${e.pID}">
        <div class="row">
          <div class="cell col-1 row">
            <div class="cell col-1">
              <input type="checkbox" class="item-ck" ${e.check && "checked"}>
            </div>
            <div class="cell col-4">
              <img src="${e.imgSrc}" alt="">
            </div>
          </div>
          <div class="cell col-4 row">
            <div class="item-name">${e.name}</div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="price">${e.price}</em>
          </div>
          <div class="cell col-1 tc lh70">
            <div class="item-count">
              <a href="javascript:void(0);" class="reduce fl ">-</a>
              <input autocomplete="off" type="text" class="number fl" value="${
                e.number
              }">
              <a href="javascript:void(0);" class="add fl">+</a>
            </div>
          </div>
          <div class="cell col-1 tc lh70">
            <span>￥</span>
            <em class="computed">${e.number * e.price}</em>
          </div>
          <div class="cell col-1">
            <a href="javascript:void(0);" class="item-del">从购物车中移除</a>
          </div>
        </div>
      </div>`;
  });
  $(".item-list").html(str);
  !str ? 0 : $(".empty-tip").hide();
  !str ? 0 : $(".total-of").show();
  !str ? 0 : $(".cart-header").show();
  str ? 0 : $(".empty-tip").show();
  str ? 0 : $(".total-of").hide();
  str ? 0 : $(".cart-header").hide();
  $(".pick-all").trigger("click");
  $(".pick-all").on("click", function() {
    let sta = $(this).prop("checked");
    $(".item-ck").prop("checked", sta);
    $(".pick-all").prop("checked", sta);
    arr.forEach(e => {
      e.check = sta;
    });
    jTools.setData("cartList", arr);
    arr = jTools.getData("cartList");
    calcTotal();
  });
  $(".item-list").on("click", ".item-ck", function() {
    let subSta = $(".item-ck").length == $(".item-ck:checked").length;
    $(".pick-all").prop("checked", subSta);
    let index = $(this)
      .parents(".item")
      .attr("data-id");
    arr.forEach(e => {
      if (e.pID == index) {
        e.check = subSta;
      }
    });
    jTools.setData("cartList", arr);
    arr = jTools.getData("cartList");
    calcTotal();
  });
  calcTotal();
  /* ==== totolCala */
  function calcTotal() {
    let totalNum = 0;
    let totalPrice = 0;
    arr.forEach(e => {
      if (e.check) {
        totalNum += e.number;
        totalPrice += e.price * e.number;
      }
    });
    $(".selected").text(totalNum);
    $(".total-money").text(totalPrice);
  }
  $(".item-list").on("click", ".add", function() {
    let content = $(this)
      .prev()
      .val();
    $(this)
      .prev()
      .val(++content);
    let id = $(this)
      .parents(".item")
      .attr("data-id");
    let obj = arr.find(e => {
      return e.pID == id;
    });
    obj.number = parseInt(content);
    let money = $(this)
      .parents(".item")
      .find(".computed");
    money.text(obj.number * obj.price);
    jTools.setData("cartList", arr);
    calcTotal();
  });
  $(".item-list").on("click", ".reduce", function() {
    let content = $(this)
      .next()
      .val();
    if (content <= 1) {
      alert("请输入正确的数字，例如：123");
      return;
    }
    $(this)
      .next()
      .val(--content);
    let id = $(this)
      .parents(".item")
      .attr("data-id");
    let obj = arr.find(e => {
      return e.pID == id;
    });
    obj.number = parseInt(content);
    let money = $(this)
      .parents(".item")
      .find(".computed");
    money.text(obj.number * obj.price);
    jTools.setData("cartList", arr);
    calcTotal();
  });
  $(".item-list").on("focus", ".number", function() {
    $(this).attr("data-pre", $(this).val());
  });
  $(".item-list").on("blur", ".number", function() {
    let content = $(this).val();
    if (
      content.trim().length == 0 ||
      isNaN(content) ||
      parseInt(content) <= 0
    ) {
      alert("请输入正确的数量");
      $(this).val($(this).attr("data-pre"));
    }
    let id = $(this)
      .parents(".item")
      .attr("data-id");
    let obj = arr.find(e => {
      return e.pID == id;
    });
    obj.number = parseInt(content);
    let money = $(this)
      .parents(".item")
      .find(".computed");
    money.text(obj.number * obj.price);
    jTools.setData("cartList", arr);
    calcTotal();
  });
  $(".item-list").on("keydown", ".number", function(e) {
    if (e.keyCode != 13) {
      return;
    }
    let content = $(this).val();
    if (
      content.trim().length == 0 ||
      isNaN(content) ||
      parseInt(content) <= 0
    ) {
      alert("请输入正确的数量");
      $(this).val($(this).attr("data-pre"));
    }
    let id = $(this)
      .parents(".item")
      .attr("data-id");
    let obj = arr.find(e => {
      return e.pID == id;
    });
    obj.number = parseInt(content);
    let money = $(this)
      .parents(".item")
      .find(".computed");
    money.text(obj.number * obj.price);
    jTools.setData("cartList", arr);
    calcTotal();
  });
  $(".item-list").on("click", ".item-del", function() {
    layer.confirm("你确定要删除吗?", { icon: 0, title: "警告" }, index => {
      layer.close(index);
      let id = $(this)
        .parents(".item")
        .attr("data-id");
      $(this)
        .parents(".item")
        .remove();
      arr = arr.filter(e => {
        return e.pID != id;
      });
      console.log(arr);
      jTools.setData("cartList", arr);
      calcTotal();
    });
  });
});
