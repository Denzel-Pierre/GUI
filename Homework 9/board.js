/*
File: Homework 9/board.js
Denzel Pierre - Denzel_Pierre@student.uml.edu
UMASS Lowell Computer Science
COMP 4610-201 - GUI Programming I
Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop
Created on 01 December 2016, 2:04PM
Updated on 05 December 2016, 3:56PM - Fixed board ids
*/

var x=15;
var y=15;

var chessBoard = document.getElementById("chessBoard");

for (var i=0; i<y; i++){
    var row = chessBoard.appendChild(document.createElement("div"));
   row.id = "row" + (i+1);
    for (var j=0; j<x; j++){
        var col = row.appendChild(document.createElement("span"));
       col.id = (i+1) + "-" + (j+1);
    }
}

//alert("Made it here");
var $double_letter = $("#chessBoard div:nth-child(1) span:nth-child(4), #chessBoard div:nth-child(1) span:nth-last-child(4), #chessBoard div:nth-child(3) span:nth-child(7), #chessBoard div:nth-child(3) span:nth-last-child(7), #chessBoard div:nth-child(4) span:nth-child(7n+1), #chessBoard div:nth-child(7) span:nth-child(3), #chessBoard div:nth-child(7) span:nth-last-child(3), #chessBoard div:nth-child(7) span:nth-child(7), #chessBoard div:nth-child(7) span:nth-last-child(7), #chessBoard div:nth-child(8) span:nth-child(4), #chessBoard div:nth-child(8) span:nth-last-child(4), #chessBoard div:nth-last-child(1) span:nth-child(4), #chessBoard div:nth-last-child(1) span:nth-last-child(4), #chessBoard div:nth-last-child(3) span:nth-child(7), #chessBoard div:nth-last-child(3) span:nth-last-child(7), #chessBoard div:nth-last-child(4) span:nth-child(7n+1), #chessBoard div:nth-last-child(7) span:nth-child(3), #chessBoard div:nth-last-child(7) span:nth-last-child(3), #chessBoard div:nth-last-child(7) span:nth-child(7), #chessBoard div:nth-last-child(7) span:nth-last-child(7)");

$double_letter.addClass("bonus double_letter");
//alert("Made it here too");

var $triple_letter = $("#chessBoard div:nth-child(2) span:nth-child(6), #chessBoard div:nth-child(2) span:nth-last-child(6), #chessBoard div:nth-child(6) span:nth-child(2), #chessBoard div:nth-child(6) span:nth-last-child(2), #chessBoard div:nth-child(6) span:nth-child(6), #chessBoard div:nth-child(6) span:nth-last-child(6), #chessBoard div:nth-last-child(2) span:nth-child(6), #chessBoard div:nth-last-child(2) span:nth-last-child(6), #chessBoard div:nth-last-child(6) span:nth-child(2), #chessBoard div:nth-last-child(6) span:nth-last-child(2), #chessBoard div:nth-last-child(6) span:nth-child(6), #chessBoard div:nth-last-child(6) span:nth-last-child(6)");

$triple_letter.addClass("bonus triple_letter");
//alert("Also made it here");

var $double_word = $("#chessBoard div:nth-child(2) span:nth-child(2), #chessBoard div:nth-child(2) span:nth-last-child(2), #chessBoard div:nth-child(3) span:nth-child(3), #chessBoard div:nth-child(3) span:nth-last-child(3), #chessBoard div:nth-child(4) span:nth-child(4), #chessBoard div:nth-child(4) span:nth-last-child(4), #chessBoard div:nth-child(5) span:nth-child(5), #chessBoard div:nth-child(5) span:nth-last-child(5), #chessBoard div:nth-last-child(5) span:nth-child(5), #chessBoard div:nth-last-child(5) span:nth-last-child(5), #chessBoard div:nth-last-child(4) span:nth-child(4), #chessBoard div:nth-last-child(4) span:nth-last-child(4), #chessBoard div:nth-last-child(3) span:nth-child(3), #chessBoard div:nth-last-child(3) span:nth-last-child(3), #chessBoard div:nth-last-child(2) span:nth-child(2), #chessBoard div:nth-last-child(2) span:nth-last-child(2)");

$double_word.addClass("bonus double_word");
//alert("Don't forget me!");

var $triple_word = $("#chessBoard div:nth-child(1) span:nth-child(7n+1), #chessBoard div:nth-child(8) span:nth-child(1), #chessBoard div:nth-child(8) span:nth-last-child(1), #chessBoard div:nth-last-child(1) span:nth-child(7n+1)");

$triple_word.addClass("bonus triple_word");
//alert("I did too!");