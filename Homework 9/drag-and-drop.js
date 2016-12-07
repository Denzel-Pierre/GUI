/*
File: Homework 9/drag-and-drop.js
Denzel Pierre - Denzel_Pierre@student.uml.edu
UMASS Lowell Computer Science
COMP 4610-201 - GUI Programming I
Assignment 9: Implementing a Bit of Scrabble with Drag-and-Drop
Created on 06 November 2016, 10:52PM
*/

//Snap to Middle function found by jeschafe at http://stackoverflow.com/a/11440368
      function snapToMiddle(dragger, target) {
         var topMove = target.position().top - dragger.data('position').top + (target.outerHeight(true) - dragger.outerHeight(true)) / 2;
         var leftMove = target.position().left - dragger.data('position').left + (target.outerWidth(true) - dragger.outerWidth(true)) / 2;
         dragger.animate({
            top: topMove,
            left: leftMove
         }, {
            duration: 600,
            easing: 'easeOutBack'
         });
      }
      //Droppable accepting one Draggable function found by Harrison Powers at http://stackoverflow.com/a/22211268
      $(function() {
         $(".tile").draggable({
            opacity: .8,
            revert: "invalid",
            start: function(ev, ui) {
               $('.ui-droppable').each(function(i, el) {
                  if (!$(el).find('.ui-draggable').length) $(el).droppable('enable');
               });
            },
            create: function() {
               $(this).data('position', $(this).position())
            },
            cursorAt: {
               left: 15
            },
            cursor: 'move',
            start: function() {
               $(this).stop(true, true)
            }

         });

         $("span").droppable({
            greedy: true,
            classes: {
               "ui-droppable-active": "ui-state-active",
               "ui-droppable-hover": "ui-state-hover"
            },
            drop: function(event, ui) {
               var $dragTile = ui.draggable;
               var $dropTile = $(this);
               alert("This is " + $dragTile.attr("id") + " Dropped in " + $dropTile.attr("id"));
               checkTurn($dragTile, $dropTile, event, ui);
            }
         });

         /*         $("span:not(#8-8)").droppable({
                     disabled: true
                  });*/
      });