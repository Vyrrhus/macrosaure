var PLAYER = {
    JUMP:  {
        STATUS: false
    },
    RUN: {
        STATUS: true,
    },
    init: function(ctx) {
        // Context
        this.CONTEXT = ctx;
		this.RUNNING_SIDE = "forward";
		
		// PLAYER OFFSET
		this.OFFSET = {
			x: SETTINGS.OFFSET.X.PLAYER,
			y: SETTINGS.OFFSET.HEIGHT.get_people()
		};
		
        // Frames & Calques
        this.JUMP.FRAME = FRAMES.PLAYER.JUMP;
        this.JUMP.CALQUE = new calque(this.CONTEXT, this.JUMP.FRAME, this.OFFSET.x, this.OFFSET.y);
        
        this.RUN.FRAME = FRAMES.PLAYER.RUN;
        this.RUN.CALQUE = new calque(this.CONTEXT, this.RUN.FRAME, this.OFFSET.x, this.OFFSET.y);
        
        // Jump settings
        this.HEIGHT = 0;
		this.JUMP.JUMP_TIME = SETTINGS.PARAMETERS.JUMP.TIME;
		this.JUMP.MAX_HEIGHT = SETTINGS.PARAMETERS.JUMP.HEIGHT;
        this.JUMP.ACCELERATION = - 8 * this.JUMP.MAX_HEIGHT / Math.pow(this.JUMP.JUMP_TIME, 2);
        this.JUMP.VELOCITY = 4 * this.JUMP.MAX_HEIGHT / this.JUMP.JUMP_TIME;
        this.JUMP.TIME = 0;
    },
    
    run: function(fps) {
        this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
        if (this.JUMP.STATUS) {
            this.jump_animate(fps);
        } else if (this.RUN.STATUS) {
            this.run_animate(fps);
        }
    },
    run_animate: function(fps) {
		TEXT.reset_text();
		this.RUN.CALQUE.set_position(this.OFFSET.x, this.OFFSET.y - this.HEIGHT)
        this.RUN.CALQUE.animate(fps);
    },
    jump_animate: function(fps) {
        var height = 0;
        this.JUMP.TIME += 1 / fps; // x secondes par frame
        this.HEIGHT = Math.trunc(1/2 * this.JUMP.ACCELERATION * Math.pow(this.JUMP.TIME, 2) + this.JUMP.VELOCITY * this.JUMP.TIME);
		TEXT.set_text("Qu'ils viennent me chercher !", 80, 80, 16);
        if (this.HEIGHT < 0) {
            this.HEIGHT = 0;
            this.JUMP.TIME = 0;
            this.switch_status();
            this.run_animate(fps);
            return;
        }
        this.JUMP.CALQUE.set_position(this.OFFSET.x, this.OFFSET.y - this.HEIGHT);
        this.JUMP.CALQUE.animate(fps, 1);
    },
    switch_status: function() {
        this.JUMP.STATUS = !this.JUMP.STATUS;
        this.RUN.STATUS = !this.RUN.STATUS;
		if (this.JUMP.STATUS) {
		}
    },
    
    set_difficulty: function() {
        this.RUN.FRAME.set_speed(SCORE.get_rate());
    },
    
    switch_hitbox: function() {
        this.JUMP.FRAME.switch_hitbox();
        this.RUN.FRAME.switch_hitbox();
    },
    toggle_hitbox: function() {
        this.JUMP.FRAME.toggle_hitbox();
        this.RUN.FRAME.toggle_hitbox();
    },
    
    // WIP
    reset: function() {
        if (this.JUMP.STATUS) {
            this.switch_status();
        }
        this.init(this.CONTEXT);
    },
	
	switch_side: function(x) {
		this.JUMP.FRAME.switch_orientation();
		this.RUN.FRAME.switch_orientation();
		if (this.RUNNING_SIDE == 'forward') {
			this.RUNNING_SIDE = 'backward';
			this.OFFSET.x = x;
		}
		else {
			this.RUNNING_SIDE = 'forward';
			this.OFFSET.x = x;
		}
	},
	
	get_hitbox: function() {
		if (this.JUMP.STATUS) {
			return this.JUMP.CALQUE.get_hitbox();
		} else {
			return this.RUN.CALQUE.get_hitbox();
		}
	}
};

