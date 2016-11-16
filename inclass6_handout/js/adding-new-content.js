$(function () {
   $("ul").before("<p>Just Updated</p>");
   $("li.hot").prepend("+");
   var $li_element = $("<li><em>gluten-free</em> soy sauce</li>");
   $("li:last").after($li_element);
});
