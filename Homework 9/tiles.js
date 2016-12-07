/*
File: Homework 9/tiles.js
Denzel Pierre - Denzel_Pierre@student.uml.edu
UMASS Lowell Computer Science
COMP 4610-201 - GUI Programming I
Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop
Created on 28 November 2016, 06:52PM
Updated on 01 December 2016, 11:01PM - Fixed basic Tile Functionality
Updated on 04 December 2016, 8:58PM - Added id for each tile
*/

var tile_A = {
   letter: "A",
   id: "tile_A",
   point_value: 1,
   amount: 9,
   remaining: 9,
   src: "Scrabble_Tiles/Scrabble_Tile_A.jpg"
};

var tile_B = {
   letter: "B",
   id: "tile_B",
   point_value: 3,
   amount: 2,
   remaining: 2,
   src: "Scrabble_Tiles/Scrabble_Tile_B.jpg"
};
var tile_C = {
   letter: "C",
   id: "tile_C",
   point_value: 3,
   amount: 2,
   remaining: 2,
   src: "Scrabble_Tiles/Scrabble_Tile_C.jpg"
};
var tile_D = {
   letter: "D",
   id: "tile_D",
   point_value: 2,
   amount: 4,
   remaining: 4,
   src: "Scrabble_Tiles/Scrabble_Tile_D.jpg"
};
var tile_E = {
   letter: "E",
   id: "tile_E",
   point_value: 1,
   amount: 12,
   remaining: 12,
   src: "Scrabble_Tiles/Scrabble_Tile_E.jpg"
};
var tile_F = {
   letter: "F",
   id: "tile_F",
   point_value: 4,
   amount: 2,
   remaining: 2,
   src: "Scrabble_Tiles/Scrabble_Tile_F.jpg"
};
var tile_G = {
   letter: "G",
   id: "tile_G",
   point_value: 2,
   amount: 3,
   remaining: 3,
   src: "Scrabble_Tiles/Scrabble_Tile_G.jpg"
};
var tile_H = {
   letter: "H",
   id: "tile_H",
   point_value: 4,
   amount: 2,
   remaining: 2,
   src: "Scrabble_Tiles/Scrabble_Tile_H.jpg"
};
var tile_I = {
   letter: "I",
   id: "tile_I",
   point_value: 1,
   amount: 9,
   remaining: 9,
   src: "Scrabble_Tiles/Scrabble_Tile_I.jpg"
};
var tile_J = {
   letter: "J",
   id: "tile_J",
   point_value: 8,
   amount: 1,
   remaining: 1,
   src: "Scrabble_Tiles/Scrabble_Tile_J.jpg"
};
var tile_K = {
   letter: "K",
   id: "tile_K",
   point_value: 5,
   amount: 1,
   remaining: 1,
   src: "Scrabble_Tiles/Scrabble_Tile_K.jpg"
};
var tile_L = {
   letter: "L",
   id: "tile_L",
   point_value: 1,
   amount: 4,
   remaining: 4,
   src: "Scrabble_Tiles/Scrabble_Tile_L.jpg"
};
var tile_M = {
   letter: "M",
   id: "tile_M",
   point_value: 3,
   amount: 2,
   remaining: 2,
   src: "Scrabble_Tiles/Scrabble_Tile_M.jpg"
};
var tile_N = {
   letter: "N",
   id: "tile_N",
   point_value: 1,
   amount: 6,
   remaining: 6,
   src: "Scrabble_Tiles/Scrabble_Tile_N.jpg"
};
var tile_O = {
   letter: "O",
   id: "tile_O",
   point_value: 1,
   amount: 8,
   remaining: 8,
   src: "Scrabble_Tiles/Scrabble_Tile_O.jpg"
};
var tile_P = {
   letter: "P",
   id: "tile_P",
   point_value: 3,
   amount: 2,
   remaining: 2,
   src: "Scrabble_Tiles/Scrabble_Tile_P.jpg"
};
var tile_Q = {
   letter: "Q",
   id: "tile_Q",
   point_value: 10,
   amount: 1,
   remaining: 1,
   src: "Scrabble_Tiles/Scrabble_Tile_Q.jpg"
};
var tile_R = {
   letter: "R",
   id: "tile_R",
   point_value: 1,
   amount: 6,
   remaining: 6,
   src: "Scrabble_Tiles/Scrabble_Tile_R.jpg"
};
var tile_S = {
   letter: "S",
   id: "tile_S",
   point_value: 1,
   amount: 4,
   remaining: 4,
   src: "Scrabble_Tiles/Scrabble_Tile_S.jpg"
};
var tile_T = {
   letter: "T",
   id: "tile_T",
   point_value: 1,
   amount: 6,
   remaining: 6,
   src: "Scrabble_Tiles/Scrabble_Tile_T.jpg"
};
var tile_U = {
   letter: "U",
   id: "tile_U",
   point_value: 1,
   amount: 4,
   remaining: 4,
   src: "Scrabble_Tiles/Scrabble_Tile_U.jpg"
};
var tile_V = {
   letter: "V",
   id: "tile_V",
   point_value: 4,
   amount: 2,
   remaining: 2,
   src: "Scrabble_Tiles/Scrabble_Tile_V.jpg"
};
var tile_W = {
   letter: "W",
   id: "tile_W",
   point_value: 4,
   amount: 2,
   remaining: 2,
   src: "Scrabble_Tiles/Scrabble_Tile_W.jpg"
};
var tile_X = {
   letter: "X",
   id: "tile_X",
   point_value: 8,
   amount: 1,
   remaining: 1,
   src: "Scrabble_Tiles/Scrabble_Tile_X.jpg"
};
var tile_Y = {
   letter: "Y",
   id: "tile_Y",
   point_value: 4,
   amount: 2,
   remaining: 2,
   src: "Scrabble_Tiles/Scrabble_Tile_Y.jpg"
};
var tile_Z = {
   letter: "Z",
   id: "tile_Z",
   point_value: 10,
   amount: 1,
   remaining: 1,
   src: "Scrabble_Tiles/Scrabble_Tile_Z.jpg"
};
var tile_blank = {
   letter: " ",
   id: "tile_blank",
   point_value: 0,
   amount: 2,
   remaining: 2,
   src: "Scrabble_Tiles/Scrabble_Tile_Blank.jpg"
};

var tile_list = [tile_A, tile_B, tile_C, tile_D, tile_E, tile_F, tile_G, tile_H, tile_I, tile_J, tile_K, tile_L, tile_M, tile_N, tile_O, tile_P, tile_Q, tile_R, tile_S, tile_T, tile_U, tile_V, tile_W, tile_X, tile_Y, tile_Z, tile_blank];

var i = 0;

for (i = 0; i < tile_list.length; i++) {
/*
   var new_img = document.createElement("img");
   new_img.src = tile_list[i].src;
   document.body.appendChild(new_img);
*/
   
   var tile_DOM = document.createElement("div");
   tile_DOM.id = tile_list[i].id;
   tile_DOM.className = "tile";
   var new_img = document.createElement("img");
   new_img.src = tile_list[i].src;
   
   tile_DOM.appendChild(new_img);
   //document.body.appendChild(tile_DOM);
}

/*alert("Made it here");
var result = $.grep(tile_list, function(e){return e.id === "tile_Z";});
alert("Got it");
alert(result[0].point_value);*/
