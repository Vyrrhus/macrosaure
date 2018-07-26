var PLAYER = {
    CONTEXT: '',
    FILE: 'assets/macron.png',
    IMG: 'assets/macron.png',
    OFFSET_X: 40,
    OFFSET_Y: HEIGHT-68,
    VELOCITY: 5, // image par seconde
    TIME: 0,
    Y: 0,
    JUMP:  {
        STATUS: false,
        UP_TIME: 30,
        DOWN_TIME: 20,
        HEIGHT: 60,
        FRAMES: [
            {num:0, x:84, y:0, w:20, h:38, sw:20, sh:38}
        ],
        NB_FRAMES: '',
        NUM: 0
    },
    RUN: {
        STATUS: true,
        FRAMES: [
            {num:0, x:0, y:0, w:19, h:38, sw:19, sh:38},
            {num:2, x:21, y:0, w:19, h:38, sw:19, sh:38},
            {num:3, x:42, y:0, w:19, h:38, sw:19, sh:38},
            {num:4, x:63, y:0, w:19, h:38, sw:19, sh:38}
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
    },
    draw: function(frame, y) {
        this.CONTEXT.drawImage(this.IMG,
                               frame.x,
                               frame.y,
                               frame.w,
                               frame.h,
                               this.OFFSET_X,
                               this.OFFSET_Y - y,
                               frame.sw,
                               frame.sh);
        if (this.HITBOX_STATUS) {
            var hitbox = this.HITBOX;
            this.CONTEXT.beginPath();
            this.CONTEXT.strokeStyle="red";
            this.CONTEXT.rect(this.OFFSET_X + hitbox.x, 
                              this.OFFSET_Y - y + hitbox.y, 
                              hitbox.w, 
                              hitbox.h);
            this.CONTEXT.stroke();
        }
    },
    switch_status: function() {
        this.TIME = 0;
        this.JUMP.STATUS = !this.JUMP.STATUS;
        this.RUN.STATUS = !this.RUN.STATUS;
    },
    jump_animate: function(vel) {
        var height = 0;
        if (this.TIME < this.JUMP.UP_TIME) {
            height = Math.trunc(this.JUMP.HEIGHT * this.TIME / this.JUMP.UP_TIME);
        } else if (this.TIME < this.JUMP.UP_TIME + this.JUMP.DOWN_TIME) {
            height = Math.trunc(this.JUMP.HEIGHT * (1 - (this.TIME - this.JUMP.UP_TIME) / this.JUMP.DOWN_TIME));
        } else {
            this.switch_status();
            this.run_animate(vel);
            return;
        }
        if (this.TIME % vel ==0) {
            this.JUMP.NUM++;
            if (this.JUMP.NUM >= this.JUMP.NB_FRAMES) {
                this.JUMP.NUM = 0;
            }
        }
        this.Y = height;
        this.draw(this.JUMP.FRAMES[this.JUMP.NUM], height);    
    },
    run_animate: function(vel) {
        if (this.TIME >= vel) {
            this.TIME = 0;
            this.RUN.NUM++;
            if (this.RUN.NUM >= this.RUN.NB_FRAMES) {
                this.RUN.NUM = 0;
            }
        }
        this.Y = 0;
        this.draw(this.RUN.FRAMES[this.RUN.NUM], 0);
    },
    get_hitbox: function() {
        var hitbox = {
            x: this.OFFSET_X + this.HITBOX.x,
            y: this.OFFSET_Y -this.Y + this.HITBOX.y,
            w: this.HITBOX.w,
            h: this.HITBOX.h
        };
        return hitbox;
    },
    run: function(fps) {
        this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
        this.TIME++;
        var vel = Math.trunc(fps / this.VELOCITY);
        if (this.JUMP.STATUS) {
            this.jump_animate(vel);
        } else if (this.RUN.STATUS) {
            this.run_animate(vel);
        }
    },
    restart: function() {
        this.TIME = 0;
        this.Y = 0;
        if (this.JUMP.STATUS) {
            this.switch_status();
        }
        this.JUMP.NUM = 0;
        this.RUN.NUM = 0;
    },
    set_velocity: function(rate) {
            this.VELOCITY = 5*rate;
        },
    toggle_hitbox: function() {
        this.HITBOX_STATUS = !this.HITBOX_STATUS;
    }
};

