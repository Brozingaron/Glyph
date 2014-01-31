#pragma strict

// This is the player's motion script
// It deals with attaching the player to the mouse

var zPos = 0; //The default Z position.
var sensitivity = 2.9;

// Define a few internal variables
private var x : float;
private var y : float;
private var xMin : float;
private var xMax : float;
private var yMin : float;
private var yMax : float;
private var gameMan : gameManager;

function Start () {
	Screen.showCursor = false;
	Screen.lockCursor = true;
	// Scale sensitivity
	sensitivity = 2 * 1080 / Screen.height;
	
	// Find the Game Manager
	gameMan = GameObject.Find("gameMan").GetComponent(gameManager);
	
	// Use Minimal particle effects
	if (PlayerPrefs.GetInt("minimalParticles") == 1){
		GameObject.Find("Trail").particleSystem.Stop();
		GameObject.Find("hex").particleSystem.startLifetime = 0;
		GameObject.Find("hex").particleSystem.startSize = 0;
		GameObject.Find("hex2").particleSystem.startLifetime = 0;
		GameObject.Find("hex2").particleSystem.startSize = 0;
		GameObject.Find("ring").particleSystem.startLifetime = 0;
		GameObject.Find("ring").particleSystem.startSize = 0;
		GameObject.Find("ring2").particleSystem.startLifetime = 0;
		GameObject.Find("ring2").particleSystem.startSize = 0;
	};
}

function Update () {
	x = transform.position.x + -1 * sensitivity * gameMan.timeScale * Input.GetAxis("Mouse X");
	y = transform.position.y + sensitivity * gameMan.timeScale * Input.GetAxis("Mouse Y");
	
	// Apply the transformation
	gameObject.transform.position = Vector3(x,y,zPos);
}