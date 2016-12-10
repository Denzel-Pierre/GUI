$(document).ready(function () {
   setupTable();
});

//Create Table divs
function setupTable() {
   var $total_score = $("<p id='total_score'>Total Score: " + total_score + "</p>");
   $("#game-info").prepend($total_score);

   var $word_score = $("<p id='word_score'>Word Score: " + word_score + "</p>");
   $("#game-info").append($word_score);

   var $word = $("<p id='word'>Word: " + word + "</p>");
   $("#game-info").append($word);
}

//Get a Tile via its id
function getTile(id_name) {
   var result = $.grep(tile_list, function (e) {
      return e.id === id_name;
   });
   if (result.length == 0) {
      result = $.grep(trash, function (e) {
         return e.id === id_name;
      });
   }
   alert("You got " + result[0].letter);
   return result[0];
}

var first_step = true; //Determines the very first tile being placed on the board
var first_turn = true; //Determines the first turn of the game.
var new_turn = false; //Determines the second+ turn of the game
var $last_drop_pos = null; //Carries the position of the previous spot being used by a tile.
var played_tiles = []; //Carries elements of every tile played this turn
var played_spots = []; //Carries elements of every spot played this turn
var used_tiles = []; //Carries elements of every spot and tile used this GAME
var alt_word_holder = []; //Temp word holder
var direction = null; //Determines the direction of the word tiles placed
var error = false;
var word_score = 0; //Score of current word
var total_score = 0; //Score of user
var word = []; //Carries each letter.

//Main action, makes actions depending on turn.
function checkTurn($dragTile, $dropTile, event, ui) {
   if (first_step === true) {
      if ($dropTile.attr("id") !== "8-8") {
         alert("Can only start on the star!");
         ui.draggable.draggable('option', 'revert', true);
      } else {
         first_step = false;
         ui.draggable.draggable('option', 'revert', "invalid");
         snapToMiddle(ui.draggable, $dropTile);
         $(event['target']).droppable('disable');
         $last_drop_pos = $dropTile.attr("id");
         played_tiles.push(getTile($dragTile.attr("id")));
         played_spots.push($dropTile.attr("id"));
         addScore($dragTile, $dropTile, event, ui);
         alert(played_tiles[0].letter);
         alert(played_spots[0]);
         word.push(played_tiles[played_tiles.length - 1].letter);
         recordSpot($dragTile, $dropTile);
         $("#word").text("Word: " + word[0]);
         ui.draggable("disable");
      }
   } else {
      allowedSpots($dropTile, $last_drop_pos, event, ui);
      if (error === true) {//If entered, this is not an allowed spot, revert the tile back.
         alert("error");
         error = false;
         $dropTile.droppable("enable");
         return;
      }

      ui.draggable.draggable('option', 'revert', "invalid");
      snapToMiddle(ui.draggable, $dropTile);
      $(event['target']).droppable('disable');
      played_tiles.push(getTile($dragTile.attr("id")));
      played_spots.push($dropTile.attr("id"));
      updateWord($dropTile, $dragTile, $last_drop_pos);
      alert("Played tiles length is now " + played_tiles.length);
      addScore($dragTile, $dropTile, event, ui);
      recordSpot($dragTile, $dropTile);
      $last_drop_pos = $dropTile.attr("id");
      ui.draggable("disable");
   }
}

