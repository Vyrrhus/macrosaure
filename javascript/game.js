// GAME

img_score = new Image();
img_score.src = 'assets/score.png';

var play = Object.create(GAME);
GAME.run = function(time) {
    this.SCORE += 0.05 ;
    Score.drawScore(CANVAS.TEXT, CONTEXT.TEXT, img_score, this.SCORE);
};