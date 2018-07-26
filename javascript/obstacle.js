var OBSTACLES = {
    CONTEXT: '',
    FILE: 'assets/obs.png',
    IMG: 'assets/obs.png',
    OFFSET: {
        x:0,
        y:0
    },
    VELOCITY: -1, // pixel par seconde
    DATA: {
        1: {
            NAME: 'J1',
            FRAMES: [
                {num:0, x:0, y:0, w:22, h:30, sw:22, sh:30},
                {num:1, x:23, y:0, w:22, h:30, sw:22, sh:30},
                {num:2, x:46, y:0, w:22, h:30, sw:22, sh:30},
                {num:3, x:69, y:0, w:22, h:30, sw:22, sh:30},
            ],
            HITBOX: {x:0,y:1,w:17,h:11},
            VELOCITY: 4, // image par seconde
            OFFSET: {
                x: 0,
                y: HEIGHT-60
            },
            WIDTH_REF: 24,
        },
        2: {
            NAME: 'J2',
            FRAMES: [
                {num:0, x:0, y:31, w:22, h:32, sw:22, sh:32},
                {num:1, x:23, y:31, w:22, h:32, sw:22, sh:32},
                {num:2, x:46, y:31, w:22, h:32, sw:22, sh:32},
                {num:3, x:69, y:31, w:22, h:32, sw:22, sh:32},
            ],
            HITBOX: {x:4,y:5,w:17,h:26},
            VELOCITY: 4, // image par seconde
            OFFSET: {
                x: 0,
                y: HEIGHT-62
            },
            WIDTH_REF: 24,
        }
    },
    NB_OBS: 0,
    CALQUE: [],
    TIME: 0,
    NB_OBS_MAX: 3,
    DISTANCE: {
        MIN: 150, // PX
        FROM_OBS: 0,
        BLOCKED: 50, // PX
        FROM_LAST: 0,
    },
    HITBOX_STATUS: true,
    init: function(ctx) {
        this.CONTEXT = ctx;
        img = new Image();
        img.src = this.FILE;
        this.IMG = img;
        this.DISTANCE.BLOCKED = this.DISTANCE.MIN;
        this.DISTANCE.FROM_OBS = this.DISTANCE.MIN/2;
        for (var element in this.DATA) {
            this.NB_OBS++;
        }
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
                this.CONTEXT.beginPath();
                this.CONTEXT.strokeStyle="red";
                this.CONTEXT.rect(obs.OFFSET.x + obs.HITBOX.x,
                                  obs.OFFSET.y + obs.HITBOX.y,
                                  obs.HITBOX.w,
                                  obs.HITBOX.h);
                this.CONTEXT.stroke();
            }
        }
    },
    remove_obs: function() {
        if (this.CALQUE.length == 0) {
            return;
        }
        while (this.CALQUE[0].OFFSET.x + this.CALQUE[0].WIDTH_REF <= 0) {
            var obs = this.CALQUE.shift();
            console.log(`    - OBS "${obs.NAME}"`)
            if (this.CALQUE.length == 0) {
                return;
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
        console.log(`${p} > 0.4 : add obstacle?`);
        if (p > 0.8) {
            this.DISTANCE.FROM_OBS = 0;
            var p = Math.ceil(Math.random()*this.NB_OBS_MAX);
            console.log(`${p} : nb obstacle?`);
            var x = WIDTH;
            for (var i = 1 ; i <= p ; i++) {
                var num = Math.ceil(Math.random() * this.NB_OBS);
                var obs = new obstacle(this.DATA[num], x);
                x += obs.WIDTH_REF;
                this.DISTANCE.FROM_OBS -= obs.WIDTH_REF;
                this.CALQUE.push(obs);
            }
            console.log('done');
        } else {
            console.log('Obstacle add fail');
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
    restart: function() {
        this.OFFSET.x = 0;
        this.OFFSET.y = 0;
        this.TIME = 0;
        this.CALQUE = [];
        this.DISTANCE.FROM_OBS = 0;
        this.DISTANCE.FROM_LAST = 0;
    },
    set_velocity: function(rate) {
        this.VELOCITY = -200 * rate;
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
