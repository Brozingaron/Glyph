#pragma strict

// This script allows the player to move using arrow keys and WASD

var sensitivity : int; //How fast the player moves

// Define some variables
private var z : float;
private var transformVector : Vector3;
private var gameMan : gameManager;

function Start () {
	Screen.showCursor = false;
	Screen.lockCursor = true;

	gameMan = GameObject.Find("gameMan").GetComponent(gameManager);
	z = gameObject.transform.position.z;
}

function Update () {
	if (Screen.lockCursor == true){
		// Clear the transform vector
		transformVector = Vector3(0,0,0);
		
		// Add to the transform vector
		if(Input.GetKey(PlayerPrefs.GetString("upKey")) || Input.GetKey(PlayerPrefs.GetString("upKeyAlt"))){
			transformVector += Vector3(0,1,0);
		};
		if(Input.GetKey(PlayerPrefs.GetString("downKey")) || Input.GetKey(PlayerPrefs.GetString("downKeyAlt"))){
			transformVector += Vector3(0,-1,0);
		};
		if(Input.GetKey(PlayerPrefs.GetString("leftKey")) || Input.GetKey(PlayerPrefs.GetString("leftKeyAlt"))){
			transformVector += Vector3(1,0,0);
		};
		if(Input.GetKey(PlayerPrefs.GetString("rightKey")) || Input.GetKey(PlayerPrefs.GetString("rightKeyAlt"))){
			transformVector += Vector3(-1,0,0);
		};
		
		// Give the vector a consistent length
		transformVector = sensitivity * gameMan.timeScale * Time.deltaTime * Vector3.Normalize(transformVector) + Vector3(0,0,z);
		
		// Apply the transformation
		gameObject.transform.position = transformVector + gameObject.transform.position;
	};
}