$(document).ready(function () {
   setupTable();
});

function setupTable() {
   var $total_score = $("<p id='total_score'>Total Score: " + total_score + "</p>");
   $("#game-info").prepend($total_score);

   var $word_score = $("<p id='word_score'>Word Score: " + word_score + "</p>");
   $("#game-info").append($word_score);

   var $word = $("<p id='word'>Word: " + word + "</p>");
   $("#game-info").append($word);
}

function getTile(id_name) {
   var result = $.grep(tile_list, function (e) {
      return e.id === id_name;
   });
   return result[0];
}

var first_step = true;
var first_turn = true;
var new_turn = false;
var $last_drop_pos = null;
var played_tiles = [];
var played_spots = [];
var used_tiles = [];
var alt_word_holder = [];
var direction = null;
var error = false;
var word_score = 0;
var total_score = 0;
var word = [];

function checkTurn($dragTile, $dropTile, event, ui) {
   if (first_step === true) {
      if ($dropTile.attr("id") !== "8-8") {
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
         word.push(played_tiles[played_tiles.length - 1].letter);
         recordSpot($dragTile, $dropTile);
         $("#word").text("Word: " + word[0]);
         ui.draggable("disable");
      }
   } else {
      allowedSpots($dropTile, $last_drop_pos, event, ui);
      if (error === true) {
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
      addScore($dragTile, $dropTile, event, ui);
      recordSpot($dragTile, $dropTile);
      $last_drop_pos = $dropTile.attr("id");
      ui.draggable("disable");
   }
}

function allowedSpots($dropTile, $last_drop_pos, event, ui) {
   var $last_drop = findSpot($last_drop_pos);
   var allowed = [];

   if (new_turn === true) {
      var i = 0;
      new_turn = false;

      for (i = 0; i < used_tiles.length; i++) {
         var up_current_spot = up(findSpot(used_tiles[i].spot));
         var left_current_spot = left(findSpot(used_tiles[i].spot));
         var right_current_spot = right(findSpot(used_tiles[i].spot));
         var down_current_spot = down(findSpot(used_tiles[i].spot));

         allowed.push(up_current_spot);
         allowed.push(left_current_spot);
         allowed.push(right_current_spot);
         allowed.push(down_current_spot);


      }
   }

   if (played_tiles.length == 1) {
      if (first_turn === true) {
         allowed.push("7-8", "9-8", "8-7", "8-9");
         first_turn = false;
      } else {
         var up_last_spot = up($last_drop);
         var left_last_spot = left($last_drop);
         var right_last_spot = right($last_drop);
         var down_last_spot = down($last_drop);

         allowed.push(up_last_spot);
         allowed.push(left_last_spot);
         allowed.push(right_last_spot);
         allowed.push(down_last_spot);

         checkBeyondRight($last_drop, allowed);
         checkBeyondLeft($last_drop, allowed);
         checkBeyondUp($last_drop, allowed);
         checkBeyondUp($last_drop, allowed);

         if (alt_word_holder.length > 0) {
            var j = 0;
            for (j = 0; j < alt_word_holder.length; j++) {
               word.push(alt_word_holder[j]);
            }
            var word_holder = word.join("");
            $("#word").text("Word: " + word_holder);
         }

      }
   } else if (played_tiles.length >= 2) {
      findTileDifference();
      if (direction == "LR") {
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
         var left_spot = left(findSpot(played_spots[0]));
         var right_spot = right(findSpot(played_spots[played_spots.length - 1]));
         allowed.push(left_spot, right_spot);
      } else if (direction == "TB") {
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
         var top_spot = up(findSpot(played_spots[0]));
         var bottom_spot = down(findSpot(played_spots[played_spots.length - 1]));
         allowed.push(top_spot, bottom_spot);
      }
   }

   var found_allowed = (allowed.indexOf($dropTile.attr("id")) > -1);

   if (found_allowed === true) {} else {
      ui.draggable.draggable('option', 'revert', true);
      error = true;
   }
}

function findTileDifference() {
   var spot1 = played_spots[played_spots.length - 2];
   var spot2 = played_spots[played_spots.length - 1];

   var spot1_y = spot1.substring(0, spot1.indexOf("-"));
   var spot1_x = spot1.substring(spot1.indexOf("-") + 1);

   var spot2_y = spot2.substring(0, spot2.indexOf("-"));
   var spot2_x = spot2.substring(spot2.indexOf("-") + 1);

   if (spot1_x != spot2_x) {
      direction = "LR";
   } else if (spot1_y != spot2_y) {
      direction = "TB";
   }

}

function left($dropTile) {
   var hold = $dropTile.attr("id");
   var hold_x = getTileX(hold);
   var hold_y = getTileY(hold);

   hold_x = parseInt(hold_x) - 1;

   var answer = hold_y + "-" + hold_x;

   return answer;
}

function right($dropTile) {
   var hold = $dropTile.attr("id");
   var hold_x = getTileX(hold);
   var hold_y = getTileY(hold);

   hold_x = parseInt(hold_x) + 1;

   var answer = hold_y + "-" + hold_x;

   return answer;
}

function up($dropTile) {
   var hold = $dropTile.attr("id");
   var hold_x = getTileX(hold);
   var hold_y = getTileY(hold);

   hold_y = parseInt(hold_y) - 1;

   var answer = hold_y + "-" + hold_x;


   return answer;
}

function down($dropTile) {
   var hold = $dropTile.attr("id");
   var hold_x = getTileX(hold);
   var hold_y = getTileY(hold);

   hold_y = parseInt(hold_y) + 1;

   var answer = hold_y + "-" + hold_x;

   return answer;
}

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

function updateScore() {
   var i = 0;
   var spot_holder = null;
   var score_multiplier = 1;

   for (i = 0; i < used_tiles.length; i++) {
      spot_holder = findSpot(used_tiles[i].spot);
      if (spot_holder.hasClass("triple_word")) {
         score_multiplier = score_multiplier * 3;
      } else if (spot_holder.hasClass("double_word")) {
         score_multiplier = score_multiplier * 2;
      }
   }

   total_score = total_score + (word_score * score_multiplier);
   word_score = 0;

}

function updateWord($dropTile, $dragTile, $last_drop_pos) {

   if (parseInt(getTileY($dropTile.attr("id"))) < parseInt(getTileY($last_drop_pos)) || parseInt(getTileX($dropTile.attr("id"))) < parseInt(getTileX($last_drop_pos))) {
      word.unshift(played_tiles[played_tiles.length - 1].letter);
   } else if (parseInt(getTileY($dropTile.attr("id"))) > parseInt(getTileY($last_drop_pos)) || parseInt(getTileX($dropTile.attr("id"))) > parseInt(getTileX($last_drop_pos))) {
      word.push(played_tiles[played_tiles.length - 1].letter);
   }

   var word_holder = word.join("");
   $("#word").text("Word: " + word_holder);
}

function getTileX(id_string) {
   var result = id_string.substring(id_string.indexOf("-") + 1);

   return result;
}

function getTileY(id_string) {
   var result = id_string.substring(0, id_string.indexOf("-"));

   return result;
}

function findSpot(id_string) {
   var $result = $("#" + id_string);

   return $result;
}

function recordSpot($dragTile, $dropTile) {
   var game_spot = {
      tile: null,
      spot: null
   };

   game_spot.tile = $dragTile.attr("id");
   game_spot.spot = $dropTile.attr("id");

   used_tiles.push(game_spot);
}

function endTurn() {
   updateScore();

   $("#total_score").text("Total Score: " + total_score);
   $("#word_score").text("Word Score: " + word_score);
   word = [];
   played_tiles = [];
   played_spots = [];
   $("#word").text("Word: " + word.join(""));

   new_turn = true;

}

function checkBeyondRight($last_drop, allowed) {
   var result = $.grep(used_tiles, function (e) {
      return e.spot === (right($last_drop));
   });

   if (result.length > 0) {
      checkBeyondRight(findSpot(right($last_drop)), allowed);
      var temp = findSpot(result[0].spot);
      alt_word_holder.unshift(getTile(result[0].tile).letter);
      allowed.push(right(temp));
   }
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

document.getElementById("End_Turn").addEventListener("click", function () {
   endTurn();
});
