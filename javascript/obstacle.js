var OBSTACLES = {
    VELOCITY: SETTINGS.OBSTACLE.VELOCITY + SETTINGS.GROUND.VELOCITY,
    DISTANCE: SETTINGS.OBSTACLE.DISTANCE,
    DATA: {},
    NB_OBS_MAX: SETTINGS.OBSTACLE.NB_OBS_MAX,
    HITBOX_STATUS: false,
    init: function(ctx) {
        // Context
        this.CONTEXT = ctx;
        
        // Image
        img = new Image();
        img.src = FILES.OBSTACLE;
        this.IMG = img;
        
        // Frames
        var nb_obs = 0;
        for (var element in FRAMES.OBSTACLE) {
            nb_obs++;
            this.DATA[nb_obs] = FRAMES.OBSTACLE[element];
        }
        this.NB_OBS = nb_obs;
        
        // Initialize other useful settings
        this.CALQUE = [];
        this.NB_CURRENT_OBS = 0;
        this.set_gap();
        this.DISTANCE.BLOCKED = this.DISTANCE.MIN;
        this.DISTANCE.FROM_OBS = this.DISTANCE.MIN/4;
        this.DISTANCE.FROM_LAST = 0;
        this.OFFSET = {
            x:0,
            y:0
        };
        this.TIME = 0;
    },
    draw: function() {
        for (var i = 0 ; i < this.CALQUE.length ; i++) {
            var obs = this.CALQUE[i];
            this.CONTEXT.drawImage(this.IMG,
                                   obs.FRAMES[obs.NUM].x,
                                   obs.FRAMES[obs.NUM].y,
                                   obs.FRAMES[obs.NUM].w,
                                   obs.FRAMES[obs.NUM].h,
                                   obs.OFFSET.x,
                                   obs.OFFSET.y,
                                   obs.FRAMES[obs.NUM].sw,
                                   obs.FRAMES[obs.NUM].sh);
            if (this.HITBOX_STATUS) {
                this.draw_hitbox(obs);
            }
        }
    },
    draw_hitbox: function(obstacle) {
        this.CONTEXT.beginPath();
        this.CONTEXT.strokeStyle="red";
        this.CONTEXT.rect(obstacle.OFFSET.x + obstacle.HITBOX.x,
                          obstacle.OFFSET.y + obstacle.HITBOX.y,
                          obstacle.HITBOX.w,
                          obstacle.HITBOX.h);
        this.CONTEXT.stroke();
    },
    remove_obs: function() {
        if (this.NB_CURRENT_OBS != 0) {
            while (this.CALQUE[0].OFFSET.x + this.CALQUE[0].WIDTH_REF <= 0) {
                var obs = this.CALQUE.shift();
                this.NB_CURRENT_OBS--;
                console.log(`    - OBS "${obs.NAME}"`)
                if (this.CALQUE.length == 0) {
                    return;
                }
            }
        }
    },
    translate_obs: function(transX, transY) {
        for (var i = 0 ; i < this.CALQUE.length ; i++) {
            this.CALQUE[i].OFFSET.x += transX;
            this.CALQUE[i].OFFSET.y += transY;
        }
    },
    add_obs: function() {
        var p = Math.random();
        if (p > 1 - SETTINGS.OBSTACLE.GENERATOR_COEFF || this.NB_CURRENT_OBS == 0) {
            this.DISTANCE.FROM_OBS = 0;
            var nb_obs = getRandom(1, this.NB_OBS_MAX);
//            console.log(`${nb_obs} object to add`);
            var obstacle_width = 0;
            for (var i = 1 ; i <= nb_obs ; i++) {
                var num = Math.ceil(Math.random() * this.NB_OBS);
                var obs = new obstacle(this.DATA[num], WIDTH + obstacle_width);
                obstacle_width += obs.WIDTH_REF;
//                console.log(`Obstacle width : ${obstacle_width}\nwidth max: ${this.WIDTH_MAX}`);
                if (obstacle_width >= this.WIDTH_MAX) {
                    return;
                }
                this.DISTANCE.FROM_OBS -= obs.WIDTH_REF;
                this.CALQUE.push(obs);
                this.NB_CURRENT_OBS++;
//                console.log(`+ OBS "${obs.NAME}"`)
            }
        } else {
            this.DISTANCE.FROM_LAST = this.DISTANCE.BLOCKED;
        }
    },
    animate: function(fps) {
        for (var i = 0 ; i < this.CALQUE.length ; i++) {
            var obs = this.CALQUE[i];
            obs.TIME++;
            var vel = Math.trunc(fps / obs.VELOCITY);
            if (obs.TIME >= vel) {
                obs.TIME = 0;
                obs.NUM++;
                if (obs.NUM >= obs.NB_FRAMES) {
                    obs.NUM = 0;
                }
            }
        }
    },
    get_hitbox: function() {
        var rsl = [];
        for (var i = 0 ; i < this.CALQUE.length ; i++) {
            var obs = this.CALQUE[i];
            var hitbox = {
            x: obs.OFFSET.x + obs.HITBOX.x,
            y: obs.OFFSET.y + obs.HITBOX.y,
            w: obs.HITBOX.w,
            h: obs.HITBOX.h
            };
            rsl.push(hitbox);
        }
        return rsl;
    },
    run: function(fps) {
        this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
        var vel = this.VELOCITY / fps;
        var transX = Math.trunc(this.OFFSET.x + vel);
        this.OFFSET.x += vel - transX;
        this.DISTANCE.FROM_OBS -= transX;
        this.DISTANCE.FROM_LAST += transX;
        if (this.DISTANCE.FROM_OBS >= this.DISTANCE.MIN && this.DISTANCE.FROM_LAST <= 0) {
            this.add_obs();
        }
        this.translate_obs(transX, 0);
        this.remove_obs();
        this.animate(fps);
        this.draw();
    },
    reset: function() {
        this.init(this.CONTEXT);
    },
    set_gap: function() {
        this.DISTANCE.MIN = - this.VELOCITY * SETTINGS.OBSTACLE.GAP_COEFF * SETTINGS.PLAYER.ANIMATION.JUMP_TIME;
        this.WIDTH_MAX = - this.VELOCITY * SETTINGS.OBSTACLE.WIDTH_COEFF * SETTINGS.PLAYER.ANIMATION.JUMP_TIME;
    },
    set_velocity: function() {
        var rate = 1 + 9 * Math.tanh(SCORE.SCORE/3000);
        this.VELOCITY = SETTINGS.GROUND.VELOCITY * rate + SETTINGS.OBSTACLE.VELOCITY;
        this.set_gap();
    },
    toggle_hitbox: function() {
        this.HITBOX_STATUS = !this.HITBOX_STATUS;
    }
};

function obstacle(data, x) {
    this.NAME =         data.NAME;
    this.FRAMES =       data.FRAMES;
    this.HITBOX =       data.HITBOX;
    this.NB_FRAMES =    data.FRAMES.length;
    this.NUM =          0;
    this.TIME =         0;
    this.VELOCITY =     data.VELOCITY;
    this.OFFSET = {
        x: x,
        y: data.OFFSET.y
    };
    this.WIDTH_REF =    data.WIDTH_REF;
}