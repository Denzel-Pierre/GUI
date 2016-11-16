$(function () {
   $("li:contains('pine')").text("almonds")
   $("li.hot").wrapInner("<em></em>");
   $("li#one").remove();
});
