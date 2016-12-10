/*File: Homework 7/jqvalidate.js
Denzel Pierre - Denzel_Pierre@student.uml.edu
UMASS Lowell Computer Science
COMP 4610-201 - GUI Programming I
Assignment 8: Using the jQuery UI Slider and Tab Widgets 
Created on 09 December 2016, 1:31PM
*/

$(document).ready(function checkValid() {
   var form = $("#numberForm");
   form.validate({
      rules: {
         Horizontal_Bottom: {
            min: 0,
            max: 200,
         },

         Horizontal_Top: {
            min: 0,
            max: 200,
         },
         Vertical_Bottom: {
            min: 0,
            max: 200,
         },
         Vertical_Top: {
            min: 0,
            max: 200,
         },
      }
   });
   var form_control = $(".form-control");
   /*   form_control.rules("add", {
         min: 0,
         max: 200,
      });
      */
   //Validate once the Submit Button is clicked
   $("#submit").click(function () {
      form_control.valid();
      if (form_control.valid() === true) {
         validateForm();
      }
   });
});
