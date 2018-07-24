var BACKGROUND = {
    CONTEXT: '',
    DATA: {
        SKY: {
            NAME: 'SKY',
            NUM: 0,
            VELOCITY: 0,
            IMG: 'assets/fk/sky_HD.png',
            FRAMES: [
                {num:1, x:0, y:0, w:4, h:256, sw:4, sh:256},        // TILE 1
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function() {
                return 0; 
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
                return;
            },
            set_blocked: function(velocity) {
                return 100;
            }
        },
        MOUNTAIN: {
            NAME: 'MOUNTAIN',
            NUM: 1,
            VELOCITY: 0,
            IMG: 'assets/fk/tilesmap.png',
            FRAMES: [
                {num:1, x:1535, y:832, w:512, h:192, sw:512, sh:192}
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function() {
                return 0; 
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
                return;
            },
            set_blocked: function(velocity) {
                return 100;
            }
        },
        BUILD_BACK: {
            NAME: 'BUILD_BACK',
            NUM: 2,
            VELOCITY: -20,
            IMG: 'assets/fk/tilesmap.png',
            FRAMES: [
                {num:1, x:1022, y:926, w:512, h:97, sw:512, sh:97}
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function() {
                return 159; 
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
                return -5*rate;
            },
            set_blocked: function(velocity) {
                return 100;
            }
        },
        BUILD_FRONT: {
            NAME: 'BUILD_FRONT',
            NUM: 3,
            VELOCITY: -100,
            IMG: 'assets/fk/tilesmap.png',
            FRAMES: [
                {num:1, x:0, y:0, w:128, h:256, sw:128, sh:256},
                {num:2, x:130, y:0, w:384, h:256, sw:384, sh:256},
                {num:3, x:515, y:0, w:384, h:256, sw:384, sh:256},
                {num:4, x:899, y:0, w:544, h:256, sw:544, sh:256},
                {num:5, x:1443, y:0, w:177, h:256, sw:177, sh:256},
                {num:6, x:1621, y:0, w:305, h:256, sw:305, sh:256},
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function() {
                return 0; 
            },
            get_transY: function() {
                return 0;
            },
            is_continuous: function() {
                return false;
            },
            get_likelihood: function() {
                var p = Math.random();
                if (p > 0.4) {
                    return true;
                } else {
                    return false;
                }
            },
            set_velocity: function(rate) {
                return -100*rate;
            },
            set_blocked: function(velocity) {
                return Math.trunc(Math.random()*25);
            }
        },
        UP_PAVEMENT: {
            NAME: 'UP_PAVEMENT',
            NUM: 4,
            VELOCITY: -100,
            IMG: 'assets/fk/tilesmap.png',
            FRAMES: [
                {num:1, x:1022, y:897, w:512, h:29, sw:512, sh:29}
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function() {
                return 256; 
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
                return -100*rate;
            },
            set_blocked: function(velocity) {
                return 100;
            }
        },
        DOWN_PAVEMENT: {
            NAME: 'DOWN_PAVEMENT',
            NUM: 5,
            VELOCITY: -100,
            IMG: 'assets/fk/tilesmap.png',
            FRAMES: [
                {num:1, x:1, y:846, w:32, h:32, sw:32, sh:32}
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function() {
                return 285; 
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
                return -100*rate;
            },
            set_blocked: function(velocity) {
                return 100;
            }
        },
        ROAD: {
            NAME: 'ROAD',
            NUM: 6,
            VELOCITY: -100,
            IMG: 'assets/fk/tilesmap.png',
            FRAMES: [
                {num:1, x:130, y:926, w:64, h:64, sw:64, sh:64}
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function() {
                return 317; 
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
                return -100*rate;
            },
            set_blocked: function(velocity) {
                return 100;
            }
        },
        TREE: {
            NAME: 'TREE',
            NUM: 7,
            VELOCITY: -100,
            IMG: 'assets/fk/trees.png',
            FRAMES: [
                {num:1, x:0, y:0, w:256, h:255, sw:256, sh:255},
                {num:2, x:0, y:257, w:256, h:254, sw:256, sh:254},
                {num:3, x:0, y:513, w:256, h:315, sw:256, sh:315}
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function(frame) {
                return 270 - frame.h;
            },
            get_transY: function() {
                return 0;
            },
            is_continuous: function() {
                return false;
            },
            get_likelihood: function() {
                var p = Math.random();
                if (p > 0.2) {
                    return true;
                }
                else {
                    return false;
                }
            },
            set_velocity: function(rate) {
                return -100*rate;
            },
            set_blocked: function(velocity) {
                return Math.trunc(Math.random()*100+30);
            }
        },
        LAMP: {
            NAME: 'LAMP',
            NUM: 8,
            VELOCITY: -100,
            IMG: 'assets/fk/tilesmap.png',
            FRAMES: [
                {num:1, x:463, y:903, w:32, h:120, sw:32, sh:120}
            ],
            NB_FRAMES: '',
            CONTENT: [],
            OFFSET: {
                x:0,
                y:0
            },
            NB_FRAMES_BLOCKED: 0,
            offset_Y: function() {
                return 179; 
            },
            get_transY: function() {
                return 0;
            },
            is_continuous: function() {
                return false;
            },
            get_likelihood: function() {
                return true;
            },
            set_velocity: function(rate) {
                return -100*rate;
            },
            set_blocked: function(velocity) {
                return 300;
            }
        }
    },
    CALQUE: [],
    init: function(ctx) {
        this.CONTEXT = ctx;
        for (var element in this.DATA) {
            var calque = this.DATA[element];
            this.CALQUE[calque.NUM] = calque;
            img = new Image();
            img.src = calque.IMG;
            this.CALQUE[calque.NUM].IMG = img;
            this.CALQUE[calque.NUM].NB_FRAMES = calque.FRAMES.length;
            this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
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
    set_velocity: function(rate) {
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
