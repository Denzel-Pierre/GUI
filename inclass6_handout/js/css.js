$(function () {
   var backgroundColor = $("li:first").css("backgroundColor");
   $("ul").append("<p>" + backgroundColor + "</p>");
   $("li").css({
      "backgroundColor": "#c5a996",
      "border-style": "solid",
      "border-color": "white",
      "border-width": "1px",
      "color": "black",
      "text-shadow": "none",
      "font-family": "Georgia"
   });
});
