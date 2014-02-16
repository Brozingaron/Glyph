#pragma strict

// Transforms enemies into bosses
// I hear it's actually quite painful

var spriteObject : GameObject; // Define the sprite object to change its color
var particleObject : GameObject; // Define the particle system object to disable it

// Whether the transformation has begun
private var initiated : boolean = false;

function Start () {

}

function Update () {
	if ( GameObject.Find("bossSpawn") != null && initiated == false ){
		initiated = true; // Don't repeat these steps
		
		// Make this enemy non-lethal
		if ( GetComponent(linearFollow) != null ) { GetComponent(linearFollow).lethal = false; };
		
		particleObject.particleSystem.enableEmission = false;
		
		// Tween this enemy to the object
		iTween.MoveTo(gameObject,{
			"position":GameObject.Find("bossSpawn").transform.position,
			"time":0.7,
			"easetype":"EaseOutElastic",
			"oncomplete":"Morph"});
		// Fade it out a little bit
		iTween.ColorTo(spriteObject,{
			"a":0.5,
			"time":7,
			"easetype":"easeInQuart"});
	};
}

function Morph () {
	// This function calls the suicide function on enemy death
	// It has its own function to be called from iTween
	GetComponent(enemyDeath).suicide();
}

// The more I write this script, the darker it gets