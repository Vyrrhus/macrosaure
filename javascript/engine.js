// IMAGE
var IMG = {
    OVER:   'assets/over.png',
};

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
    GAME_OVER:  false,
    PAUSE: false,
	SWITCH: false,
	NB_SWITCH: 1,
    init: function() {
        for (var element in IMG) {
            image = new Image();
            image.src = IMG[element];
            IMG[element] = image;
        }
		this.SCORE_UNTIL_SWITCH = SETTINGS.SWITCH_MODE.SCORE;
        FRAMES.init();
        BACKGROUND.init(CONTEXT.BACKGROUND);
        OBSTACLES.init(CONTEXT.OBSTACLE);
        PLAYER.init(CONTEXT.MACRON);
        SCORE.init(CONTEXT.TEXT);
    },
    start: function() {
        var self = this;
        this.PAUSE = false;
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
        if (this.GAME_OVER) {
            SCORE.drawHighScore();
            this.over();
            return;
        }
        
        // PAUSE
        if (this.PAUSE) {
            return;
        }
		
        // RUNNING
        this.tick(time);
        BACKGROUND.run(this.FPS);
        OBSTACLES.run(this.FPS);
        PLAYER.run(this.FPS);
        
        // COLLISION DETECTION
//        var player_box = PLAYER.get_hitbox();
//        var obstacle_box = OBSTACLES.get_hitbox();
//        for (var i = 0 ; i < obstacle_box.length ; i++) {
//            var e = obstacle_box[i];
//            if (player_box.x < e.x + e.w 
//                && player_box.x + player_box.w > e.x 
//                && player_box.y < e.y + e.h 
//                && player_box.h + player_box.y > e.y) {
//                this.GAME_OVER = true;
//            }
//        }
        
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
				SCORE.SCORE += SETTINGS.SCORE.PER_FRAME;
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
						this.NB_SWITCH++;
					}
					break;
				case "backward":
					if (PLAYER.OFFSET.x <= SETTINGS.SWITCH_MODE.OFFSET_COEFF * POSITION.player_offset_x) {
						PLAYER.switch_status();
						this.switch_side(SETTINGS.SWITCH_MODE.OFFSET_COEFF * POSITION.player_offset_x);
						this.SCORE_UNTIL_SWITCH = SETTINGS.SWITCH_MODE.SCORE;
						OBSTACLES.NB_OBS_MAX = SETTINGS.OBSTACLE.NB_OBS_MAX;
						this.NB_SWITCH++;
					}
					break;
			}
		} else {
			// SCORE
			SCORE.SCORE+= SETTINGS.SCORE.PER_FRAME;
			this.SCORE_UNTIL_SWITCH-= SETTINGS.SCORE.PER_FRAME;
			SCORE.drawScore();
        
			// DIFFICULTY
			this.setDifficulty();
		}
        requestAnimationFrame(function (time) {self.animate(time);});
    },
    over: function() {
        CONTEXT.TEXT.drawImage(IMG.OVER, 0, 0, 191, 56, WIDTH/2-115, HEIGHT/3,230,67);
        
    },
    reset: function() {
        this.GAME_OVER = false;
        this.LAST_TIME = 0;
        PLAYER.reset();
        OBSTACLES.reset();
        SCORE.reset();
        this.start();
    },
    stop: function() {
        this.PAUSE = true;
    },
    setDifficulty: function() {
        BACKGROUND.set_speed();
        OBSTACLES.set_speed();
        PLAYER.set_speed();
    },
	switch_side: function(x) {
		BACKGROUND.switch_side();
		OBSTACLES.switch_side();
		PLAYER.switch_side(x);
	},
    toggle_hitbox: function() {
        PLAYER.toggle_hitbox();
        OBSTACLES.toggle_hitbox();
    }
};