/*
File: Homework 9/tiles.js
Denzel Pierre - Denzel_Pierre@student.uml.edu
UMASS Lowell Computer Science
COMP 4610-201 - GUI Programming I
Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop
Created on 06 November 2016, 06:52PM
*/

//Set up Bag
var $bag = $("<div id='bag'><em>Rack:</em></div>");
$("#chessBoard").after($bag);
var k = 0;
var h = 0;
var bag_length = 7;
var rand_tile_list = [];



//Push all randomized tiles to an array.
for (k = 0; k < bag_length; k++) {
   
   var rand_tile = getRandTile();
   rand_tile_list.push(rand_tile);
}

for (h = 0; h < rand_tile_list.length; h++) {
   var rand_tile_DOM = document.createElement("div");
   rand_tile_DOM.id = rand_tile_list[h].id;
   rand_tile_DOM.className = "tile";
   var new_img = document.createElement("img");
   new_img.src = rand_tile_list[h].src;

   rand_tile_DOM.appendChild(new_img);
   document.getElementById("bag").appendChild(rand_tile_DOM);
}


//Pulls a random tile from the bag
function getRandTile() {

   if(tile_list.length > 0) {
         var rand_tile = tile_list[Math.floor(Math.random() * tile_list.length)];
   rand_tile.amount = rand_tile.amount - 1;
   if (rand_tile.amount === 0) {
      var index = tile_list.indexOf(rand_tile);
      trash.push(rand_tile);
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

//Forcibly adds one random tile from the bag to the rack.
function addTile() {
   var new_tile = getRandTile();
   
   var new_rand_tile_DOM = document.createElement("div");
   new_rand_tile_DOM.id = new_tile.id;
   new_rand_tile_DOM.className = "tile" + " ui-draggable";
   var new_img = document.createElement("img");
   new_img.src = new_tile.src;

   new_rand_tile_DOM.appendChild(new_img);
   document.body.appendChild(new_rand_tile_DOM);
   
}

//Calls addTile as necessary to fill the rack
function fillRack() {
   i = bag_length-played_tiles.length;
   
   for(i = bag_length-played_tiles.length; i < 7; i++) {
      addTile();
   }
}