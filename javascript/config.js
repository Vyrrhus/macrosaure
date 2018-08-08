// CANVAS
var CANVAS = {
    BACKGROUND: document.getElementById('background'),
    OBSTACLE:   document.getElementById('obstacle'),
    MACRON:     document.getElementById('macron'),
    TEXT:       document.getElementById('text')
};

// CANVAS SIZE
var WIDTH_TO_HEIGHT_RATIO = 3;
var MAX_WIDTH = 1299;
var WIDTH   = CANVAS.BACKGROUND.width;
var HEIGHT  = CANVAS.BACKGROUND.height;

// CONTEXT
var CONTEXT = {
    BACKGROUND: CANVAS.BACKGROUND.getContext('2d'),
    OBSTACLE:   CANVAS.OBSTACLE.getContext('2d'),
    MACRON:     CANVAS.MACRON.getContext('2d'),
    TEXT:       CANVAS.TEXT.getContext('2d')
};

// IMAGE FILES
var FILES = {
    SCORE: 'assets/score.png',
    PLAYER: 'assets/macron.png',
    OBSTACLE: 'assets/obs.png',
    GROUND: 'assets/ground.png',
    SKY: 'assets/sky.png'
};

// AUDIO FILES
var AUDIO = {
	JUMP: 'sound/jump.wav'
}

// SETTINGS
var SPEED = {
    ANIMATION: {
        JUMP:   8,      // img/s
        RUN:    4,      // img/s
        OBSTACLE: 4     // img/s
    },
    MOTION: {
        GROUND: -150,   // PX/s
        SKY: -5,        // PX/s
        OBSTACLE: -20,  // PX/s
		rate_background: function(score) {
			return 1 + 4 * Math.tanh(score/3000)
		}
    }
};

var POSITION = {
    player_offset_x: 0.1*WIDTH,
    get_ground: function() {
        return 0.8*HEIGHT;
    },
    get_sky: function() {
        return getRandom(0.2*HEIGHT, 0.4*HEIGHT);
    },
    get_people: function() {
        return POSITION.get_ground() - HEIGHT * 0.02;
    }
};

var SETTINGS = {
    PLAYER: {
        JUMP_HEIGHT: 50,    // pixels
        JUMP_TIME: 0.6      // secondes
    },
    OBSTACLE: {
        NB_PIXEL_BLOCKED: 20,   // pixel
        GAP_COEFF: 1.1,
        WIDTH_COEFF: 0.5,
        GENERATOR_COEFF: 0.1,
        NB_OBS_MAX: 5
    },
	SWITCH_MODE: {
		SCORE: 800,
		OFFSET_COEFF: 3
	},
	SCORE: {
		PER_FRAME: 0.1
	}
}

