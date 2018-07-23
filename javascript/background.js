var Background = {
    RATE: 1,
    GROUND: {
        NAME: 'GRD',
        VELOCITY: 30, //px/s
        POS: [
            {num: 1, x:0, y:0, w:196, h:14},        // TILE 1
            {num: 2, x:197, y:0, w:201, h:14},      // TILE 2
            {num: 3, x:399, y:0, w:237, h:14},      // TILE 3
            {num: 4, x:637, y:0, w:113, h:14},      // TILE 4
            {num: 5, x:708, y:0, w:81, h:14},       // TILE 5
            {num: 6, x:760, y:0, w:156, h:14},      // TILE 6
            {num: 7, x:1044, y:0, w:158, h:14}      // TILE 7
        ],
        NB_FRAME: 7,
        PIXEL_LEFT: '',
        FRAME_LIST: [],
        OFFSET_X: 0,
        OFFSET_Y: 40
    },
    init: function(ctx, img) {
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        this.initCalque(ctx, img, this.GROUND);
    },
    initCalque: function(ctx, img, calque) {
        calque.PIXEL_LEFT = - WIDTH;
        while (calque.PIXEL_LEFT < 0) {
            this.add_frame(ctx, img, calque);
        }
    },
    move: function(ctx,img, fps) {
        ctx.clearRect(0,0,WIDTH,HEIGHT);
        this.moveCalque(ctx, img, fps, this.GROUND);
    },
    moveCalque: function(ctx, img, fps, calque) {
        /* Velocity */
        var vel = calque.VELOCITY * this.RATE / fps;
        calque.OFFSET_X -= vel;
        
        /* FRAME_LIST shift & add */
        while (Math.trunc(calque.OFFSET_X) + calque.FRAME_LIST[0].w < 0) {
            var frame = calque.FRAME_LIST.shift();
            calque.OFFSET_X += frame.w;
            console.log(`    - ${calque.NAME}, n°${frame.num}`);
        }
        while (calque.PIXEL_LEFT + Math.trunc(calque.OFFSET_X) < 0) {
            this.add_frame(ctx, img, calque);            
        }
        
        /* Draw */
        calque.PIXEL_LEFT = - WIDTH + Math.trunc(calque.OFFSET_X);
        for (var frame in calque.FRAME_LIST) {
            this.draw_frame(ctx, img, calque.FRAME_LIST[frame], calque);
        }
    },
    add_frame: function(ctx,img, calque) {
        var num = Math.floor(Math.random()*calque.NB_FRAME);
            if (num == calque.NB_FRAME) {
                num--;
            }
        var frame = calque.POS[num];
        this.draw_frame(ctx, img, frame, calque);
        calque.FRAME_LIST.push(frame);
        console.log(`+ ${calque.NAME}, n°${frame.num}`);
    },
    draw_frame: function(ctx, img, frame, calque) {
        ctx.drawImage(img, frame.x, frame.y, frame.w, frame.h, WIDTH + calque.PIXEL_LEFT, HEIGHT - calque.OFFSET_Y, frame.w, frame.h);
        calque.PIXEL_LEFT += frame.w;
    },
    setVelocity: function(rate) {
        this.RATE = rate;
    },
    resetVelocity: function() {
        this.RATE = 1;
    }
    
};