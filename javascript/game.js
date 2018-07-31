/* We need to fix all those events to declare them in config.js file.
    + Resize function to try
    + Focus & blur events
*/

var LOCK = false;
GAME.init();

document.addEventListener('mouseup', function(event) {
    if (!LOCK) {
            GAME.start();
            LOCK = true;
        } else {
            if (!PLAYER.JUMP.STATUS) {
                PLAYER.switch_status();
            }
        }
    if (GAME.GAME_OVER) {
            GAME.reset();
        }
})

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 32 || event.jeyCode == 38) {
        if (!LOCK) {
            GAME.start();
            LOCK = true;
        } else {
            if (!PLAYER.JUMP.STATUS) {
                PLAYER.switch_status();
            }
        }
    }
    if (event.keyCode == 84) {
        GAME.toggle_hitbox();
    }
    if (event.keyCode == 27 || event.keyCode == 80) {
        GAME.PAUSE = !GAME.PAUSE;
        GAME.start();
    }
    
    if (event.keyCode == 16) {
//        resize();
    }
})

function resize() {
    var height = document.getElementById('body').offsetHeight;
    var scale = Math.trunc(height/200);
    HEIGHT *= scale;
    WIDTH *= scale;
    resizeCanvas(CANVAS.BACKGROUND, CANVAS.MACRON, CANVAS.OBSTACLE, CANVAS.TEXT);
    function resizeCanvas() {
        [].forEach.call(arguments, function(element) {
            element.height = HEIGHT;
            element.width = WIDTH;
        });
    }
}

//window.onload = function() {
//	resize();
//	window.addEventListener('resize', resize, false);
//	function resize() {
//		WIDTH  = document.getElementById('body').offsetWidth;
//		HEIGHT = document.getElementById('body').offsetHeight;
//		CENTER = [Math.floor (WIDTH/2),
//				  Math.floor(HEIGHT/2)];
//		resizeCanvas(BACKGROUND,ORBIT,ANIMATION,TEXT,CONTROL);
//		function resizeCanvas() {
//			[].forEach.call(arguments, function(element) {
//				element.width  = WIDTH;
//				element.height = HEIGHT;
//			});
//		}
//		// Function for backgrounds redraw at each resize
//		set_BACKGROUND();
//		FOCUS.draw();
//		PX.scale(20,30);
//		BUTTON.draw_ORBIT.draw();
//		BUTTON.draw_INFO.draw();
//		BUTTON.draw_TIMELINE.size = 40 + WIDTH/100;
//		BUTTON.draw_TIMELINE.draw();
//	}
//}
