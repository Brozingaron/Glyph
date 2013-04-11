#pragma strict

// Animates in new entities
// Attatch this script to the entity's sprite

function Start () {
	iTween.ScaleFrom(gameObject,{"x":0,"y":0,"easetype":"easeOutElastic","time":1}); // Zoom animation scale
	iTween.FadeFrom(gameObject,{"alpha":0,"easetype":"easeOutSine","time":0.75}); // Zoom animation fade
}