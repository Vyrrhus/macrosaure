var OBSTACLES = {
    VELOCITY: SETTINGS.SPEED.MOTION.OBS + SETTINGS.SPEED.MOTION.GROUND,
    init: function(ctx) {
        // Context
        this.CONTEXT = ctx;
        
        // Frames & Calques
        this.NB_OBS = FRAMES.OBSTACLE.list.length;
		this.NB_FLYING_OBS = FRAMES.OBSTACLE.list_flying.length;
        this.CALQUE = [];
        
        // Initialize other useful settings
		this.RUNNING_SIDE = "forward";
		this.NB_OBS_MAX = SETTINGS.PARAMETERS.OBS.NB_OBS_MAX;
        this.NB_CURRENT_OBS = 0;
        this.set_gap();
        this.CURRENT_GAP = 0;
        this.CURRENT_BLOCKED = 0;
        this.OFFSET = {
            x: 0,
            y: 0
        };
    },
    set_gap: function() {
        this.GAP_MIN = - this.VELOCITY * SETTINGS.PARAMETERS.OBS.GAP_COEFF * SETTINGS.PARAMETERS.JUMP.TIME;
        this.WIDTH_MAX = - this.VELOCITY * SETTINGS.PARAMETERS.OBS.WIDTH_COEFF * SETTINGS.PARAMETERS.JUMP.TIME;
    },
    
    run: function(fps) {
        this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
		if (this.RUNNING_SIDE == "backward") {
			this.VELOCITY *= -1;
		}
        var pixel_per_frame = this.VELOCITY / fps;
        var transX = Math.trunc(this.OFFSET.x + pixel_per_frame);
        this.OFFSET.x += pixel_per_frame - transX;
        this.CURRENT_BLOCKED -= Math.abs(transX);
        this.CURRENT_GAP += Math.abs(transX);
        if (this.CURRENT_GAP >= this.GAP_MIN && this.CURRENT_BLOCKED <= 0) {
            this.add_obstacle();
        }
        for (var i = 0 ; i < this.NB_CURRENT_OBS ; i++) {
            this.CALQUE[i].translate(transX, 0);
            if (!this.CALQUE[i].is_onscreen()) {
                console.log(`    - OBS "${this.CALQUE[i].frame.name}"`);
                this.CALQUE.splice(i, 1);
                this.NB_CURRENT_OBS--;
                i--;
            } else {
                this.CALQUE[i].animate(fps);
            }
        }
    },
    add_obstacle: function() {
        var p = Math.random();
        if (p > 1 - SETTINGS.PARAMETERS.OBS.GENERATOR_COEFF || this.NB_CURRENT_OBS == 0) {
            this.CURRENT_GAP = 0;
			
			if (Math.random() > 1 - SETTINGS.PARAMETERS.OBS.FLYING.LIKELIHOOD && SCORE.SCORE > SETTINGS.PARAMETERS.OBS.FLYING.SCORE_MIN) {
				var num = getRandom(1, this.NB_FLYING_OBS);
				if (this.RUNNING_SIDE == "forward") {
					var obstacle = new calque(this.CONTEXT, FRAMES.OBSTACLE.list_flying[num-1], WIDTH, SETTINGS.OFFSET.HEIGHT.get_drone(), {motion: function() {this.position.angle++;}});
					obstacle.frame.orientation = 'forward';
				} else {
					var obstacle = new calque(this.CONTEXT, FRAMES.OBSTACLE.list_flying[num-1], 0, SETTINGS.OFFSET.HEIGHT.get_drone(), {motion: function() {this.position.angle++;}});
					obstacle.frame.orientation = 'backward';
				}
				this.CURRENT_GAP -= obstacle.frame.reference.width;
				this.CALQUE.push(obstacle);
				this.NB_CURRENT_OBS++;
				console.log(`+ OBS "${obstacle.frame.name}"`);
			} else {
				var nb_obstacle = getRandom(1, this.NB_OBS_MAX);
				var obstacle_width = 0;
				for (var i = 1 ; i <= nb_obstacle ; i++) {
                	var num = getRandom(1, this.NB_OBS);
					if (this.RUNNING_SIDE == "forward") {
						var obstacle = new calque(this.CONTEXT, FRAMES.OBSTACLE.list[num-1], WIDTH + obstacle_width, SETTINGS.OFFSET.HEIGHT.get_people());
						obstacle.frame.orientation = 'forward';
					} else {
						var obstacle = new calque(this.CONTEXT, FRAMES.OBSTACLE.list[num-1], 0 - obstacle_width, SETTINGS.OFFSET.HEIGHT.get_people());
						obstacle.frame.orientation = 'backward';
					}
					obstacle_width += obstacle.frame.reference.width;
					if (obstacle_width >= this.WIDTH_MAX) {
						return;
                	}
                	this.CURRENT_GAP -= obstacle.frame.reference.width;
                	this.CALQUE.push(obstacle);
                	this.NB_CURRENT_OBS++;
                	console.log(`+ OBS "${obstacle.frame.name}"`);
				}
			}
        } else {
            this.CURRENT_BLOCKED = SETTINGS.PARAMETERS.OBS.PX_TO_BLOCK;
        }
    },
    set_difficulty: function() {
        this.VELOCITY = SETTINGS.SPEED.MOTION.GROUND * SCORE.get_rate() + SETTINGS.SPEED.MOTION.OBS;
        this.set_gap();
        var rate_animation = 1 + 2.2*Math.tanh(SCORE.SCORE/1500);
        for (var i = 0 ; i < this.NB_OBS ; i++) {
            FRAMES.OBSTACLE.list[i].set_speed(SCORE.get_rate());
        }
    },
    
    switch_hitbox: function() {
        for (var i = 0 ; i < this.NB_OBS ; i++) {
            FRAMES.OBSTACLE.list[i].switch_hitbox();
        }
		for (var i = 0 ; i < this.NB_FLYING_OBS ; i++) {
			FRAMES.OBSTACLE.list_flying[i].switch_hitbox();
		}
    },
    toggle_hitbox: function() {
        for (var i = 0 ; i < this.NB_OBS ; i++) {
            FRAMES.OBSTACLE.list[i].toggle_hitbox();
        }
		for (var i = 0 ; i < this.NB_FLYING_OBS ; i++) {
			FRAMES.OBSTACLE.list_flying[i].toggle_hitbox();
		}
    },
    
    // WIP
    reset: function() {
        this.init(this.CONTEXT);
    },
	
	switch_side: function() {
		this.OFFSET.x = 0;
		if (this.RUNNING_SIDE == 'forward') {
			this.RUNNING_SIDE = 'backward';
		}
		else {
			this.RUNNING_SIDE = 'forward';
		}
	},
	
	get_hitbox: function() {
		var box_list = [];
		for (var i = 0 ; i < this.NB_CURRENT_OBS ; i++) {
			box_list.push(this.CALQUE[i].get_hitbox());
		}
		return box_list;
	}
};