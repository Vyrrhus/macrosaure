var BACKGROUND = {
    
    init: function(ctx) {
        // Context
        this.CONTEXT = ctx;
        
        // Layers
        this.LAYERS = [];
		var SKY = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_sky, 0, true, 1, 0, POSITION.get_level_foreground);
		var MOUTAIN = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_moutain, SPEED.MOTION.MOUTAIN, true, 1, 0, POSITION.get_level_moutain);
		var CLOUDS = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_cloud, SPEED.MOTION.CLOUDS, false, 0.25, 75, POSITION.get_clouds);
		var FOREGROUND = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_foreground, SPEED.MOTION.FOREGROUND, true, 1, 0, POSITION.get_level_foreground);
		var BUILDING = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_building, SPEED.MOTION.BUILDING, false, 0.2, 50, POSITION.get_level_foreground);
		var SIDEWALK = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_sidewalk, SPEED.MOTION.BUILDING, true, 1, 0, POSITION.get_level_sidewalk);
		var PAVEMENT = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_pavement, SPEED.MOTION.BUILDING, true, 1, 0, POSITION.get_level_pavement);
		var SEWER = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_sewer, SPEED.MOTION.BUILDING, false, 0.05, 128, POSITION.get_level_pavement);
		var ROAD = new layer(this.CONTEXT, FRAMES.BACKGROUND.list_road, SPEED.MOTION.BUILDING, true, 1, 0, POSITION.get_level_road);
		
		// Pushing
        this.LAYERS.push(SKY, MOUTAIN, CLOUDS, FOREGROUND, BUILDING, SIDEWALK, PAVEMENT, SEWER, ROAD);
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
			this.LAYERS[i].set_speed(SCORE.get_rate());
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