/*
File: Homework 9/tiles.js
Denzel Pierre - Denzel_Pierre@student.uml.edu
UMASS Lowell Computer Science
COMP 4610-201 - GUI Programming I
Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop
Created on 06 November 2016, 06:52PM
*/

var $bag = $("<div id='bag'><em>Rack:</em></div>");

var k = 0;
var h = 0;
var bag_length = 7;
var rand_tile_list = [];




for (k = 0; k < bag_length; k++) {
   
   var rand_tile = getRandTile();
   rand_tile_list.push(rand_tile);
}

for (h = 0; h < rand_tile_list.length; h++) {
   var rand_tile_DOM = document.createElement("div");
   alert("listid is " + rand_tile_list[h].id);
   rand_tile_DOM.id = rand_tile_list[h].id;
   alert("Got here1");
   rand_tile_DOM.className = "tile";
   alert("Got here2");
   var new_img = document.createElement("img");
   alert("Got here3");
   new_img.src = rand_tile_list[h].src;
   alert("Got here4");

   rand_tile_DOM.appendChild(new_img);
    alert("Got here5");
   document.body.appendChild(rand_tile_DOM);
    alert("Got here6");
}

$("#chessBoard").after($bag);

function getRandTile() {

   if(tile_list.length > 0) {
         var rand_tile = tile_list[Math.floor(Math.random() * tile_list.length)];
   rand_tile.amount = rand_tile.amount - 1;
   if (rand_tile.amount === 0) {
      var index = tile_list.indexOf(rand_tile);
      tile_list.splice(index, 1);
   }
      return rand_tile;
   }
   else
      {
         $("#messages").text("You ran out of available tiles in the bag!");
         return;
      }
}

function addTile() {
   var new_tile = getRandTile();
   
   var new_rand_tile_DOM = document.createElement("div");
   alert("listid is " + new_tile.id);
   new_rand_tile_DOM.id = new_tile.id;
   alert("Got here1");
   new_rand_tile_DOM.className = "tile";
   alert("Got here2");
   var new_img = document.createElement("img");
   alert("Got here3");
   new_img.src = rand_tile.src;
   alert("Got here4");

   new_rand_tile_DOM.appendChild(new_img);
    alert("Got here5");
   document.body.appendChild(new_rand_tile_DOM);
    alert("Got here6");
   
}