//Determines the allowed spot just before the tile is dropped.
function allowedSpots($dropTile, $last_drop_pos, event, ui) {
   alert("We got last drop pos and its " + $last_drop_pos);
   var $last_drop = findSpot($last_drop_pos);
   var allowed = [];

   if (new_turn === true) {
      var i = 0;
      new_turn = false;

      for (i = 0; i < used_tiles.length; i++) {
                  //Check around all positions, and make them allowed spots.
         var up_current_spot = up(findSpot(used_tiles[i].spot));
         var left_current_spot = left(findSpot(used_tiles[i].spot));
         var right_current_spot = right(findSpot(used_tiles[i].spot));
         var down_current_spot = down(findSpot(used_tiles[i].spot));

         allowed.push(up_current_spot);
         allowed.push(left_current_spot);
         allowed.push(right_current_spot);
         allowed.push(down_current_spot);


      }
      alert("allowed spots are " + allowed.toString());
   }

   if (played_tiles.length == 1) {
      if (first_turn === true) {
         allowed.push("7-8", "9-8", "8-7", "8-9"); //After first tile, every spot around the star is allowed.
         first_turn = false;
      } else {
                  //Check around, make sure there are not other tiles placed, make allowed spots as necessary.
         var up_last_spot = up($last_drop);
         var left_last_spot = left($last_drop);
         var right_last_spot = right($last_drop);
         var down_last_spot = down($last_drop);

         allowed.push(up_last_spot);
         allowed.push(left_last_spot);
         allowed.push(right_last_spot);
         allowed.push(down_last_spot);

         alert("Right before where we want!");
         checkBeyondRight($last_drop, allowed);
         checkBeyondLeft($last_drop, allowed);
         checkBeyondUp($last_drop, allowed);
         checkBeyondDown($last_drop, allowed);

         if (alt_word_holder.length > 0) { //If we have an existing word_holder, that means we have an already existing tile connected to the current word. Push the letters in.
            var j = 0;
            for (j = 0; j < alt_word_holder.length; j++) {
               word.push(alt_word_holder[j]);
            }
            var word_holder = word.join("");
            $("#word").text("Word: " + word_holder);
         }

         alert("allowed spots are " + allowed.toString());
      }
   } else if (played_tiles.length >= 2) {
      findTileDifference();
      if (direction == "LR") {
         alert("Only allowed Left-Right");
         // Credit to Brian Huisman for natural sorting algorithm - http://web.archive.org/web/20130826203933/http://my.opera.com/GreyWyvern/blog/show.dml/1671288
         played_spots.sort(function alphanum(a, b) {
            function chunkify(t) {
               var tz = [],
                  x = 0,
                  y = -1,
                  n = 0,
                  i, j;

               while (i = (j = t.charAt(x++)).charCodeAt(0)) {
                  var m = (i == 46 || (i >= 48 && i <= 57));
                  if (m !== n) {
                     tz[++y] = "";
                     n = m;
                  }
                  tz[y] += j;
               }
               return tz;
            }

            var aa = chunkify(a);
            var bb = chunkify(b);

            for (x = 0; aa[x] && bb[x]; x++) {
               if (aa[x] !== bb[x]) {
                  var c = Number(aa[x]),
                     d = Number(bb[x]);
                  if (c == aa[x] && d == bb[x]) {
                     return c - d;
                  } else return (aa[x] > bb[x]) ? 1 : -1;
               }
            }
            return aa.length - bb.length;
         });
         alert("Played spots are " + played_spots.toString());
         var left_spot = left(findSpot(played_spots[0]));
         var right_spot = right(findSpot(played_spots[played_spots.length - 1]));
         allowed.push(left_spot, right_spot);
         alert("allowed spots are " + allowed.toString());
      } else if (direction == "TB") {
         alert("Only allowed Top-Bottom");
         played_spots.sort(function alphanum(a, b) {
            function chunkify(t) {
               var tz = [],
                  x = 0,
                  y = -1,
                  n = 0,
                  i, j;

               while (i = (j = t.charAt(x++)).charCodeAt(0)) {
                  var m = (i == 46 || (i >= 48 && i <= 57));
                  if (m !== n) {
                     tz[++y] = "";
                     n = m;
                  }
                  tz[y] += j;
               }
               return tz;
            }

            var aa = chunkify(a);
            var bb = chunkify(b);

            for (x = 0; aa[x] && bb[x]; x++) {
               if (aa[x] !== bb[x]) {
                  var c = Number(aa[x]),
                     d = Number(bb[x]);
                  if (c == aa[x] && d == bb[x]) {
                     return c - d;
                  } else return (aa[x] > bb[x]) ? 1 : -1;
               }
            }
            return aa.length - bb.length;
         });
         alert("Played spots are " + played_spots.toString());
         var top_spot = up(findSpot(played_spots[0]));
         var bottom_spot = down(findSpot(played_spots[played_spots.length - 1]));
         allowed.push(top_spot, bottom_spot);
         alert("allowed spots are " + allowed.toString());
      }
   }

   var found_allowed = (allowed.indexOf($dropTile.attr("id")) > -1);

   if (found_allowed === true) {
      alert("Yay " + $dropTile.attr("id") + " matches " + allowed.toString());
   } else {
      alert("Huh, you didn't match. You sure it's not " + allowed.toString() + "? I mean you have " + $dropTile.attr("id"));
      ui.draggable.draggable('option', 'revert', true);
      error = true;
   }
}

