var PLAYER = {
    OFFSET: {
        x: POSITION.player_offset_x,
        y: POSITION.get_people()
    },
    JUMP:  {
        STATUS: true,
        JUMP_TIME: SETTINGS.PLAYER.JUMP_TIME,
        MAX_HEIGHT: SETTINGS.PLAYER.JUMP_HEIGHT,  
    },
    RUN: {
        STATUS: false,
    },
    init: function(ctx) {
        // Context
        this.CONTEXT = ctx;
        
        // Frames & Calques
        this.JUMP.FRAME = FRAMES.PLAYER.JUMP;
        this.JUMP.CALQUE = new calque(this.CONTEXT, this.JUMP.FRAME, this.OFFSET.x, this.OFFSET.y);
        
        this.RUN.FRAME = FRAMES.PLAYER.RUN;
        this.RUN.CALQUE = new calque(this.CONTEXT, this.RUN.FRAME, this.OFFSET.x, this.OFFSET.y);
        
        // Jump settings
        this.HEIGHT = 0;
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
        this.RUN.CALQUE.animate(fps, 1);
    },
    jump_animate: function(fps) {
        var height = 0;
        this.JUMP.TIME += 1 / fps; // x secondes par frame
        this.HEIGHT = Math.trunc(1/2 * this.JUMP.ACCELERATION * Math.pow(this.JUMP.TIME, 2) + this.JUMP.VELOCITY * this.JUMP.TIME);
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
    },
    
    set_speed: function() {
        var rate = 1 + 2.2*Math.tanh(SCORE.SCORE/1500);
        this.RUN.FRAME.set_speed(rate);
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
    }
};

