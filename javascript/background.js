var BACKGROUND = {
    CONTEXT: '',
    DATA: {
        SKY: {
            NAME: 'SKY',
            NUM: 0,
            VELOCITY: -5, // PX/s
            FILE: 'assets/sky.png',
            IMG: 'assets/sky.png',
            FRAMES: [
                {num:1, x:0, y:0, w:46, h:39, sw:46, sh:39},        // TILE 1
                {num:2, x:47, y:0, w:46, h:39, sw:46, sh:39},       // TILE 2
                {num:3, x:94, y:0, w:46, h:39, sw:46, sh:39}        // TILE 3
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function() {
                return Math.floor(Math.random()*60) + 20; 
            },
            get_transY: function() {
                return 0;
            },
            is_continuous: function() {
                return false;
            },
            get_likelihood: function() {
                var p = Math.random();
                if (p > 0.9) {
                    return true;
                } else {
                    return false;
                }
            },
            set_velocity: function(rate) {
                this.VELOCITY = SETTINGS.SKY.VELOCITY * rate;
            },
            set_blocked: function(velocity) {
                return 200;
            }
        },
        GROUND: {
            NAME: 'GROUND',
            NUM: 1,
            VELOCITY: -50, //PX/s
            FILE: 'assets/ground.png',
            IMG: 'assets/ground.png',
            FRAMES: [
                {num: 1, x:0, y:0, w:196, h:14, sw:196, sh:14},         // TILE 1
                {num: 2, x:197, y:0, w:201, h:14, sw:201, sh:14},       // TILE 2
                {num: 3, x:399, y:0, w:237, h:14, sw:237, sh:14},       // TILE 3
                {num: 4, x:637, y:0, w:113, h:14, sw:113, sh:14},       // TILE 4
                {num: 5, x:708, y:0, w:81, h:14, sw:81, sh:14},         // TILE 5
                {num: 6, x:760, y:0, w:156, h:14, sw:156, sh:14},       // TILE 6
                {num: 7, x:1044, y:0, w:158, h:14, sw:158, sh:14}       // TILE 7
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function() {
                return HEIGHT-40; 
            },
            get_transY: function() {
                return 0;
            },
            is_continuous: function() {
                return true;
            },
            get_likelihood: function() {
                return true;
            },
            set_velocity: function(rate) {
                this.VELOCITY = SETTINGS.GROUND.VELOCITY * rate;
            },
            set_blocked: function(velocity) {
                return 100;
            }
        },
    },
    CALQUE: [],
    init: function(ctx) {
        // Context
        this.CONTEXT = ctx;
        this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
        
        // Calques
        for (var element in this.DATA) {
            var calque = this.DATA[element];
            this.CALQUE[calque.NUM] = calque;
            this.CALQUE[calque.NUM].NB_FRAMES = calque.FRAMES.length;
            
            // Image
            img = new Image();
            img.src = calque.FILE;
            this.CALQUE[calque.NUM].IMG = img;
            img.onload = function() {
                BACKGROUND.animate(calque, GAME.START_FPS);
            }
            
        }
    },
    draw: function(calque) {
        for (var i=0 ; i < calque.CONTENT.length ; i++) {
            var e = calque.CONTENT[i];
            this.CONTEXT.drawImage(calque.IMG,
                               e.frame.x,
                               e.frame.y,
                               e.frame.w,
                               e.frame.h,
                               e.x,
                               e.y,
                               e.w,
                               e.h);
        }
    },
    add_frame: function(calque, num, x) {
        var frame = calque.FRAMES[num];
        var content = {
            frame: frame,
            x: x,
            y: calque.offset_Y(frame),
            w: frame.sw,
            h: frame.sh
        };
        calque.CONTENT.push(content);
    },
    add_random_frame: function(calque, x) {
        var num = Math.floor(Math.random() * calque.NB_FRAMES);
        this.add_frame(calque, num, x);
    },
    remove_frames: function(calque) {
        /* remove tous les frames de content qui disparaissent sur le bord gauche */
        for (var i = 0 ; i < calque.CONTENT.length ; i++) {
            var right_side = calque.CONTENT[i].x + calque.CONTENT[i].w;
            if (right_side < 0) {
                calque.CONTENT.splice(i, 1);
            }
        }
    },
    update_frames: function(calque, trans_x, trans_y) {
        for (var i = 0 ; i < calque.CONTENT.length ; i++) {
            calque.CONTENT[i].x += trans_x;
            calque.CONTENT[i].y += trans_y;
        }
    },
    animate: function(calque, fps) {
        var vel = calque.VELOCITY / fps;
        var transX = Math.trunc(calque.OFFSET.x + vel);
        calque.OFFSET.x += vel - transX;
        calque.OFFSET.y += calque.get_transY();
        var transY = Math.trunc(calque.OFFSET.y);
        calque.OFFSET.y -= transY;
        this.update_frames(calque, transX, transY);
        this.remove_frames(calque);
        
        var last_frame = calque.CONTENT[calque.CONTENT.length - 1];
        if (last_frame == undefined) {
            var right_side = 0;
        } else {
            var right_side = last_frame.x + last_frame.w;
        }
        while (right_side < WIDTH) {
            if (calque.is_continuous()) {
                this.add_random_frame(calque, right_side);
                last_frame = calque.CONTENT[calque.CONTENT.length - 1];
                right_side = last_frame.x + last_frame.w;
            } else {
                right_side = WIDTH;
                if (calque.NB_FRAMES_BLOCKED == 0) {
                    if (calque.get_likelihood()) {
                        this.add_random_frame(calque, WIDTH);
                        calque.NB_FRAMES_BLOCKED = calque.set_blocked(vel);
                    } else {
                        calque.NB_FRAMES_BLOCKED = calque.set_blocked(vel);
//                        console.log(`Blocage pour ${calque.NB_FRAMES_BLOCKED} frames`);
                    }
                } else {
                    calque.NB_FRAMES_BLOCKED--;
                }
            }
        }
        this.draw(calque);
    },
    run: function(fps) {
        this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
        for (var i = 0 ; i < this.CALQUE.length ; i++) {
            var calque = this.CALQUE[i];
            if (calque != undefined) {
                this.animate(calque, fps);
            }
        }
    },
    set_velocity: function() {
        var rate = 1 + 9 * Math.tanh(SCORE.SCORE/3000);
        for (var i = 0 ; i < this.CALQUE.length ; i++) {
            calque = this.CALQUE[i];
            if (calque != undefined) {
                calque.set_velocity(rate);
            }
        }
    },
    reset: function() {
        this.CALQUE = [];
        this.init(this.CONTEXT);
    }
};