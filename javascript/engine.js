// TIME
function getTimeNow() {
    return new Date();
}

// RANDOM NUM
function getRandom(min, max) {
	if (max == 0) {return 0;}
    return Math.floor(Math.random() * (max+1-min) + min);
}

var GAME = {
    LAST_TIME:  0,
    FRAME_TIME: 0,
    FPS:        0,
    START_FPS:  60,
	STATE: {
		GAME_OVER: false,
		PAUSE: false,
		NB_SWITCH: 1,
		COLLISION: true
	},
    init: function() {
		this.SCORE_UNTIL_SWITCH = SETTINGS.SWITCH_MODE.SCORE;
		AUDIO.init();
        FRAMES.init();
        BACKGROUND.init(CONTEXT.BACKGROUND);
        OBSTACLES.init(CONTEXT.OBSTACLE);
        PLAYER.init(CONTEXT.MACRON);
        SCORE.init(CONTEXT.TEXT);
    },
    start: function() {
        var self = this;
        this.STATE.PAUSE = false;
        requestAnimationFrame(function (time) {self.animate(time);});
    },
    tick: function(time) {
        this.updateFrameRate(time);
        this.LAST_TIME = time;
    },
    updateFrameRate: function(time) {
        if (this.LAST_TIME === 0) {
            this.FPS = this.START_FPS;
        }
        else {
            var delta = (time - this.LAST_TIME) / 1000;
            if (delta > 0 && delta < 0.5) {
                this.FRAME_TIME = delta;
            }
            else {
                this.FRAME_TIME = 0;
            }
            this.FPS = 1 / this.FRAME_TIME;
        }
    },
    animate: function(time) {
        var self = this;
        
        // GAME OVER
        if (this.STATE.GAME_OVER) {
            SCORE.drawHighScore();
            this.over();
            return;
        }
        
        // PAUSE
        if (this.STATE.PAUSE) {
            return;
        }
		
        // RUNNING
        this.tick(time);
        BACKGROUND.run(this.FPS);
        OBSTACLES.run(this.FPS);
        PLAYER.run(this.FPS);
        
		if (this.STATE.COLLISION) {
			this.collision();
		}
		
		// SWITCH SIDE
		if (this.SCORE_UNTIL_SWITCH < 0) {
			OBSTACLES.NB_OBS_MAX = 0;
			if (OBSTACLES.NB_CURRENT_OBS == 0) {
				BACKGROUND.stop();
				var transX = Math.abs((SPEED.MOTION.GROUND + SPEED.MOTION.OBSTACLE)/this.FPS);
				if (PLAYER.RUNNING_SIDE == "forward") {
					PLAYER.OFFSET.x += transX;
				} else {
					PLAYER.OFFSET.x -= transX;
				}
			} else {
				SCORE.set_score();
				SCORE.drawScore();
				this.setDifficulty();
			}
			switch (PLAYER.RUNNING_SIDE) {
				case "forward":
					if (PLAYER.OFFSET.x >= WIDTH - SETTINGS.SWITCH_MODE.OFFSET_COEFF * POSITION.player_offset_x) {
						PLAYER.switch_status();
						this.switch_side(WIDTH - SETTINGS.SWITCH_MODE.OFFSET_COEFF * POSITION.player_offset_x);
						this.SCORE_UNTIL_SWITCH = SETTINGS.SWITCH_MODE.SCORE;
						OBSTACLES.NB_OBS_MAX = SETTINGS.OBSTACLE.NB_OBS_MAX;
						this.STATE.NB_SWITCH++;
					}
					break;
				case "backward":
					if (PLAYER.OFFSET.x <= SETTINGS.SWITCH_MODE.OFFSET_COEFF * POSITION.player_offset_x) {
						PLAYER.switch_status();
						this.switch_side(SETTINGS.SWITCH_MODE.OFFSET_COEFF * POSITION.player_offset_x);
						this.SCORE_UNTIL_SWITCH = SETTINGS.SWITCH_MODE.SCORE;
						OBSTACLES.NB_OBS_MAX = SETTINGS.OBSTACLE.NB_OBS_MAX;
						this.STATE.NB_SWITCH++;
					}
					break;
			}
		} else {
			// SCORE
			SCORE.set_score();
			SCORE.drawScore();
        
			// DIFFICULTY
			this.setDifficulty();
		}
		
        requestAnimationFrame(function (time) {self.animate(time);});
    },
    over: function() {
		var img = new Image();
		img.src = FILES.GAME_OVER;
		img.onload = function() {
			CONTEXT.TEXT.drawImage(img, 0, 0, 191, 56, WIDTH/2-115, HEIGHT/3,230,67);
		}
        
        
    },
    reset: function() {
        this.STATE.GAME_OVER = false;
        this.LAST_TIME = 0;
		this.SCORE_UNTIL_SWITCH = SETTINGS.SWITCH_MODE.SCORE;
        PLAYER.reset();
        OBSTACLES.reset();
        SCORE.reset();
        this.start();
    },
    stop: function() {
        this.STATE.PAUSE = true;
    },
	collision: function() {
		var player_box = PLAYER.get_hitbox();
		var list_obs_box = OBSTACLES.get_hitbox();
		for (var i = 0 ; i < list_obs_box.length ; i++) {
			var obs_box = list_obs_box[i];
			for (var j = 0 ; j < player_box.length ; j++) {
				for (var k = 0 ; k < obs_box.length ; k++) {
					if (player_box[j].x < obs_box[k].x + obs_box[k].width
					    && player_box[j].x + player_box[j].width > obs_box[k].x
					    && player_box[j].y < obs_box[k].y + obs_box[k].height
					    && player_box[j].y + player_box[j].width > obs_box[k].y) {
						this.STATE.GAME_OVER = true;
						AUDIO.FILES.HIT.play();
					}
				}
			}
		}
	},
    setDifficulty: function() {
        BACKGROUND.set_difficulty();
        OBSTACLES.set_difficulty();
        PLAYER.set_difficulty();
    },
	switch_side: function(x) {
		BACKGROUND.switch_side();
		OBSTACLES.switch_side();
		PLAYER.switch_side(x);
	},
    toggle_hitbox: function() {
        PLAYER.toggle_hitbox();
        OBSTACLES.toggle_hitbox();
    },
	toggle_collision: function() {
		this.STATE.COLLISION = !this.STATE.COLLISION;
	}
};