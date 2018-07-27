//Déclaration
var form = document.getElementById('form');

//Nodes input & select
var vitesse = form.elements['input-vitesse'];
var vitesse_obs = form.elements['input-vitesse-obs'];
var nb_obs_max = form.elements['input-nb-obs-max'];
var min_dist = form.elements['input-min-dist'];
var prob_obs = form.elements['input-prob-obs'];
var block_obs = form.elements['input-block-obs'];
var hauteur_saut = form.elements['input-hauteur-saut'];
var time_saut = form.elements['input-time-saut'];

var submit = form.elements['submit'];

submit.addEventListener('click', function(event) {
    if ( vitesse.value != "") {
        SETTINGS.VITESSE = parseInt(vitesse.value);
    }
    if ( nb_obs_max.value != "") {
        SETTINGS.NB_OBS_MAX = parseInt(nb_obs_max.value);
    }
    if ( min_dist.value != "") {
        SETTINGS.MIN_DIST = parseInt(min_dist.value);
    }
    if ( prob_obs.value != "") {
        SETTINGS.PROB_OBS = parseInt(prob_obs.value);
    }
    if ( block_obs.value != "") {
        SETTINGS.BLOCK_OBS = parseInt(block_obs.value);
    }
    if ( hauteur_saut.value != "") {
        SETTINGS.HAUTEUR_SAUT = parseInt(hauteur_saut.value);
    }
    if ( time_saut.value != "") {
        SETTINGS.TIME_SAUT = parseInt(time_saut.value);
    }
    if ( vitesse_obs.value != "") {
        SETTINGS.VIT_OBS = parseInt(vitesse_obs.value);
    }
    GAME.GAME_OVER = true;
})