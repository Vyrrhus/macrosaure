// LOCK to prevent multiple start (click & keyboard & touch)
var LOCK = false;
var TOUCH = false;
// EVENTS

window.onload = function() {
	set_screen();
	GAME.init();
};

window.onfocus = function() {
	GAME.STATE.PAUSE = false;
}

window.onblur = function() {
	GAME.STATE.PAUSE = true;
}

window.addEventListener('resize', set_screen, false);

document.addEventListener('touchstart', function(event) {
	if (!LOCK) {
		start();
	} else {
		jump();
	}
	if (GAME.STATE.GAME_OVER) {
		GAME.reset();
	}
	TOUCH = true;
});

document.addEventListener('mousedown', function(event) {
	if (TOUCH) {
		TOUCH = false;
		return
	}
    if (!LOCK) {
		start();
	} else {
		jump();
	}
	if (GAME.STATE.GAME_OVER) {
		GAME.reset();
	}
});

document.addEventListener('keydown', function(event) {
	if (GAME.STATE.GAME_OVER) {
		return
	}
    if (event.keyCode == 32 || event.keyCode == 38) {
        if (!LOCK) {
            start();
        } else {
            jump();
        }
    }
    if (event.keyCode == 84) {
        GAME.toggle_hitbox();
    }
	if (event.keyCode == 96) {
		GAME.toggle_collision();
	}
	if (event.keyCode == 77) {
		SCORE.toggle_mode();
	}
});

// FUNCTIONS
function start() {
	jump();
	GAME.start();
	LOCK = true;
}

function jump() {
	if (!PLAYER.JUMP.STATUS) {
		AUDIO.FILES.JUMP.play();
		PLAYER.switch_status();
	}
}

function set_screen() {
	if ((window.innerWidth - window.innerWidth%WIDTH_TO_HEIGHT_RATIO) / WIDTH_TO_HEIGHT_RATIO <= window.innerHeight) {
		var new_width = window.innerWidth - window.innerWidth%WIDTH_TO_HEIGHT_RATIO;
		var new_height = new_width / WIDTH_TO_HEIGHT_RATIO;
	} else {
		var new_height = window.innerHeight;
		var new_width = WIDTH_TO_HEIGHT_RATIO * new_height;
	}
	if (new_width > MAX_WIDTH) {
		new_width = MAX_WIDTH - MAX_WIDTH%WIDTH_TO_HEIGHT_RATIO;
		new_height = new_width / WIDTH_TO_HEIGHT_RATIO;
	}
	var side_margin = Math.ceil((window.innerWidth - new_width)/2);
	var top_margin = Math.trunc((window.innerHeight - new_height)/2);
	for (var element in CANVAS) {
		CANVAS[element].style.width = new_width+"px";
		CANVAS[element].style.height = new_height+"px";
		CANVAS[element].style.marginLeft = side_margin+"px";
		CANVAS[element].style.marginRight = side_margin+"px";
		CANVAS[element].style.marginTop = top_margin+"px";
		CANVAS[element].style.marginBottom = top_margin+"px";
	}
}
