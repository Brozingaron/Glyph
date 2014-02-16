#pragma strict

//Makes the background move inversley to the cursor or player

// The maximum position (+/-) that the background can move across an axis
private var xMax : float = 5;
private var yMax : float = 5;
private var zPos : int = 150; // Keep the Z position constant in the background

private var velocity : float = 20; // 1 / Max speed of the background

// Define the variables for the new background position from the origin
private var xPos = 0.0;
private var yPos = 0.0;
private var xDelta = 0.0;
private var yDelta = 0.0;

// Define the variable for the player as fallback
private var player : GameObject;

function Start () {
	// Look for the player
	OnLevelWasLoaded();
}

function Update () {
	
	// Calculate the X and Y positions
	if (Screen.lockCursor == false){
		// Use the mouse position if the cursor isn't locked & hidden
		xPos = ( Input.mousePosition.x - ( Screen.width / 2 ) ) / ( Screen.width / xMax );
		yPos = -1 * ( Input.mousePosition.y - ( Screen.height / 2 ) ) / ( Screen.height / yMax );
	}
	else{
		// If the cursor is locked, use the player's position instead
		xPos = -1 * player.transform.position.x / velocity;
		yPos = -1 * player.transform.position.y / velocity;
	}
	
	// Calculate movements with a velocity of 1/velocity units per second
	xDelta = transform.position.x + ( xPos * Time.deltaTime / velocity);
	yDelta = transform.position.y + ( yPos * Time.deltaTime / velocity);
	
	// Apply the transformation
	gameObject.transform.position = Vector3(xDelta,yDelta,zPos);
	
	// Apply maximum domains
	if ( transform.position.x > xMax ){
		transform.position.x = xMax;
	};
	if ( transform.position.x < -xMax ){
		transform.position.x = -xMax;
	};
	if ( transform.position.y > yMax ){
		transform.position.y = yMax;
	};
	if ( transform.position.y < -yMax ){
		transform.position.y = -yMax;
	};
}

function OnLevelWasLoaded() {
	// Whenever the scene changes, look for the player
	if ( GameObject.Find("Soul") != null ){
		player = GameObject.Find("Soul");
		// If it's found, bind it to a variable
	}
	else{
		player = null;
		// Otherwise, set the variable to null
	};
}