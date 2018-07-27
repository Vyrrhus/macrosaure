var LOCK = false;
GAME.init();

//document.addEventListener('click', function(event) {
//    if (!LOCK) {
//            GAME.start();
//            LOCK = true;
//        } else {
//            if (!PLAYER.JUMP.STATUS) {
//                PLAYER.switch_status();
//            }
//        }
//})

document.addEventListener('keydown', function(event) {
    if (event.keyCode == 32) {
        if (!LOCK) {
            GAME.start();
            LOCK = true;
        } else {
            if (!PLAYER.JUMP.STATUS) {
                PLAYER.switch_status();
            }
        }
        if (GAME.GAME_OVER) {
            GAME.restart();
        }
    }
    if (event.keyCode == 84) {
        GAME.toggle_hitbox();
    }
    if (event.keyCode == 27 || event.keyCode == 80) {
        GAME.PAUSE = !GAME.PAUSE;
        GAME.start();
    }
})