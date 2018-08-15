var SCORE = {
    size: 1.2,
    HIGHSCORE: 0,
    NB_TRY: 0,
    number: [
        {x:0, y:0, w:9, h:11}, // 0
        {x:10, y:0, w:9, h:11}, // 1
        {x:20, y:0, w:9, h:11}, // 2
        {x:30, y:0, w:9, h:11}, // 3
        {x:40, y:0, w:9, h:11}, // 4
        {x:50, y:0, w:9, h:11}, // 5
        {x:60, y:0, w:9, h:11}, // 6
        {x:70, y:0, w:9, h:11}, // 7
        {x:80, y:0, w:9, h:11}, // 8
        {x:90, y:0, w:9, h:11}  // 9
    ],
    init: function(ctx) {
        // Context
        this.CONTEXT = ctx;
        
        // Scores
        this.SCORE = 0;
		this.SPEED = SETTINGS.SCORE.MIN_PER_FRAME
        this.NB_TRY++;
        
        CONTEXT.TEXT.clearRect(0,0,WIDTH,HEIGHT);
        
    },
	set_score: function() {
		this.SCORE += this.SPEED;
		this.EVENT += this.SPEED;
		if (this.SPEED < SETTINGS.SCORE.MAX_PER_FRAME) {
			this.SPEED += SETTINGS.SCORE.ACC;
		}
	},
	get_rate: function() {
		return this.SPEED / SETTINGS.SCORE.MIN_PER_FRAME;
	},
    drawChiffre: function(chiffre, x, y) {
        chiffre = parseInt(chiffre);
        this.CONTEXT.drawImage(IMAGE.FILES.SCORE,
                               this.number[chiffre].x, 
                               this.number[chiffre].y, 
                               this.number[chiffre].w, 
                               this.number[chiffre].h, 
                               x, 
                               y, 
                               this.number[chiffre].w * this.size,
                               this.number[chiffre].h * this.size);
    },
    drawScore: function() {
        var score = Math.floor(this.SCORE).toString();
        len = score.length;
        for (var i=0 ; i < 5 - len ; i++) {
            score = '0' + score;
        }
        this.CONTEXT.clearRect(WIDTH - 120, 10, 120, 30);
        for (i=0 ; i < 5 ; i++) {
            var x = WIDTH - 120 + 20*i;
            var y = 10;
            this.drawChiffre(score[i], x, y);
        }
        
        if (this.SCORE >= this.HIGHSCORE) {
            this.HIGHSCORE = this.SCORE;
        }
        
        if (this.NB_TRY > 1) {
            this.drawHighScore();
        }
    },
    drawHighScore: function() {
        var highScore = Math.floor(this.HIGHSCORE).toString();
        len = highScore.length;
        for (var i=0 ; i < 5 - len ; i++) {
            highScore = '0' + highScore;
        }
        this.CONTEXT.clearRect(WIDTH-280, 10, 140, 30);
        for (i=0 ; i < 5 ; i++) {
            var x = WIDTH - 280 + 20*i;
            var y = 10;
            this.drawChiffre(highScore[i], x, y);
        }
    },
    reset: function() {
        this.init(this.CONTEXT);
    }
};