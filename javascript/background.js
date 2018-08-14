var BACKGROUND = {
    
    init: function(ctx) {
        // Context
        this.CONTEXT = ctx;
        
        // Layers
        this.LAYERS = [];
        var GROUND = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_ground, SPEED.MOTION.GROUND, true, 1, 0, POSITION.get_ground);
        var SKY = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_sky, SPEED.MOTION.SKY, false, 0.1, 100, POSITION.get_sky);
        this.LAYERS.push(GROUND, SKY);
    },
    
    
    run: function(fps) {
        this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
        for (var i = 0 ; i < this.LAYERS.length ; i++) {
            this.LAYERS[i].init();
            this.LAYERS[i].run(fps);
        }
    },
    
    set_difficulty: function() {
        for (var i = 0 ; i < this.LAYERS.length ; i++) {
			this.LAYERS[i].set_speed(SPEED.MOTION.FUNC.ALL());
        }
    },
    
    
    // WIP
    reset: function() {
        this.init(this.CONTEXT);
    },
	
	switch_side: function() {
		this.LAYERS[0].default_motion_speed *= -1;
		this.LAYERS[0].current_width = WIDTH;
	},
	stop: function() {
		this.LAYERS[0].set_speed(0);
	}
	
};