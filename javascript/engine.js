// CANVAS
var CANVAS = {
    BACKGROUND: document.getElementById('background'),
    OBSTACLE:   document.getElementById('obstacle'),
    MACRON:     document.getElementById('macron'),
    TEXT:       document.getElementById('text')
};

// CONTEXT
var CONTEXT = {
    BACKGROUND: CANVAS.BACKGROUND.getContext('2d'),
    OBSTACLE:   CANVAS.OBSTACLE.getContext('2d'),
    MACRON:     CANVAS.MACRON.getContext('2d'),
    TEXT:       CANVAS.TEXT.getContext('2d')
};

// IMAGE
var IMG = {
    SCORE:  'assets/score.png',
    OVER:   'assets/over.png',
};

// CANVAS SIZE
var WIDTH   = CANVAS.BACKGROUND.width;
var HEIGHT  = CANVAS.BACKGROUND.height;

// SCREEN SIZE
//var WIDTH   = document.getElementById('body').offsetWidth;
//var HEIGHT  = document.getElementById('body').offsetHeight;

// TIME
function getTimeNow() {
    return new Date();
}
/* Machin pour extraire des assets et adapter leur taille au support */

var GAME = {
    START_TIME: 0,
    LAST_TIME:  0,
    FRAME_TIME: 0,
    FPS:        0,
    START_FPS:  60,
    GAME_OVER:  false,
    SCORE:      0,
    HIGH_SCORE: 0,
    TRY_NUMBER: 1,
    init: function() {
        for (var element in IMG) {
            image = new Image();
            image.src = IMG[element];
            IMG[element] = image;
        }
        BACKGROUND.init(CONTEXT.BACKGROUND);
//        OBSTACLE.init(CONTEXT.OBSTACLE);
//        PLAYER.init(CONTEXT.MACRON);
    },
    start: function() {
        var self = this;
        this.START_TIME = getTimeNow();
        
        requestAnimationFrame(function (time) {self.animate(time);});
    },
    tick: function(time) {
        this.updateFrameRate(time);
        this.LAST_TIME = time;
    },
    updateFrameRate: function(time) {
        if (this.LAST_TIME === 0) {
            this.FPS = this.START_FPS;
        }
        else {
            var delta = (time - this.LAST_TIME) / 1000;
            if (delta > 0 && delta < 0.5) {
                this.FRAME_TIME = delta;
            }
            else {
                this.FRAME_TIME = 0;
            }
            this.FPS = 1 / this.FRAME_TIME;
        }
    },
    animate: function(time) {
        var self = this;
        if (this.GAME_OVER) {
            this.setHighScore();
            this.over();
            return;
        }
        this.tick(time);
        BACKGROUND.run(this.FPS);
//        Background.move(CONTEXT.BACKGROUND, this.FPS);
        this.setScore();
        if (this.SCORE > this.HIGH_SCORE && this.TRY_NUMBER > 1) {
            this.setHighScore();
        }
        this.setDifficulty(this.SCORE);
        
        requestAnimationFrame(function (time) {self.animate(time);});
    },
    over: function() {
        CONTEXT.TEXT.drawImage(IMG.OVER, 0, 0, 191, 56, WIDTH/2-115, HEIGHT/3,230,67);
        /* event pour restart problématique, nécessité d'utiliser un objet extérieur ??*/
    },
    restart: function() {
        this.GAME_OVER = false;
        this.LAST_TIME = 0;
        this.SCORE = 0;
        this.TRY_NUMBER++;
        CONTEXT.TEXT.clearRect(WIDTH/2-115, HEIGHT/3,230,67)
        this.start();
    },
    setDifficulty: function(score) {
        var rate = 1 + 10*(Math.tanh(score/500-3)+1);
        BACKGROUND.set_velocity(rate);
//        console.log(rate);
//        Background.setVelocity(rate);
    },
    setScore: function() {
        this.SCORE += 0.1;
        Score.drawScore(CANVAS.TEXT, CONTEXT.TEXT, IMG.SCORE, this.SCORE);
    },
    setHighScore: function() {
        this.HIGH_SCORE = this.SCORE;
        Score.drawHighScore(CANVAS.TEXT, CONTEXT.TEXT, IMG.SCORE, this.HIGH_SCORE);
        if (this.GAME_OVER) {
            this.over();
        }
    }
};