// FRAMES
var FRAMES = {
    PLAYER: {
        JUMP: new frame('JUMP', FILES.PLAYER, SPEED.ANIMATION.JUMP),
        RUN: new frame('RUN', FILES.PLAYER, SPEED.ANIMATION.RUN),
        init: function() {
            // RUN
            this.RUN.add_tile(0,0,19,38);
            this.RUN.add_hitbox(1,[[4,2,12,21],[5,21,7,18]]);
            this.RUN.add_tile(21,0,19,38);
            this.RUN.add_hitbox(2,[[4,2,12,21],[5,21,11,18]]);
            this.RUN.add_tile(42,0,19,38);
            this.RUN.add_hitbox(3,[[4,2,12,21],[5,21,7,18]]);
            this.RUN.add_tile(63,0,19,38);
            this.RUN.add_hitbox(4,[[4,2,12,21],[5,21,11,18]]);
            
            // JUMP
            this.JUMP.add_tile(84,0,20,38);
            this.JUMP.add_hitbox(1,[[2,0,13,21],[5,22,15,9]]);
            this.JUMP.add_tile(105,0,20,38);
            this.JUMP.add_hitbox(2,[[2,0,13,21],[4,22,12,14]]);
            this.JUMP.add_tile(128,0,20,38);
            this.JUMP.add_hitbox(3,[[2,0,11,21],[3,22,11,11]]);
        }
        
    },
    OBSTACLE: {
        CAMERA: new frame('CAMERA', FILES.OBSTACLE, SPEED.ANIMATION.OBSTACLE),
        SPEAKER: new frame('SPEAKER', FILES.OBSTACLE, SPEED.ANIMATION.OBSTACLE),
        init: function() {
            // CAMERA
            this.CAMERA.add_tile(0,0,22,30);
            this.CAMERA.add_hitbox(1,[[2,1,16,10]]);
            this.CAMERA.add_tile(23,0,22,30);
            this.CAMERA.add_hitbox(2,[[2,1,16,10]]);
            this.CAMERA.add_tile(46,0,22,30);
            this.CAMERA.add_hitbox(3,[[2,1,16,10]]);
            this.CAMERA.add_tile(69,0,22,30);
            this.CAMERA.add_hitbox(4,[[2,1,16,10]]);
            
            // SPEAKER
            this.SPEAKER.add_tile(0,31,22,32);
            this.SPEAKER.add_hitbox(1,[[11,5,11,27],[1,8,10,10]]);
            this.SPEAKER.add_tile(23,31,22,32);
            this.SPEAKER.add_hitbox(2,[[11,3,11,27],[1,8,10,10]]);
            this.SPEAKER.add_tile(46,31,22,32);
            this.SPEAKER.add_hitbox(3,[[11,5,11,27],[1,9,10,10]]);
            this.SPEAKER.add_tile(69,31,22,32);
            this.SPEAKER.add_hitbox(4,[[11,1,11,27],[1,8,10,10]]);
            
            this.list = [this.CAMERA, this.SPEAKER];
        }
    },
    BACKGROUND: {
        GROUND: {
            1: new frame('GROUND 1', FILES.GROUND, 0),
            2: new frame('GROUND 2', FILES.GROUND, 0),
            3: new frame('GROUND 3', FILES.GROUND, 0),
            4: new frame('GROUND 4', FILES.GROUND, 0),
            5: new frame('GROUND 5', FILES.GROUND, 0),
            6: new frame('GROUND 6', FILES.GROUND, 0),
            7: new frame('GROUND 7', FILES.GROUND, 0)
        },
        SKY: {
            1: new frame('CLOUD 1', FILES.SKY, 0),
            2: new frame('CLOUD 2', FILES.SKY, 0),
            3: new frame('CLOUD 3', FILES.SKY, 0)
        },
        init: function() {
            // GROUND
            this.GROUND[1].add_tile(0,0,196,14);
            this.GROUND[2].add_tile(197,0,201,14);
            this.GROUND[3].add_tile(399,0,237,14);
            this.GROUND[4].add_tile(637,0,113,14);
            this.GROUND[5].add_tile(708,0,81,14);
            this.GROUND[6].add_tile(760,0,156,14);
            this.GROUND[7].add_tile(1044,0,158,14);
            this.list_ground = [this.GROUND[1], this.GROUND[2], this.GROUND[3], this.GROUND[4], this.GROUND[5], this.GROUND[6], this.GROUND[7]];
            
            // SKY
            this.SKY[1].add_tile(0,0,46,39);
            this.SKY[2].add_tile(47,0,46,39);
            this.SKY[3].add_tile(94,0,46,39);
            this.list_sky = [this.SKY[1], this.SKY[2], this.SKY[3]];
        }
    },
    init: function() {
        this.PLAYER.init();
        this.OBSTACLE.init();
        this.BACKGROUND.init();
    }
};

function frame(name, file, speed, orientation) {
    
    // Parameters
    this.name = name;
    this.file = file;
    this.image = new Image();
    this.image.src = this.file;
    this.default_speed = speed;     // image/s
    this.speed = speed;             // image/s
    this.reference = {
        width: 0,
        height: 0
    };
	this.orientation = typeof orientation !== 'undefined' ? orientation: "forward"
    
    // Initiate animation
    this.nb_max_tiles = 0;
    this.tiles = [];
    
    // Hitbox
    this.hitbox_visible = false;
    this.hitbox_active = true;
    this.hitbox_color = "red";
    this.toggle_hitbox = function() {
        this.hitbox_visible = !this.hitbox_visible;
    };
    this.switch_hitbox = function() {
        this.hitbox_active = !this.hitbox_active;
    };
    
    // Methods
    this.add_tile = function(x, y, w, h, orientation) {
        this.nb_max_tiles++;
        var tile = {
            num: this.nb_max_tiles,
            box: [],
            x: x,
            y: y,
            width: w,
            height: h
        };
        this.tiles.push(tile);
        this.set_ref();
    };
    this.add_hitbox = function(num, box) {
        for (var i = 0 ; i < box.length ; i++) {
            var hitbox = {x:box[i][0],
                          y:box[i][1],
                          width:box[i][2],
                          height:box[i][3]};
            this.tiles[num-1].box.push(hitbox);
        }
    };
    this.set_ref = function() {
        for (var i = 0 ; i < this.tiles.length ; i++) {
            if (this.tiles[i].width > this.reference.width) {
                this.reference.width = this.tiles[i].width;
            }
            if (this.tiles[i].height > this.reference.height) {
                this.reference.height = this.tiles[i].height;
            }
        }
    };
    this.set_speed = function(rate) {
        this.speed = this.default_speed * rate;
    };
    this.draw = function(ctx, num_tile, x, y) {
		if (this.orientation == "backward") {
			ctx.save();
			ctx.scale(-1,1)
			ctx.drawImage(this.image,
                      this.tiles[num_tile-1].x,
                      this.tiles[num_tile-1].y,
                      this.tiles[num_tile-1].width,
                      this.tiles[num_tile-1].height,
                      - x,
                      y - this.reference.height,
                      - this.tiles[num_tile-1].width,
                      this.tiles[num_tile-1].height);
			ctx.restore();
		}
		else {
			ctx.save();
			ctx.drawImage(this.image,
                      this.tiles[num_tile-1].x,
                      this.tiles[num_tile-1].y,
                      this.tiles[num_tile-1].width,
                      this.tiles[num_tile-1].height,
                      x,
                      y - this.reference.height,
                      this.tiles[num_tile-1].width,
                      this.tiles[num_tile-1].height);
			ctx.restore();
		}
		
        if (this.hitbox_visible) {
            this.draw_hitbox(ctx, num_tile, x, y);
        }
    };
    this.draw_hitbox = function(ctx, num_tile, x, y) {
        for (var i = 0 ; i < this.tiles[num_tile-1].box.length ; i++) {
            var box = this.tiles[num_tile-1].box[i];
			if (this.orientation == "backward") {
				ctx.beginPath();
				ctx.save();
				ctx.strokeStyle = this.hitbox_color;
				ctx.rect(x + this.tiles[num_tile-1].width - box.x - box.width,
						 y - this.reference.height + box.y,
						 box.width,
						 box.height);
				ctx.stroke();
				ctx.restore();
				ctx.closePath();
			}
			else {
				ctx.beginPath();
				ctx.strokeStyle = this.hitbox_color;
				ctx.rect(x + box.x,
						 y - this.reference.height + box.y,
						 box.width,
						 box.height);
				ctx.stroke();
				ctx.closePath();
			} 
        }
    }
	this.switch_orientation = function() {
		if (this.orientation == 'forward') {this.orientation = "backward";}
		else {this.orientation = "forward";}
	}
}

