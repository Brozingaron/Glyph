#pragma strict

// This is the trapezoid of doom's movement script

var speed : float = 100; // The speed coeffecient on the enemy
var targetingTime : float = 2; // How long in seconds to spend targeting the player
var lethal : boolean = true;

private var targeting : boolean = true; // If the enemy is targeting the player or not
private var tweening : boolean = false; // If iTween has taken over yet
private var rotating : boolean = false; // If iTween should rotate the object
private var targetingT : float = 0.0; // How long the enemy has been targeting the player
private var angle : float; // The angle of rotation to the player
private var distanceTraveled : float = 0.0; // The distance this enemy has traveled
private var target : GameObject;
private var gameMan : gameManager;

function Start () {
	target = GameObject.Find("Soul");
	gameMan = GameObject.Find("gameMan").GetComponent(gameManager);
	
	// Change the targeting time if this is insane mode
	if ( Application.loadedLevel == 7 ) {
		targetingTime = 1;
	};
}

function Update () {
	if (gameMan.timeScale == 0){
		iTween.Pause(gameObject);
	}
	else{
		iTween.Resume(gameObject);
	}
	if ( targeting == true ){
		// Avoid a divide by zero error
		if ( target.transform.position.y - transform.position.y != 0 ){
			// Rotate towards the player
			angle = Mathf.Rad2Deg * Mathf.Atan((target.transform.position.x - transform.position.x) / (target.transform.position.y - transform.position.y));
			// Deal with ArcTan's domain
			// Quadrant 1 & 2
			if ( target.transform.position.y - transform.position.y > 0 ){angle = 180 - angle;};
			// Quadrant 3 & 4
			if ( target.transform.position.y - transform.position.y < 0 ){angle = 360 - angle;};
		}
		else{
			if ( target.transform.position.x - transform.position.x <= 0 ){ angle = 0; };
			if ( target.transform.position.x - transform.position.x > 0 ){ angle = 180; };
		}
		if ( tweening == true && rotating == false ){
			// If the movement tween just ended, tween the rotation
			tweening = false;
			rotating = true;
			iTween.RotateTo(gameObject,{"z":angle,"time":0.5,"easetype":"easeInQuart","oncomplete":"finishedRotating"});
		}
		if ( rotating == false ){
			// If the movement tween didn't just end, set the rotation
			transform.eulerAngles.z = angle;
		}
		// Add to the counter
		targetingT += Time.deltaTime * gameMan.timeScale;
	};
	
	if ( targetingT >= targetingTime ){
		targeting = false;
	};
	
	if ( targeting == false && tweening == false ){
		// Call an iTween function to move the enemy towards the targeted point
		iTween.MoveTo(gameObject,{
			"name":"trapezoidTween",
			"position":target.transform.position,
			"speed":speed,
			"easetype":"easeInOutQuart",
			"oncomplete":"reset"});
		tweening = true;
	};
	
	// Set boundaries
	if (transform.position.x > 69){ transform.position.x = 69; };
	if (transform.position.x < -69){ transform.position.x = -69; };
	if (transform.position.y > 26){ transform.position.y = 26; };
	if (transform.position.y < -14){ transform.position.y = -14; };
}

function reset () {
	// Go back to the targeting phase
	targeting = true;
	targetingT = 0;
}

function finishedRotating () {
	// Rotate manually when this function is called
	rotating = false;
}