//Determines whether the user is going from Left-Right or from Top-Bottom
function findTileDifference() {
   var spot1 = played_spots[played_spots.length - 2];
   var spot2 = played_spots[played_spots.length - 1];
   alert("Spot 1 is " + spot1);
   alert("Spot 2 is " + spot2);

   var spot1_y = spot1.substring(0, spot1.indexOf("-"));
   var spot1_x = spot1.substring(spot1.indexOf("-") + 1);

   var spot2_y = spot2.substring(0, spot2.indexOf("-"));
   var spot2_x = spot2.substring(spot2.indexOf("-") + 1);

   if (spot1_x != spot2_x) {
      alert("Reading from Left to Right");
      direction = "LR";
   } else if (spot1_y != spot2_y) {
      alert("Reading from Top to Bottom");
      direction = "TB";
   }

}

//Gets the Spot left of the current spot, returns ID
function left($dropTile) {
   var hold = $dropTile.attr("id");
   var hold_x = getTileX(hold);
   var hold_y = getTileY(hold);

   hold_x = parseInt(hold_x) - 1;

   var answer = hold_y + "-" + hold_x;

   return answer;
}

//Gets the Spot right of the current spot, returns ID
function right($dropTile) {
   var hold = $dropTile.attr("id");
   var hold_x = getTileX(hold);
   var hold_y = getTileY(hold);

   hold_x = parseInt(hold_x) + 1;

   var answer = hold_y + "-" + hold_x;

   return answer;
}

//Gets the Spot Up of the current spot, returns ID
function up($dropTile) {
   var hold = $dropTile.attr("id");
   var hold_x = getTileX(hold);
   var hold_y = getTileY(hold);

   hold_y = parseInt(hold_y) - 1;

   var answer = hold_y + "-" + hold_x;


   return answer;
}

//Gets the Spot down of the current spot, returns ID
function down($dropTile) {
   var hold = $dropTile.attr("id");
   var hold_x = getTileX(hold);
   var hold_y = getTileY(hold);

   hold_y = parseInt(hold_y) + 1;

   var answer = hold_y + "-" + hold_x;

   return answer;
}

//Adds the score of each Tile, using bonus letter spots as necessary.
function addScore($dragTile, $dropTile, event, ui) {
   var tile = getTile($dragTile.attr("id"));

   var score_holder = tile.point_value;

   if ($dropTile.hasClass("double_letter")) { //If lands of double_letter tile, multiply point value by 2
      score_holder = score_holder * 2;
   } else if ($dropTile.hasClass("triple_letter")) { //If lands of triple_letter tile, multiply point value by 3
      score_holder = score_holder * 3;
   }

   word_score = word_score + score_holder;

   $("#word_score").text("Word Score: " + word_score);

}

//Updates the score, using bonus WORD spots as necessary
function updateScore() {
   var i = 0;
   var spot_holder = null;
   var score_multiplier = 1;

   for (i = 0; i < used_tiles.length; i++) {
      alert("Current used tile is " + used_tiles[i].spot);
      spot_holder = findSpot(used_tiles[i].spot);
      if (spot_holder.hasClass("triple_word")) {
         alert("Triple Bonus!");
         score_multiplier = score_multiplier * 3;
      } else if (spot_holder.hasClass("double_word")) {
         alert("Double Bonus!");
         score_multiplier = score_multiplier * 2;
      }
   }

   total_score = total_score + (word_score * score_multiplier);
   word_score = 0;

}

