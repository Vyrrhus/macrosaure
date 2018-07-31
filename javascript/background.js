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
    
    set_speed: function() {
        var rate = 1 + 4 * Math.tanh(SCORE.SCORE/3000);
        for (var i = 0 ; i < this.LAYERS.length ; i++) {
            this.LAYERS[i].set_speed(rate);
        }
    },
    
    
    // WIP
    reset: function() {
        this.init(this.CONTEXT);
    }
};