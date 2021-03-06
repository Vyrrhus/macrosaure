// CANVAS
var CANVAS = {
    BACKGROUND: document.getElementById('background'),
    OBSTACLE:   document.getElementById('obstacle'),
    MACRON:     document.getElementById('macron'),
    TEXT:       document.getElementById('text')
};

// CANVAS SIZE
var WIDTH_TO_HEIGHT_RATIO = 3;
var MAX_WIDTH = 800-800%3;
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
var IMAGE = {
	FILES: {
		
	},
	STATE: {
		
	},
	PATH: {
		SCORE: 'assets/score.png',
		PLAYER: 'assets/macron.png',
		OBSTACLE: 'assets/obs.png',
		GROUND: 'assets/ground.png',
		SKY: 'assets/sky.png',
		GAME_OVER: 'assets/over.png',
		TEXT: 'assets/bubble.png'
	},
	init: function() {
		var self = this;
		for (var element in this.PATH) {
			// Img status (true if loaded, else false)
			this.STATE[element] = false;
			
			// Img element
			this.FILES[element] = new Image();
			this.FILES[element].src = this.PATH[element];
			this.FILES[element].name = element;
			this.FILES[element].onload = function() {
				self.STATE[this.name] = true;
			}
		}
	},
	process: function() {
		var fail = false;
		for (var element in this.STATE) {
			if (this.STATE[element] !== true) {
				fail = true;
				break;
			}
		}
		if (!fail) {
			BACKGROUND.run(GAME.START_FPS);
			PLAYER.RUN.FRAME.before_draw(CONTEXT.MACRON, 1, SETTINGS.OFFSET.X.PLAYER, SETTINGS.OFFSET.HEIGHT.get_ground());
			return
		}
		window.setTimeout(this.process, 50);
	},
};

// AUDIO FILES
var AUDIO = {
	FILES: {
	},
	PATH: {
		JUMP: 'sound/jump.ogg',
		HIT: 'sound/hit.ogg'
	},
	init: function() {
		for (var element in this.PATH) {
			this.FILES[element] = new Audio(this.PATH[element]);
		}
	}
}

// SETTINGS
var SETTINGS = {
	SPEED: {
		ANIMATION: {
			RUN: 4,		// img/s
			JUMP: 8,	// img/s
			OBS: 4,		// img/s
			DRONE: 24	// img/s
		},
		MOTION: {
			GROUND: -150,	// PX/s
			SKY: -5,		// PX/s
			OBS: -20		// PX/s
		}
	},
	OFFSET: {
		HEIGHT: {
			get_ground: function() {return 0.8 * HEIGHT;},
			get_sky: function() {return getRandom(0.2*HEIGHT, 0.4*HEIGHT);},
			get_people: function() {return this.get_ground() - 0.02 * HEIGHT;},
			get_drone: function() {
				if (Math.random() > 1 -SETTINGS.PARAMETERS.OBS.FLYING.ON_GROUND_LIKELIHOOD) {
					return this.get_people();
				} else {
					return this.get_people() - 60;
				}
			}
		},
		X: {
			PLAYER: 0.1 * WIDTH
		}
	},
	PARAMETERS: {
		JUMP: {
			init: function() {
				this.HEIGHT = 50;
				this.TIME = 0.6;
			}
		},
		OBS: {
			init: function() {
				this.PX_TO_BLOCK = 15;
				this.GAP_COEFF = 0.9;
				this.WIDTH_COEFF = 0.4;
				this.GENERATOR_COEFF = 0.05;
				this.NB_OBS_MAX = 5;
				this.FLYING = {
					LIKELIHOOD: 0.2,
					SCORE_MIN: 500,
					ON_GROUND_LIKELIHOOD: 0.4
				};
			}
		},
		SCORE: {
			init: function() {
				this.MIN_PER_FRAME = 0.1281;
				this.MAX_PER_FRAME = 0.325;
				this.ACC = 0.00005;
				this.SCORE_BEFORE_TRANSLATION = 1000;
			}
		},
		init: function() {
			this.JUMP.init();
			this.OBS.init();
			this.SCORE.init();
		}
	},
	TEXT: {
		likelihood: 0.1,
		content: ["C'est pas passe loin !",
				  "Qu'ils viennent me chercher !",
				  "On peut ralentir ?",
				  "On peut discuter, non ?",
				  "Ahah, trop facile !",
				  "You are fake news !"]
	},
	init: function() {
		this.PARAMETERS.init();
	}
};