function calque(ctx, frame, x, y) {
    
    // Parameters
    this.ctx = ctx;
    this.position = {
        x: x,
        y: y
    };
    this.nb_frame = 0;
    this.frame = frame;
    this.current_tile = getRandom(1,this.frame.nb_max_tiles);
    
    // Methods
    this.animate = function(fps) {
        var velocity = Math.trunc(fps / this.frame.speed);  // frame/image
        this.nb_frame++;
        if (this.nb_frame >= velocity) {
            this.nb_frame = 0;
            this.current_tile++;
            if (this.current_tile > frame.nb_max_tiles) {
                this.current_tile = 1;
            }
        }
        this.frame.draw(this.ctx, this.current_tile, this.position.x, this.position.y);
    }
    this.set_position = function(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
    this.translate = function(transX, transY) {
        this.position.x += transX;
        this.position.y += transY;
    }
    this.is_onscreen = function() {
		if (this.frame.orientation == "forward") {
			if (this.position.x + this.frame.reference.width < 0) {
				return false;
			} else {
				return true;
			}
		} else {
			if (this.position.x > WIDTH) {
				return false;
			} else {
				return true;
			}
		}
    }
}

function layer(ctx, frame_list, speed, is_continuous, likelihood, nb_blocked, func_offset_y) {
    // Parameters
    this.ctx = ctx;
    this.frame_list = frame_list;
    this.default_motion_speed = speed;
    this.motion_speed = speed;
    this.is_continuous = is_continuous;
    this.likelihood = likelihood;
    this.nb_blocked = nb_blocked;
    this.current_width = 0;
    this.offset = {
        x: 0,
        y: 0
    }
    this.calque_list = [];
    
    // Methods
    this.get_height = func_offset_y;
    this.add_calque = function(num, x) {
		if (this.default_motion_speed >= 0) {
			var next_calque = new calque(this.ctx, this.frame_list[num-1], WIDTH - x - this.frame_list[num-1].reference.width, this.get_height());
		} else {
			var next_calque = new calque(this.ctx, this.frame_list[num-1], x, this.get_height());
		}
        this.calque_list.push(next_calque);
    }
    this.add_random_calque = function(x) {
        var num = getRandom(1, this.frame_list.length);
        this.add_calque(num, x);
    }
    this.get_offset = function(fps) {
        var pixel_per_frame = this.motion_speed / fps;
        this.offset.x += pixel_per_frame;
        var transX = Math.trunc(this.offset.x);
        this.offset.x -= transX;
        return transX;
    }
    this.run = function(fps) {
        this.fill_screen();
        var transX = this.get_offset(fps);
        this.current_width -= Math.abs(transX);
        for (var i = 0 ; i < this.calque_list.length ; i++) {
            this.calque_list[i].translate(transX, 0);
            if (!this.calque_list[i].is_onscreen()) {
                this.calque_list.splice(i,1);
                i--;
            }
            else {
                this.calque_list[i].animate(fps, 1);
            }
        }
    }
    this.fill_screen = function() {
        while (this.current_width < WIDTH) {
            if (this.is_continuous) {
                this.add_random_calque(this.current_width);
                this.current_width += this.calque_list[this.calque_list.length-1].frame.reference.width;
            } else {
                if (Math.random() > 1 - this.likelihood) {
                    this.add_random_calque(this.current_width);
                    this.current_width += this.calque_list[this.calque_list.length-1].frame.reference.width;
                } else {
                    this.current_width += nb_blocked;
                }
            }
        }
    }
    this.init = function() {
        this.fill_screen();
        for (var i = 0 ; i < this.calque_list.length; i++) {
            var e = this.calque_list[i];
            e.frame.draw(this.ctx, 1, e.position.x, e.position.y)
        }
    }
    this.set_speed = function(rate) {
        this.motion_speed = this.default_motion_speed * rate;
    }
}
