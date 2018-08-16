var SCORE = {
    size: 1.2,
    HIGHSCORE: 0,
    NB_TRY: 0,
	MODE: 'SCORE',
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
		this.DATE_INIT = new Date();
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
		this.DATE = new Date(this.DATE_INIT.getFullYear(), this.DATE_INIT.getMonth(), this.DATE_INIT.getDate() + Math.floor(this.SCORE/2));
		switch (this.MODE) {
			case 'SCORE':
				this.draw_score();
				break;
			case 'DATE':
				this.draw_date();
		}
		if (this.DATE.getFullYear() >= 2022 && this.DATE.getMonth() >= 4 && this.DATE.getDate() >= 13) {
			GAME.STATE.GAME_OVER = true;
		}
	},
	get_rate: function() {
		return this.SPEED / SETTINGS.SCORE.MIN_PER_FRAME;
	},
    draw_chiffre: function(chiffre, x, y) {
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
    draw_score: function() {
        var score = Math.floor(this.SCORE).toString();
        var len = score.length;
        for (var i=0 ; i < 5 - len ; i++) {
            score = '0' + score;
        }
        this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
        for (i=0 ; i < 5 ; i++) {
            var x = WIDTH - 120 + 20*i;
            var y = 10;
            this.draw_chiffre(score[i], x, y);
        }
        
        if (this.SCORE >= this.HIGHSCORE) {
            this.HIGHSCORE = this.SCORE;
        }
        
        if (this.NB_TRY > 1) {
            this.draw_highScore();
        }
    },
	draw_date: function() {
		// DAY
		var day = this.DATE.getDate().toString();
		var len = day.length;
		if (len == 1) {
			day = '0' + day;
		}
		
		// MONTH
		var month = this.DATE.getMonth() + 1
		month = month.toString();
		len = month.length;
		if (len == 1) {
			month = '0' + month;
		}
		
		// YEAR
		var year = this.DATE.getFullYear().toString();
		
		// DRAWING
		this.CONTEXT.clearRect(0,0,WIDTH,HEIGHT);
		for (var i = 0 ; i < day.length ; i++) {
			var x = WIDTH - 200 + 20 * i;
			var y = 10;
			this.draw_chiffre(day[i], x, y);
		}
		for (i = 0 ; i < month.length ; i++) {
			var x = WIDTH - 150 + 20 * i;
			var y = 10;
			this.draw_chiffre(month[i], x, y);
		}
		for (i = 0 ; i < year.length ; i++) {
			var x = WIDTH - 100 + 20 * i;
			var y = 10;
			this.draw_chiffre(year[i], x, y);
		}
	},
    draw_highScore: function() {
		if (this.MODE == 'DATE') {
			return
		}
        var highScore = Math.floor(this.HIGHSCORE).toString();
        len = highScore.length;
        for (var i=0 ; i < 5 - len ; i++) {
            highScore = '0' + highScore;
        }
        for (i=0 ; i < 5 ; i++) {
            var x = WIDTH - 280 + 20*i;
            var y = 10;
            this.draw_chiffre(highScore[i], x, y);
        }
    },
    reset: function() {
        this.init(this.CONTEXT);
    },
	toggle_mode: function() {
		switch (this.MODE) {
			case 'SCORE':
				this.MODE = 'DATE';
				break;
			case 'DATE':
				this.MODE = 'SCORE';
				break;
		}
	}
};