#pragma strict

// This script is for all entities that move towards the player in a straight line
// It also deals with animation delays

var lethal : boolean = false; //Don't kill the player... Yet.
var t : float = 0.0;
var speed : float = 1;

// A few private variables
private var speedCoefficient : float = 0; //Used in tweening the initial velocity
private var target : GameObject;

// Define some variables to be used in maths
private var deltaX : int = 0.0;
private var deltaY : int = 0.0;
private var deltaVector : Vector3;
private var enDeath : enemyDeath;

// Static Z position
var Z : int = 0;

function Start () {
	enDeath = gameObject.GetComponent(enemyDeath);
	target = GameObject.Find("Soul"); // Find the victim
	// Gradually start moving
	iTween.ValueTo(gameObject,{"from":0,"to":1,"easetype":"easeOutQuint","Time":1,"delay":0,"onupdate":"speedCoefficientTween","onupdateparams":"float"});
}

function Update () {
	// Counter to delay being lethal until after the animation
	if ( lethal == false ){
		t += Time.deltaTime;
		if ( t >= 1.25 ){
			lethal = true; // Start doing things
		}
	}
	if ( lethal == true ){		
		// Calculate the vector components
		deltaX = target.transform.position.x - transform.position.x;
		deltaY = target.transform.position.y - transform.position.y;
		
		// Calculate the delta vector from a Unit Vector for a constant speed
		deltaVector = Time.deltaTime * speed * Vector3.Normalize(Vector3(deltaX,deltaY,Z));
		
		transform.position = Vector3(transform.position.x,transform.position.y,0) + ( speedCoefficient * deltaVector);
	};
	if ( lethal == null ){
		// Time the destruction
		if ( t > 1.25 ){
			Destroy(gameObject); //Destroy the object after its death animation completes
		};
	};
	// Set boundaries
	if (transform.position.x > 92){ transform.position.x = 92; };
	if (transform.position.x < -92){ transform.position.x = -92; };
	if (transform.position.y > 43){ transform.position.y = 43; };
	if (transform.position.y < -36){ transform.position.y = -36; };
	// Kill this enemy if its out of bounds and has a negative speed coefficient
	if(transform.position.x >= 92 || transform.position.x <= -92 || transform.position.y >= 43 || transform.position.y <= -36 && speedCoefficient != 1){
		enDeath.health = 0;
		speedCoefficient = 0;
	}
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