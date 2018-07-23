var Score = {
    size: 1.2,
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
    drawChiffre: function(ctx, img, chiffre, x, y) {
        chiffre = parseInt(chiffre);
        ctx.drawImage(img, 
                      this.number[chiffre].x, 
                      this.number[chiffre].y, 
                      this.number[chiffre].w, 
                      this.number[chiffre].h, 
                      x, 
                      y, 
                      this.number[chiffre].w * this.size, 
                      this.number[chiffre].h * this.size);
    },
    drawScore: function(canvas, ctx, img, score) {
        score = Math.floor(score).toString();
        len = score.length;
        for (var i=0 ; i < 5 - len ; i++) {
            score = '0' + score;
        }
        ctx.clearRect(canvas.width - 120, 10, 120, 30);
        for (i=0 ; i < 5 ; i++) {
            var x = canvas.width - 120 + 20*i;
            var y = 10;
            this.drawChiffre(ctx, img, score[i], x, y);
        }
    },
    drawHighScore: function(canvas, ctx, img, highScore) {
        highScore = Math.floor(highScore).toString();
        len = highScore.length;
        for (var i=0 ; i < 5 - len ; i++) {
            highScore = '0' + highScore;
        }
        ctx.clearRect(canvas.width-280, 10, 140, 30);
        for (i=0 ; i < 5 ; i++) {
            var x = canvas.width - 280 + 20*i;
            var y = 10;
            this.drawChiffre(ctx, img, highScore[i], x, y);
        }
    }
};