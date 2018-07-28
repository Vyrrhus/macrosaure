var PLAYER = {
    OFFSET: SETTINGS.PLAYER.OFFSET,
    JUMP:  {
        STATUS: true,
        JUMP_TIME: SETTINGS.PLAYER.ANIMATION.JUMP_TIME,
        MAX_HEIGHT: SETTINGS.PLAYER.ANIMATION.JUMP_HEIGHT,  
        ANIMATION_VELOCITY: SETTINGS.PLAYER.ANIMATION.JUMP_IPS,
        FRAMES: FRAMES.PLAYER.JUMP,
    },
    RUN: {
        STATUS: false,
        ANIMATION_VELOCITY: SETTINGS.PLAYER.ANIMATION.RUN_IPS,
        FRAMES: FRAMES.PLAYER.RUN,
    },
    HITBOX: {x:5, y:0, w:13, h:31},
    HITBOX_STATUS: false,
    init: function(ctx) {
        // Context
        this.CONTEXT = ctx;
        
        // Frames
        this.JUMP.NB_FRAMES = this.JUMP.FRAMES.length;
        this.RUN.NB_FRAMES = this.RUN.FRAMES.length;
        
        // Jump settings
        this.JUMP.ACCELERATION = - 8 * this.JUMP.MAX_HEIGHT / Math.pow(this.JUMP.JUMP_TIME, 2);
        this.JUMP.VELOCITY = 4 * this.JUMP.MAX_HEIGHT / this.JUMP.JUMP_TIME;
        this.JUMP.TIME = 0;
        
        // Initialize other useful settings
        this.HEIGHT = 0;
        this.JUMP.NUM = 0;
        this.RUN.NUM = 0;
        this.JUMP.ANIMATION_TIME = 0;
        this.RUN.ANIMATION_TIME = 0;
        
        // Image
        img = new Image();
        img.src = FILES.PLAYER;
        this.IMG = img;
        this.IMG.onload = function() {
            PLAYER.draw(PLAYER.RUN.FRAMES[0]);
        }
    },
    draw: function(frame) {
        this.CONTEXT.drawImage(this.IMG,
                               frame.x,
                               frame.y,
                               frame.w,
                               frame.h,
                               this.OFFSET.x,
                               this.OFFSET.y - this.HEIGHT,
                               frame.sw,
                               frame.sh);
        if (this.HITBOX_STATUS) {
            this.draw_hitbox();
        }
    },
    draw_hitbox: function() {
        this.CONTEXT.beginPath();
        this.CONTEXT.strokeStyle="red";
        this.CONTEXT.rect(this.OFFSET.x + this.HITBOX.x,
                          this.OFFSET.y - this.HEIGHT + this.HITBOX.y,
                          this.HITBOX.w,
                          this.HITBOX.h);
        this.CONTEXT.stroke();
    },
    switch_status: function() {
        this.JUMP.STATUS = !this.JUMP.STATUS;
        this.RUN.STATUS = !this.RUN.STATUS;
    },
    jump_animate: function(fps) {
        var height = 0;
        this.JUMP.TIME += 1 / fps; // x secondes par frame
        this.JUMP.ANIMATION_TIME += 1 / fps;
        this.HEIGHT = Math.trunc(1/2 * this.JUMP.ACCELERATION * Math.pow(this.JUMP.TIME, 2) + this.JUMP.VELOCITY * this.JUMP.TIME);
        if (this.HEIGHT < 0) {
            this.HEIGHT = 0;
            this.JUMP.TIME = 0;
            this.switch_status();
            this.run_animate(fps);
            return;
        }
        if (this.JUMP.ANIMATION_TIME >= 1 / this.JUMP.ANIMATION_VELOCITY) {
            this.JUMP.ANIMATION_TIME = 0;
            this.JUMP.NUM++;
            if (this.JUMP.NUM >= this.JUMP.NB_FRAMES) {
                this.JUMP.NUM = 0;
            }
        }
        this.draw(this.JUMP.FRAMES[this.JUMP.NUM]);   
    },
    run_animate: function(fps) {
        this.RUN.ANIMATION_TIME += 1 / fps;
        
        if (this.RUN.ANIMATION_TIME >= 1 / this.RUN.ANIMATION_VELOCITY) {
            this.RUN.ANIMATION_TIME = 0;
            this.RUN.NUM++;
            if (this.RUN.NUM >= this.RUN.NB_FRAMES) {
                this.RUN.NUM = 0;
            }
        }
        this.draw(this.RUN.FRAMES[this.RUN.NUM]);
    },
    get_hitbox: function() {
        var hitbox = {
            x: this.OFFSET.x + this.HITBOX.x,
            y: this.OFFSET.y -this.HEIGHT + this.HITBOX.y,
            w: this.HITBOX.w,
            h: this.HITBOX.h
        };
        return hitbox;
    },
    run: function(fps) {
        this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
        if (this.JUMP.STATUS) {
            this.jump_animate(fps);
        } else if (this.RUN.STATUS) {
            this.run_animate(fps);
        }
    },
    reset: function() {
        if (this.JUMP.STATUS) {
            this.switch_status();
        }
        this.init(this.CONTEXT);
    },
    set_velocity: function() {
        var rate = 1+4*Math.tanh(SCORE.SCORE/1200);
//        this.JUMP.ANIMATION_VELOCITY = SETTINGS.PLAYER.ANIMATION.JUMP_IPS * rate;
        rate = 1 + 2.2*Math.tanh(SCORE.SCORE/1500);
        this.RUN.ANIMATION_VELOCITY = SETTINGS.PLAYER.ANIMATION.RUN_IPS * rate;
    },
    toggle_hitbox: function() {
        this.HITBOX_STATUS = !this.HITBOX_STATUS;
    }
};

