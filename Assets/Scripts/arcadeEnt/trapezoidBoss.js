#pragma strict

// This is the trapezoid of doom's movement script

var speed : float = 5; // The maximum speed of the enemy
var acceleration : float = 12; // The acceleration of the enemy in units/s/s
var decceleration : float = -20; // The rate of decceleration of the enemy in units/s/s
var targetingTime : float = 2; // How long in seconds to spend targeting the player
var lethal : boolean = true;

private var velocity : float; //How fast the object should be moving
private var accelerating : boolean = true; //If the enemy is accelerating or deccelerating
private var targeting : boolean = true; // If the enemy is targeting the player or not
private var targetingT : float = 0.0; // How long the enemy has been targeting the player
var angle : float; // The angle of rotation to the player
private var rotationTweened : boolean = false; //Has the object finished initially rotating?
private var targetedAngle : float; // the angle to move towards the player
private var target : GameObject;
private var gameMan : gameManager;
private var t : float;

function Start () {
	target = GameObject.Find("Soul");
	gameMan = GameObject.Find("gameMan").GetComponent(gameManager);
	
	// Change the targeting time if this is insane mode
	if ( Application.loadedLevel == 7 ) {
		targetingTime = 1;
	};
}

function Update () {
	if ( targeting == true ){
		// Calculate the angle between this object and the player
		
		// Avoid a divide by zero error
		if ( target.transform.position.y - transform.position.y != 0 ){
			// Rotate towards the player
			angle = Mathf.Rad2Deg * Mathf.Atan((target.transform.position.x - transform.position.x) / (target.transform.position.y - transform.position.y));
			// Deal with ArcTan's domain
			// Quadrant 1 & 2
			if ( target.transform.position.y - transform.position.y > 0 ){angle = 180 - angle;};
			// Quadrant 3
			if ( target.transform.position.y - transform.position.y < 0 && target.transform.position.x - transform.position.x < 0 ){angle = 360 - angle;};
			// Quadrant 4
			if ( target.transform.position.y - transform.position.y < 0 && target.transform.position.x - transform.position.x > 0 ){angle = -1 * angle;};
		}
		else{
			if ( target.transform.position.x - transform.position.x <= 0 ){ angle = 0; };
			if ( target.transform.position.x - transform.position.x > 0 ){ angle = 180; };
		};
		
		if ( targetingT >= 2 ){
			targetedAngle = angle;
		}
		
		// Gradually rotate towards the player
		if ( rotationTweened == false ){
			velocity = targetingT * 2 ; //Speed up
			
			// Stop the acceleration after 1 the velocity reaches 1
			if ( velocity >= 1 ){
				rotationTweened = true;
				velocity = 1;
			};
		};
		
		// Set the rotation
		transform.Rotate(Vector3.forward * velocity * ( angle - transform.eulerAngles.z ) * gameMan.timeScale);
		
		
		// Add to the counter
		targetingT += Time.deltaTime * gameMan.timeScale;
		
		if ( targetingT >= targetingTime ){
			targeting = false;
			targetedAngle = angle;
		};
	};
	
	if ( targeting == false ){
		t += Time.deltaTime * gameMan.timeScale;
		
		// Use a piecewise function to tween velocity based on the integral of a = acceleration
		if ( accelerating == true ){
			velocity = acceleration * t; //Speed up
		};
		if ( velocity >= speed && accelerating == true ){
			t = 0;
			velocity = speed;
			accelerating = false;
		};
		if ( accelerating == false ){
			velocity = decceleration * t + speed; //Slow down
		};
			
		transform.position += velocity * Vector3.Normalize( Vector3(Mathf.Sin(targetedAngle * Mathf.Deg2Rad), -1 * Mathf.Cos(targetedAngle * Mathf.Deg2Rad), 0)) * gameMan.timeScale;		
		if ( velocity <= 0 && accelerating == false ){
			t = 0;
			accelerating = true;
			targeting = true;
			targetingT = 0;
			rotationTweened = false;
		};
	};
	
	// Set boundaries
	if (transform.position.x > 80){ transform.position.x = 80; };
	if (transform.position.x < -80){ transform.position.x = -80; };
	if (transform.position.y > 30){ transform.position.y = 30; };
	if (transform.position.y < -20){ transform.position.y = -20; };
}