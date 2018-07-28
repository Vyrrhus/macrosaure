// CANVAS
var CANVAS = {
    BACKGROUND: document.getElementById('background'),
    OBSTACLE:   document.getElementById('obstacle'),
    MACRON:     document.getElementById('macron'),
    TEXT:       document.getElementById('text')
};

// CANVAS SIZE
var WIDTH   = CANVAS.BACKGROUND.width;
var HEIGHT  = CANVAS.BACKGROUND.height;

// CONTEXT
var CONTEXT = {
    BACKGROUND: CANVAS.BACKGROUND.getContext('2d'),
    OBSTACLE:   CANVAS.OBSTACLE.getContext('2d'),
    MACRON:     CANVAS.MACRON.getContext('2d'),
    TEXT:       CANVAS.TEXT.getContext('2d')
};

// IMAGE FILES
var FILES = {
    SCORE: 'assets/score.png',
    PLAYER: 'assets/macron.png',
    OBSTACLE: 'assets/obs.png'
};

// FRAMES
var FRAMES = {
    PLAYER: {
        JUMP: [
            {num:0, x:84, y:0, w:20, h:38, sw:20, sh:38},
            {num:0, x:105, y:0, w:20, h:38, sw:20, sh:38},
            {num:0, x:128, y:0, w:20, h:38, sw:20, sh:38},
            ],
        RUN: [
            {num:0, x:0, y:0, w:19, h:38, sw:19, sh:38},
            {num:1, x:21, y:0, w:19, h:38, sw:19, sh:38},
            {num:2, x:42, y:0, w:19, h:38, sw:19, sh:38},
            {num:3, x:63, y:0, w:19, h:38, sw:19, sh:38}
            ]
    },
    OBSTACLE: {
        CAMERA: {
            NAME: 'CAMERA',
            FRAMES: [
                {num:0, x:0, y:0, w:22, h:30, sw:22, sh:30},
                {num:1, x:23, y:0, w:22, h:30, sw:22, sh:30},
                {num:2, x:46, y:0, w:22, h:30, sw:22, sh:30},
                {num:3, x:69, y:0, w:22, h:30, sw:22, sh:30},
            ],
            HITBOX: {x:0,y:1,w:17,h:11},
            VELOCITY: 4, // image par seconde
            OFFSET: {
                x: 0,
                y: HEIGHT-60
            },
            WIDTH_REF: 24,
        },
        SPEAKER: {
            NAME: 'SPEAKER',
            FRAMES: [
                {num:0, x:0, y:31, w:22, h:32, sw:22, sh:32},
                {num:1, x:23, y:31, w:22, h:32, sw:22, sh:32},
                {num:2, x:46, y:31, w:22, h:32, sw:22, sh:32},
                {num:3, x:69, y:31, w:22, h:32, sw:22, sh:32},
            ],
            HITBOX: {x:4,y:5,w:17,h:26},
            VELOCITY: 4, // image par seconde
            OFFSET: {
                x: 0,
                y: HEIGHT-62
            },
            WIDTH_REF: 24,
        }
    }
}

// SETTINGS
var SETTINGS = {
    PLAYER: {
        ANIMATION: {
            JUMP_IPS: 8,       // image par seconde
            RUN_IPS: 4,         // image par seconde
            JUMP_HEIGHT: 50,    // pixels
            JUMP_TIME: 0.6        // secondes
        },
        OFFSET: {
            x: 40,
            y: HEIGHT - 68
        }
    },
    OBSTACLE: {
        DISTANCE: {
            BLOCKED: 10         // pixel
        },
        VELOCITY: -20,          // pixel par seconde
        GAP_COEFF: 1.1,
        WIDTH_COEFF: 0.5,
        GENERATOR_COEFF: 0.3,
        NB_OBS_MAX: 5
    },
    GROUND: {
        VELOCITY: -200           // pixel par seconde
    },
    SKY: {
        VELOCITY: -5            // pixel par seconde
    }
}