//Adds the letter to the word array, depending if it should go before or after the current letter.
function updateWord($dropTile, $dragTile, $last_drop_pos) {
   /*   var message = "Up of " + $last_drop_pos + "is " + up($("#" + $last_drop_pos));
      alert(message);*/

   if (parseInt(getTileY($dropTile.attr("id"))) < parseInt(getTileY($last_drop_pos)) || parseInt(getTileX($dropTile.attr("id"))) < parseInt(getTileX($last_drop_pos))) {
      word.unshift(played_tiles[played_tiles.length - 1].letter);
   } else if (parseInt(getTileY($dropTile.attr("id"))) > parseInt(getTileY($last_drop_pos)) || parseInt(getTileX($dropTile.attr("id"))) > parseInt(getTileX($last_drop_pos))) {
      word.push(played_tiles[played_tiles.length - 1].letter);
   }

   var word_holder = word.join("");
   $("#word").text("Word: " + word_holder);
}

//Gets the X coordinate of a given Spot
function getTileX(id_string) {
   var result = id_string.substring(id_string.indexOf("-") + 1);

   return result;
}

//Gets the Y coordinate of a given spot
function getTileY(id_string) {
   var result = id_string.substring(0, id_string.indexOf("-"));

   return result;
}

//Finds the Spot via its id - returns $(#(coordinate))
function findSpot(id_string) {
   var $result = $("#" + id_string);

   return $result;
}

//Adds the spot to the used_tiles array
function recordSpot($dragTile, $dropTile) {
   var game_spot = {
      tile: null,
      spot: null
   };

   game_spot.tile = $dragTile.attr("id");
   game_spot.spot = $dropTile.attr("id");

   used_tiles.push(game_spot);
}

//Ends the turn
function endTurn() {
   alert("We're in EndTurn!");
   updateScore();
alert("Right before fill rack");
   fillRack();
   $("#total_score").text("Total Score: " + total_score);
   $("#word_score").text("Word Score: " + word_score);
   word = [];
   played_tiles = [];
   played_spots = [];
   $("#word").text("Word: " + word.join(""));

   
   new_turn = true;

}

//Recursively check beyond the given square for a certain direction until reaching an empty spot. Add every letter until then.
function checkBeyondRight($last_drop, allowed) {
   alert("We made it to CheckBeyond");
   alert("Last drop id is " + $last_drop.attr("id"));

   alert((right($last_drop)));
   var result = $.grep(used_tiles, function (e) {
      return e.spot === (right($last_drop));
   });
   alert("Made it past the find!");

   if (result.length > 0) {
      alert("Got a result!" + result[0].spot);
      checkBeyondRight(findSpot(right($last_drop)), allowed);
      var temp = findSpot(result[0].spot);
      alt_word_holder.unshift(getTile(result[0].tile).letter);
      alert("We pushed!");
      allowed.push(right(temp));
   }
   alert("Nope, no results");
   return;
}

function checkBeyondLeft($last_drop, allowed) {
   var result = $.grep(used_tiles, function (e) {
      return e.spot === (left($last_drop));
   });

   if (result.length > 0) {
      checkBeyondLeft(findSpot(left($last_drop)), allowed);
      var temp = findSpot(result[0].spot);
      alt_word_holder.push(getTile(result[0].tile).letter);
      allowed.push(left(temp));
   }
   return;
}

function checkBeyondUp($last_drop, allowed) {
   var result = $.grep(used_tiles, function (e) {
      return e.spot === (up($last_drop));
   });

   if (result.length > 0) {
      checkBeyondUp(findSpot(up($last_drop)), allowed);
      var temp = findSpot(result[0].spot);
      alt_word_holder.push(getTile(result[0].tile).letter);
      allowed.push(up(temp));
   }
   return;
}

function checkBeyondDown($last_drop, allowed) {
   var result = $.grep(used_tiles, function (e) {
      return e.spot === (down($last_drop));
   });

   if (result.length > 0) {
      checkBeyondDown(findSpot(down($last_drop)), allowed);
      var temp = findSpot(result[0].spot);
      alt_word_holder.unshift(getTile(result[0].tile).letter);
      allowed.push(down(temp));
   }
   return;
}

//Event Listener
document.getElementById("End_Turn").addEventListener("click", function () {
   alert("Hello World");
   endTurn();
});
