#pragma strict

// This script is for all entities that move towards the player in a straight line
// It also deals with hiding the score bar for enemies

var lethal : boolean = false; //Don't kill the player... Yet.
var t : float = 0.0;
var speed : float = 0.75;
var speedRandomness : float = 0.5;
var progressionCoeffecient : float = 0.005;

// A few private variables
private var speedCoefficient : float = 0; //Used in tweening the initial velocity
private var target : GameObject;
private var gameMan : gameManager;
private var moving : boolean; // If the object has moved for 0.5 seconds
private var lifetime : float;

// Define some variables to be used in maths
private var deltaX : int = 0.0;
private var deltaY : int = 0.0;
private var deltaVector : Vector3;
private var enDeath : enemyDeath;

// Static Z position
var Z : int = 0;

function Start () {
	speed = speed + Random.Range(0,speedRandomness) * speed;
	enDeath = gameObject.GetComponent(enemyDeath);
	target = GameObject.Find("Soul"); // Find the victim
	gameMan = GameObject.Find("gameMan").GetComponent(gameManager); // Find the game manager
	// Gradually start moving
	iTween.ValueTo(gameObject,{"from":0,"to":1,"easetype":"easeOutQuint","Time":1,"delay":0,"onupdate":"speedCoefficientTween","onupdateparams":"float"});
	
	// Use Minimal particle effects
	if (PlayerPrefs.GetInt("minimalParticles") == 1){
		transform.FindChild("Trail").particleSystem.Stop();
	};
}

function Update () {
	lifetime += Time.deltaTime;
	// Counter to delay being lethal until after the animation
	if ( lethal == false || moving == false){
		t += Time.deltaTime * gameMan.timeScale;
		if ( t >= 1.25 ){
			lethal = true; // Start doing things
		};
		if ( t >= 1.5 ){
			moving = true;
		};
	}
	if ( lethal == true ){		
		// Calculate the vector components
		deltaX = target.transform.position.x - transform.position.x;
		deltaY = target.transform.position.y - transform.position.y;
		
		// Calculate the delta vector from a Unit Vector for a constant speed
		deltaVector = Time.deltaTime * speed * Vector3.Normalize(Vector3(deltaX,deltaY,Z));
		
		transform.position = Vector3(transform.position.x,transform.position.y,0) + ( ( speedCoefficient + lifetime * progressionCoeffecient) * deltaVector * gameMan.timeScale);
	};
	// Set boundaries
	if (transform.position.x > 92){ transform.position.x = 92; };
	if (transform.position.x < -92){ transform.position.x = -92; };
	if (transform.position.y > 43){ transform.position.y = 43; };
	if (transform.position.y < -36){ transform.position.y = -36; };
	// Kill this enemy if it is live, out of bounds, and has a negative speed coefficient
	if(transform.position.x >= 92 || transform.position.x <= -92 || transform.position.y >= 43 || transform.position.y <= -36 && speedCoefficient < -.2){
		enDeath.health = 0;
		speedCoefficient = 0;
	};
}

function push (distance : float, pushSpeed : float, easeType : String){
	// The variable distance is actually how long (time) the enemy will be pushed back
	// Yes that's confusing
	// Distance should be between ~ 0.1 and 1 and NOT NEGATIVE. Time travel requires Unity Pro.
	// Speed should be negative
	
	// Set the speed coefficient to a negative value
	iTween.ValueTo(gameObject,{"from":0,"to":-1 * pushSpeed,"easetype":easeType,"Time":distance,"delay":0,"onupdate":"speedCoefficientTween","onupdateparams":"float"});
	// Reset the coefficient to 1 after a delay
	iTween.ValueTo(gameObject,{"from":-1 * pushSpeed,"to":1,"time":0.1,"easetype":"easeInBack","delay":distance,"onupdate":"speedCoefficientTween","onupdateparams":"float"});
}

function speedCoefficientTween (newVal : float) {
	speedCoefficient = newVal;
}