// FRAMES
var FRAMES = {
    PLAYER: {
        init: function() {
            // RUN
			this.RUN = new frame('RUN', IMAGE.FILES.PLAYER, SETTINGS.SPEED.ANIMATION.RUN);
            this.RUN.add_tile(0,0,19,38);
            this.RUN.add_hitbox(1,[[4,2,12,21],[5,21,7,18]]);
            this.RUN.add_tile(21,0,19,38);
            this.RUN.add_hitbox(2,[[4,2,12,21],[5,21,11,18]]);
            this.RUN.add_tile(42,0,19,38);
            this.RUN.add_hitbox(3,[[4,2,12,21],[5,21,7,18]]);
            this.RUN.add_tile(63,0,19,38);
            this.RUN.add_hitbox(4,[[4,2,12,21],[5,21,11,18]]);
            
            // JUMP
			this.JUMP = new frame('JUMP', IMAGE.FILES.PLAYER, SETTINGS.SPEED.ANIMATION.JUMP);
            this.JUMP.add_tile(84,0,20,38);
            this.JUMP.add_hitbox(1,[[2,0,13,21],[5,22,10,6]]);
            this.JUMP.add_tile(105,0,20,38);
            this.JUMP.add_hitbox(2,[[2,0,13,21],[4,22,10,12]]);
            this.JUMP.add_tile(128,0,20,38);
            this.JUMP.add_hitbox(3,[[2,0,11,21],[3,22,11,8]]);
        }
    },
    OBSTACLE: {
        init: function() {
            // CAMERA
			this.CAMERA = new frame('CAMERA', IMAGE.FILES.OBSTACLE, SETTINGS.SPEED.ANIMATION.OBS);
            this.CAMERA.add_tile(0,0,22,30);
            this.CAMERA.add_hitbox(1,[[2,1,16,10]]);
            this.CAMERA.add_tile(23,0,22,30);
            this.CAMERA.add_hitbox(2,[[2,1,16,10]]);
            this.CAMERA.add_tile(46,0,22,30);
            this.CAMERA.add_hitbox(3,[[2,1,16,10]]);
            this.CAMERA.add_tile(69,0,22,30);
            this.CAMERA.add_hitbox(4,[[2,1,16,10]]);
            
            // SPEAKER
			this.SPEAKER = new frame('SPEAKER', IMAGE.FILES.OBSTACLE, SETTINGS.SPEED.ANIMATION.OBS);
            this.SPEAKER.add_tile(0,31,22,32);
            this.SPEAKER.add_hitbox(1,[[11,5,11,27],[1,8,10,10]]);
            this.SPEAKER.add_tile(23,31,22,32);
            this.SPEAKER.add_hitbox(2,[[11,3,11,27],[1,8,10,10]]);
            this.SPEAKER.add_tile(46,31,22,32);
            this.SPEAKER.add_hitbox(3,[[11,5,11,27],[1,9,10,10]]);
            this.SPEAKER.add_tile(69,31,22,32);
            this.SPEAKER.add_hitbox(4,[[11,1,11,27],[1,8,10,10]]);
			
			// DRONE
			this.DRONE = new frame('DRONE', IMAGE.FILES.OBSTACLE, SETTINGS.SPEED.ANIMATION.DRONE);
			this.DRONE.add_tile(0,64,32,16);
			this.DRONE.add_hitbox(1,[[8,4,18,5]]);
			this.DRONE.add_tile(33,64,32,16);
			this.DRONE.add_hitbox(2,[[8,4,18,5]]);
			this.DRONE.add_tile(66,64,32,16);
			this.DRONE.add_hitbox(3,[[8,4,18,5]]);
			this.DRONE.add_tile(99,64,32,16);
			this.DRONE.add_hitbox(4,[[8,4,18,5]]);
            
            this.list = [this.CAMERA, this.SPEAKER];
			this.list_flying = [this.DRONE];
        }
    },
    BACKGROUND: {
        GROUND: {
        },
        SKY: {
        },
        init: function() {
            // GROUND
			this.GROUND[1] = new frame('GROUND 1', IMAGE.FILES.GROUND, 0);
            this.GROUND[1].add_tile(0,0,196,14);
			this.GROUND[2] = new frame('GROUND 2', IMAGE.FILES.GROUND, 0);
            this.GROUND[2].add_tile(197,0,201,14);
			this.GROUND[3] = new frame('GROUND 3', IMAGE.FILES.GROUND, 0);
            this.GROUND[3].add_tile(399,0,237,14);
			this.GROUND[4] = new frame('GROUND 4', IMAGE.FILES.GROUND, 0);
            this.GROUND[4].add_tile(637,0,113,14);
			this.GROUND[5] = new frame('GROUND 5', IMAGE.FILES.GROUND, 0);
            this.GROUND[5].add_tile(708,0,81,14);
			this.GROUND[6] = new frame('GROUND 6', IMAGE.FILES.GROUND, 0);
            this.GROUND[6].add_tile(760,0,156,14);
			this.GROUND[7] = new frame('GROUND 7', IMAGE.FILES.GROUND, 0);
            this.GROUND[7].add_tile(1044,0,158,14);
			
            this.list_ground = [this.GROUND[1], this.GROUND[2], this.GROUND[3], this.GROUND[4], this.GROUND[5], this.GROUND[6], this.GROUND[7]];
            
            // SKY
			this.SKY[1] = new frame('CLOUD 1', IMAGE.FILES.SKY, 0);
            this.SKY[1].add_tile(0,0,46,39);
			this.SKY[2] = new frame('CLOUD 2', IMAGE.FILES.SKY, 0);
            this.SKY[2].add_tile(47,0,46,39);
			this.SKY[3] = new frame('CLOUD 3', IMAGE.FILES.SKY, 0);
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


// CLASS
function frame(name, image, speed, options) {
    
	// Self
	var self = this;
	
    // Parameters
    this.name = name;
    this.image = image;
    this.default_speed = speed;     // image/s
    this.speed = speed;             // image/s
    this.reference = {
        width: 0,
        height: 0
    };
	
	// Options
	if (options === undefined) {
		options = {};
	}
	if (options.orientation === undefined) {
		options.orientation = "forward";
	}
	this.orientation = options.orientation;
//	this.orientation = typeof orientation !== 'undefined' ? orientation: "forward"
    
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
    this.add_tile = function(x, y, w, h, options) {
		if (options === undefined) {
			options = {};
		}
		if (options.type === undefined) {
			options.type = "loop";
		}
        this.nb_max_tiles++;
        var tile = {
            num: this.nb_max_tiles,
            box: [],
            x: x,
            y: y,
            width: w,
            height: h,
			type: options.type
        };
		
        this.tiles.push(tile);
        this.set_ref();
    };
    this.add_hitbox = function(num, box) {
        for (var i = 0 ; i < box.length ; i++) {
            var hitbox = {x:box[i][0],
						  y:box[i][1],
						  width:box[i][2],
						  height:box[i][3],
						  rotation: 0};
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
	this.before_draw = function(ctx, num_tile, x, y, angle) {
		if (angle) {
			for (var element in this.tiles[num_tile - 1].box) {
				this.tiles[num_tile - 1].box[element].rotation = angle;
			}
		}
		ctx.save();
		if (this.orientation == "backward") {
			ctx.scale(-1,1);
			this.draw(ctx, num_tile, -x, y, angle, false);
		} else {
			this.draw(ctx, num_tile, x, y, angle, true);
		}
		ctx.restore();
	};
	this.draw = function(ctx, num_tile, x, y, angle, is_forward) {
		var radians = angle * Math.PI / 180;
		var tile = this.tiles[num_tile - 1];
		ctx.rotate(radians);
		if (is_forward) {
			var coeff = 1;
		} else {
			var coeff = -1;
		}
		var X = x + coeff * tile.width / 2;
		var Y = y - this.reference.height + tile.height / 2;
		ctx.translate(X * Math.cos(radians) + Y * Math.sin(radians) - X,
					  Y * Math.cos(radians) - X * Math.sin(radians) - Y);
		ctx.drawImage(this.image,
					  tile.x,
					  tile.y,
					  tile.width,
					  tile.height,
					  x,
					  y - this.reference.height,
					  coeff * tile.width,
					  tile.height);
		
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
			} else {
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
    };
	this.get_hitbox = function(num_tile, x, y) {
		var list_box = [];
		for (var i = 0 ; i < this.tiles[num_tile-1].box.length ; i++) {
			var box = this.tiles[num_tile-1].box[i];
			if (this.orientation == "backward") {
				var hitbox = {
					x: x + this.tiles[num_tile-1].width - box.x - box.width,
					y: box.y + y - this.reference.height,
					width: box.width,
					height: box.height
				};
			} else {
				var hitbox = {
					x: x + box.x,
					y: y + box.y - this.reference.height,
					width: box.width,
					height: box.height
				};
			}
			list_box.push(hitbox);
		}
		return list_box
	}
	this.switch_orientation = function() {
		if (this.orientation == 'forward') {this.orientation = "backward";}
		else {this.orientation = "forward";}
	}
}

function calque(ctx, frame, x, y, options) {
    // Parameters
    this.ctx = ctx;
    this.position = {
        x: x,
        y: y,
		angle: 0,
		time: 0
    };
    this.nb_frame = 0;
    this.frame = frame;
	if (this.frame.tiles[0].type != "loop") {
		this.current_tile = 1;
	} else {
		this.current_tile = getRandom(1,this.frame.nb_max_tiles);
	}
	if (options === undefined) {
		options = {};
	}
	
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
		if (this.motion) {
			this.motion();
		}
        this.frame.before_draw(this.ctx, this.current_tile, this.position.x, this.position.y, this.position.angle);
		if (this.frame.tiles[this.current_tile-1].type != "loop") {
			this.frame.nb_max_tiles--;
			this.frame.first_tile++;
		}
    };
    this.set_position = function(x, y) {
        this.position.x = x;
        this.position.y = y;
    }
    this.translate = function(transX, transY) {
        this.position.x += transX;
        this.position.y += transY;
    };
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
    };
	this.get_hitbox = function() {
		return this.frame.get_hitbox(this.current_tile, this.position.x, this.position.y);
	};
	this.motion = options.motion;
	
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
            e.frame.before_draw(this.ctx, 1, e.position.x, e.position.y)
        }
    }
    this.set_speed = function(rate) {
        this.motion_speed = this.default_motion_speed * rate;
    }
}