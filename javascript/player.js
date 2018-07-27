var PLAYER = {
    CONTEXT: '',
    FILE: 'assets/macron.png',
    IMG: 'assets/macron.png',
    OFFSET: {
        x: 40,
        y: HEIGHT - 68
    },
    HEIGHT: 0,
    JUMP:  {
        STATUS: false,
        JUMP_TIME: 1, // s
        MAX_HEIGHT: 60, // PX
        ACCELERATION: 0,
        VELOCITY: 0,
        TIME: 0, // s   
        ANIMATION_VELOCITY: 10, // image par seconde
        ANIMATION_TIME: 0,
        FRAMES: [
            {num:0, x:84, y:0, w:20, h:38, sw:20, sh:38},
            {num:0, x:105, y:0, w:20, h:38, sw:20, sh:38},
            {num:0, x:128, y:0, w:20, h:38, sw:20, sh:38},
        ],
        NB_FRAMES: '',
        NUM: 0
    },
    RUN: {
        STATUS: true,
        ANIMATION_VELOCITY: 5, // image par seconde
        ANIMATION_TIME: 0,
        FRAMES: [
            {num:0, x:0, y:0, w:19, h:38, sw:19, sh:38},
            {num:1, x:21, y:0, w:19, h:38, sw:19, sh:38},
            {num:2, x:42, y:0, w:19, h:38, sw:19, sh:38},
            {num:3, x:63, y:0, w:19, h:38, sw:19, sh:38}
        ],
        NB_FRAMES: '',
        NUM: 0
    },
    HITBOX: {x:5, y:0, w:13, h:31},
    HITBOX_STATUS: false,
    init: function(ctx) {
        this.CONTEXT = ctx;
        img = new Image();
        img.src = this.FILE;
        this.IMG = img;
        this.JUMP.NB_FRAMES = this.JUMP.FRAMES.length;
        this.RUN.NB_FRAMES = this.RUN.FRAMES.length;
        this.JUMP.MAX_HEIGHT = SETTINGS.HAUTEUR_SAUT;
        this.JUMP.JUMP_TIME = SETTINGS.TIME_SAUT;
        this.JUMP.ACCELERATION = - 8 * this.JUMP.MAX_HEIGHT / Math.pow(this.JUMP.JUMP_TIME, 2);
        this.JUMP.VELOCITY = 4 * this.JUMP.MAX_HEIGHT / this.JUMP.JUMP_TIME;
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
            var hitbox = this.HITBOX;
            this.CONTEXT.beginPath();
            this.CONTEXT.strokeStyle="red";
            this.CONTEXT.rect(this.OFFSET.x + hitbox.x, 
                              this.OFFSET.y - this.HEIGHT + hitbox.y, 
                              hitbox.w, 
                              hitbox.h);
            this.CONTEXT.stroke();
        }
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
    restart: function() {
        this.HEIGHT = 0;
        this.JUMP.TIME = 0;
        this.JUMP.ANIMATION_TIME = 0;
        this.RUN.ANIMATION_TIME = 0;
        if (this.JUMP.STATUS) {
            this.switch_status();
        }
        this.JUMP.NUM = 0;
        this.RUN.NUM = 0;
        this.JUMP.MAX_HEIGHT = SETTINGS.HAUTEUR_SAUT;
        this.JUMP.JUMP_TIME = SETTINGS.TIME_SAUT;
        this.JUMP.ACCELERATION = - 8 * this.JUMP.MAX_HEIGHT / Math.pow(this.JUMP.JUMP_TIME, 2);
        this.JUMP.VELOCITY = 4 * this.JUMP.MAX_HEIGHT / this.JUMP.JUMP_TIME;
    },
    set_velocity: function(rate) {
            this.JUMP.ANIMATION_VELOCITY = 10*(1+rate/10);
            this.RUN.ANIMATION_VELOCITY = 5 * (1+rate/5);
        },
    toggle_hitbox: function() {
        this.HITBOX_STATUS = !this.HITBOX_STATUS;
    }
};

