/*File: Homework 7/jqvalidate.js
Denzel Pierre - Denzel_Pierre@student.uml.edu
UMASS Lowell Computer Science
COMP 4610-201 - GUI Programming I
Assignment 7: Using the jQuery Validation Plugin with Your Dynamic Table
Created on 15 November 2016, 8:30PM
*/

$(document).ready(function () {
   $("#numberForm").validate();
   $("#submit").click(function () {
      $("#numberForm").valid();
   })
});
