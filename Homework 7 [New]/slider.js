/*File: Homework_8/slider.js
Denzel Pierre - Denzel_Pierre@student.uml.edu
UMASS Lowell Computer Science
COMP 4610-201 - GUI Programming I
Assignment 8: Using the jQuery UI Slider and Tab Widgets 
Created on 22 November 2016, 8:46PM
*/

$(function() {
         var select = $("input#Horizontal_Bottom");
         $("#slider_hBottom").slider({
            range: "min",
            value: 0,
            step: 1,
            min: 0,
            max: 200,
            slide: function(event, ui) {
               select.val(ui.value);

               $(ui.value).val(select.val());
            }
         });
         select.keyup(function() {
            $("#slider_hBottom").slider("value", $(this).val())
         });
      });

      $(function() {
         var select = $("input#Horizontal_Top");
         $("#slider_hTop").slider({
            range: "min",
            value: 0,
            step: 1,
            min: 0,
            max: 200,
            slide: function(event, ui) {
               select.val(ui.value);

               $(ui.value).val(select.val());
            }
         });
         select.keyup(function() {
            $("#slider_hTop").slider("value", $(this).val());

            if (select.val() == NaN) {
               $("#slider_hTop").slider("value", 0)
            }
         });
      });

      $(function() {
         var select = $("input#Vertical_Bottom");
         $("#slider_vBottom").slider({
            range: "min",
            value: 0,
            step: 1,
            min: 0,
            max: 200,
            slide: function(event, ui) {
               select.val(ui.value);

               $(ui.value).val(select.val());
            }
         });
         select.keyup(function() {
            $("#slider_vBottom").slider("value", $(this).val())
         });
      });

      $(function() {
         var select = $("input#Vertical_Top");
         $("#slider_vTop").slider({
            range: "min",
            value: 0,
            step: 1,
            min: 0,
            max: 200,
            slide: function(event, ui) {
               select.val(ui.value);

               $(ui.value).val(select.val());
            }
         });
         select.keyup(function() {
            $("#slider_vTop").slider("value", $(this).val())
         });
      });