// GAME
var GAME_ON = false;
GAME.init();

document.addEventListener('click', function(event) {
    if (GAME_ON) {return;}
    GAME.start();
    GAME_ON=true;
})
