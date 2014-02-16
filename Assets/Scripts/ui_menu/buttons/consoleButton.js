#pragma strict

// This script changes if the console is enabled or not

// Define textures
var pressedOn : Texture2D;
var pressedOff : Texture2D;
var hoverOn : Texture2D;
var hoverOff : Texture2D;
var on : Texture2D;
var off : Texture2D;

// Some variables for the controlsHelper
var pressed : Texture2D;
var hover : Texture2D;
var normal : Texture2D;

// Define some variables related to the status of the button
private var revert : int = 0;
private var status : boolean = false;

function Start () {
	// Set some variables based on the current setting
	if ( PlayerPrefs.GetInt("consoleEnabled") == 1 ){
		pressed = pressedOn;
		hover = hoverOn;
		normal = on;
		gameObject.renderer.material.mainTexture = on;
		status = true;
	}
	else{
		pressed = pressedOff;
		hover = hoverOff;
		normal = off;
		gameObject.renderer.material.mainTexture = off;
		status = false;
	};
}

function Update () {
	// Revert button texture if needed
	if (gameObject.renderer.material.mainTexture == hoverOn || gameObject.renderer.material.mainTexture == hoverOff){
		// And if the mouse has been moved...
		if ( Input.GetAxis("Mouse X") != 0 && Input.GetAxis("Mouse Y") != 0){
			// ... And if the GameObject hasn't been hit with a ray since the last frame update, revert its texture
			if (revert == 1 ){ 
				if ( status == true ){
					gameObject.renderer.material.mainTexture = on;
				}
				else{
					gameObject.renderer.material.mainTexture = off;
				};
			};
			// ... Add to the timer
			revert = 1; // Frames since not been hit by a ray
		};
	};
}

function onRaycastHit () { // Function if hit by a ray
	//Change material to hover
	if ( status == true ){
		gameObject.renderer.material.mainTexture = hoverOn;
	}
	else{
		gameObject.renderer.material.mainTexture = hoverOff;
	};
	
	if (Input.GetMouseButton(0)){ // If LMouse down
		// Change to the pressed texture
		if ( status == true ){
			gameObject.renderer.material.mainTexture = pressedOn;
		}
		else{
			gameObject.renderer.material.mainTexture = pressedOff;
		};
	};
	if (Input.GetMouseButtonUp(0)){ // If LMouse Up
		//Change to the normal texture
		if (status == true){
			gameObject.renderer.material.mainTexture = on;
		}
		else{
			gameObject.renderer.material.mainTexture = off;
		}
		Action(); // Do stuff
	};
	revert = 0; //Resets the timer to reset the button texture when hit by another ray
}

function Action () {
	// The function that the button calls
	// Useful for being called by external scripts
	
	// Toggle the setting
	if ( PlayerPrefs.GetInt("consoleEnabled") != 1 ){
		PlayerPrefs.SetInt("consoleEnabled",1);
	}
	else{
		PlayerPrefs.SetInt("consoleEnabled",0);
	}
	
	// Tell Scene Manager to reload this scene
	GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = -1;
	GameObject.Find("Main Camera").GetComponent(sceneManager).change(); //Tell Scene Manager to change the level
}