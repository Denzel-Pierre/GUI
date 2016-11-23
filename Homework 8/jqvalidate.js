/*File: Homework 8/jqvalidate.js
Denzel Pierre - Denzel_Pierre@student.uml.edu
UMASS Lowell Computer Science
COMP 4610-201 - GUI Programming I
Assignment 8: Using the jQuery UI Slider and Tab Widgets 
Created on 15 November 2016, 8:30PM
Updated on 22 November 2016, 9:00PM
*/

$(document).ready(function checkValid() {
   var form = $("#numberForm");
   form.validate();
   $("input").rules("add", {
      min: 0,
      max: 200
   });
   
   //Validate once the Submit Button is clicked
   $("#submit").click(function () {
      form.valid();
      if (form.valid() == true) {
         validateForm();
      }
   });
//Validate while the slider is dragged
   $(".mySlider").on("slidechange", function () {
      form.valid();
      if (form.valid() == true) {
         validateForm();
      }
   });
   
   //Validate once the slider is brought to rest.
   $(".mySlider").on("slide", function () {
      form.valid();
      if (form.valid() == true) {
         validateForm();
      }
   });

});
