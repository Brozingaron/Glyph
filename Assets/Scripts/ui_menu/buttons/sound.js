#pragma strict

// Define some textures
var pressedOn : Texture2D;
var pressedOff : Texture2D;
var hoverOn : Texture2D;
var hoverOff : Texture2D;
var on : Texture2D;
var off : Texture2D;

// Define some textures called upon by settingsHelper
// These are changed in the Start function
var hover : Texture2D;
var pressed : Texture2D;
var normal : Texture2D;

private var revert : float;

function Start () {
	// Define textures for the button helper
	if (PlayerPrefs.GetInt("muted") == 1){
		gameObject.renderer.material.mainTexture = on;
		hover = hoverOn;
		pressed = pressedOn;
		normal = on;
	}
	else{
		gameObject.renderer.material.mainTexture = off;
		hover = hoverOff;
		pressed = pressedOff;
		normal = off;
	}
}

function Update () {
	// Revert button texture if needed
	if (gameObject.renderer.material.mainTexture == hover){
		// If the mouse has been moved...
		if ( Input.GetAxis("Mouse X") != 0 && Input.GetAxis("Mouse Y") != 0){
			// ... And if the GameObject hasn't been hit with a ray since the last frame update, revert its texture
			if (revert == 1 ){ 
				if (PlayerPrefs.GetInt("muted") == 0){gameObject.renderer.material.mainTexture = off;};
				if (PlayerPrefs.GetInt("muted") == 1){gameObject.renderer.material.mainTexture = on;};
			};
			/// ... Add to the timer
			revert = 1; // Frames since not been hit by a ray
		};
	};
}

function onRaycastHit () { // Function if hit by a ray
	// Change to the hover texture
	if (PlayerPrefs.GetInt("muted") == 0){gameObject.renderer.material.mainTexture = hoverOff;};
	if (PlayerPrefs.GetInt("muted") == 1){gameObject.renderer.material.mainTexture = hoverOn;};
	
	if (Input.GetMouseButton(0)){ // If LMouse down, changed to pressed texture
		if (PlayerPrefs.GetInt("muted") == 0){gameObject.renderer.material.mainTexture = pressedOff;};
		if (PlayerPrefs.GetInt("muted") == 1){gameObject.renderer.material.mainTexture = pressedOn;};
	};
	if (Input.GetMouseButtonUp(0)){ // If LMouse Up, change to normal texture & mute audio
		Action(); // Do stuff
	};
	revert = 0; //Resets the timer to reset the button texture when hit by another ray
}

function Action () {
	// The function that the button calls
	// Useful for being called by external scripts
	
	if (PlayerPrefs.GetInt("muted") == 0){PlayerPrefs.SetInt("muted",1);}
	else{PlayerPrefs.SetInt("muted",0);};
	// Reload the scene
	GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = -1;
	GameObject.Find("Main Camera").GetComponent(sceneManager).change();
}