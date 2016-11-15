/*File: Homework_6/table.js
Denzel Pierre - Denzel_Pierre@student.uml.edu
UMASS Lowell Computer Science
COMP 4610-201 - GUI Programming I
Assignment 6: Creating an Interactive Dynamic Table
Created on 21 October 2016, 12:30PM
Updated on 21 October 2016, 12:33PM - Integrated Javascript file with HTML
Updated on 21 October 2016, 11:39PM - Completed Basic Functionality
Updated on 25 October 2016, 03:02PM - Formatted comments
Updated on 27 October 2016, 07:09PM - Added Higher Form Functionality
Updated on 03 November 2016, 09:09PM - Added Event Listeners
*/


//Elements of the form inputs
var h_bottom_element = document.getElementById("Horizontal_Bottom");
var h_top_element = document.getElementById("Horizontal_Top");
var v_bottom_element = document.getElementById("Vertical_Bottom");
var v_top_element = document.getElementById("Vertical_Top");


var button = document.getElementById("submit"); //Element of the button

/*
Starting function - Gathers the 4 integers from the form and converts them to Integers
*/
function validateForm() {
   var h_start = parseInt(h_bottom_element.value, 10);
   var h_end = parseInt(h_top_element.value, 10);
   var v_start = parseInt(v_bottom_element.value, 10);
   var v_end = parseInt(v_top_element.value, 10);

   /*var isInvalid = false;

   // If any of the 4 variables are not numbers, make the input red to show it is invalid.
   if (isNaN(h_start)) {
      h_bottom_element.style.backgroundColor = "#ffbbbb";
      isInvalid = true;
   }

   if (isNaN(h_end)) {
      h_top_element.style.backgroundColor = "#ffbbbb";
      isInvalid = true;
   }

   if (isNaN(v_start)) {
      v_bottom_element.style.backgroundColor = "#ffbbbb";
      isInvalid = true;
   }

   if (isNaN(v_end)) {
      v_top_element.style.backgroundColor = "#ffbbbb";
      isInvalid = true;
   }

   if (isInvalid) {
      alert("Fill all required labels correctly.");
      return;
   }*/

   //If Horizontal Numbers are backwards, switch them
   if (h_start > h_end) {
      var h_switch = switchIntegers(h_start, h_end);
      h_start = h_switch[0];
      h_end = h_switch[1];
      alert("Your Starting Horizontal Number was larger than your Ending Horizontal Number, so I switched them automatically.");
   }

   //If Vertical Numbers are backwards, switch them
   if (v_start > v_end) {
      var v_switch = switchIntegers(v_start, v_end);
      v_start = v_switch[0];
      v_end = v_switch[1];
      alert("Your Starting Vertical Number was larger than your Ending Vertical Number, so I switched them automatically.");
   }

   setupTable(h_start, h_end, v_start, v_end);

}

/*
Sets up the table, calling a clear function if needed.
*/
function setupTable(h_start, h_end, v_start, v_end) {
   var table_check;
   if (table_check = document.getElementById("timestable")) { /*If the table exists, clear the table before creating a new one.*/
      clearTable(table_check);
   }
   fillTable(h_start, h_end, v_start, v_end);
}

/*
Deletes the Element Table from the body
*/
function clearTable(table_check) {
   document.body.removeChild(table_check.parentElement);
   return;
}

/*
Fills the table using information paseed by parameters.
@param h_start - The starting multipier entered by the user
@param h_end - The ending multiplier entered by the user
@param v_start - The starting multiplicand entered by the user
@param v_end - Th ending multiplicand ended by the user
*/
function fillTable(h_start, h_end, v_start, v_end) {
   var h_range = h_end - h_start; //Horizontal Range - The number of columns needed for the table.
   var v_range = v_end - v_start; //Vertical Range - The number of rows needed for the table.
   var num = 1; //Counter to h_range and v_range
   var h_header_recorder = h_start; //Records the numbers between h_end and h_start for the header row.

   /*
   Creates an element table, and appends it to the element body
   */
   var domTable = document.createElement("div");
   domTable.setAttribute("id", "domTable");
   domTable.style.overflowX = "auto";
   domTable.style.overflowY = "auto";


   var table = document.createElement("table");
   table.setAttribute("id", "timestable");

   document.body.appendChild(domTable);
   document.getElementById("domTable").appendChild(table);

   //document.body.appendChild(table);


   var tr = document.createElement('tr');

   /*
   Creates the header row, appends them to tr. Creates one more column for a blank space in the top left corner.
   */
   for (var j = h_start; j <= h_end + 1; j++) {
      tr.appendChild(document.createElement('th'));
   }

   tr.cells[0].appendChild(document.createTextNode(' ')); //Makes the top left corner blank for correctness.

   /*
   Adds data to the header row.
   */
   for (num = 1; num <= h_range + 1; num++) {
      tr.cells[num].appendChild(document.createTextNode(h_header_recorder));
      table.appendChild(tr);
      h_header_recorder++;
   }
   /*
   Creates each row and adds data to the "inside table" for products of the multiplicand and multiplier
   */
   for (var i = v_start; i <= v_end; i++) {
      h_header_recorder = h_start;
      tr = document.createElement('tr');
      for (j = h_start; j <= h_end + 1; j++) {
         tr.appendChild(document.createElement('td'));
      }

      tr.cells[0].appendChild(document.createTextNode(i)); //Adds the multiplicand to the first column of th table.

      for (num = 1; num <= h_range + 1; num++) {
         tr.cells[num].appendChild(document.createTextNode(i * h_header_recorder)); //Multiplies the multiplier and the multiplicand, places product into the table
         table.appendChild(tr);
         h_header_recorder++;
      }
   }
}

/*Switches two integers
@param a - first integer
@param b - second integer
@return - Array of two integers in reverse order
*/
function switchIntegers(a, b) {
   var holder = a;
   a = b;
   b = holder;

   return [a, b];
}

//Checks to see if a number is an integer. If so, then the input color changes to white
function validateInteger(x) {
   if (x.value % 1 === 0) {
      x.style.backgroundColor = "white";
      return false;
   }
}

//Event Listeners
h_bottom_element.addEventListener('blur', function () {
   validateInteger(h_bottom_element);
}, false);

h_top_element.addEventListener('blur', function () {
   validateInteger(h_top_element);
}, false);

v_bottom_element.addEventListener('blur', function () {
   validateInteger(v_bottom_element);
}, false);

v_top_element.addEventListener('blur', function () {
   validateInteger(v_top_element);
}, false);

submit.addEventListener("click", validateForm, false);