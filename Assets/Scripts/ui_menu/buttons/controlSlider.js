#pragma strict

// Define some textures
var pressedOn : Texture2D;
var pressedOff : Texture2D;
var hoverOn : Texture2D;
var hoverOff : Texture2D;
var on : Texture2D;
var off : Texture2D;

// Define some textures called upon by the settingsHelper
// These are changed in the Start function
var hover : Texture2D;
var pressed : Texture2D;
var normal : Texture2D;

private var revert = 0.0; // Deals with changing the texture back when not hovering
private var state : boolean = true; // State of the switch. True is right, False is left

function Start () {
	if (PlayerPrefs.GetInt("Hand") == null || PlayerPrefs.GetInt("Hand") >= 2 || PlayerPrefs.GetInt("Hand") <= 0 ){ //Define the hand preference if it isn't already
		PlayerPrefs.SetInt("Hand",0); //0 is right handed, 1 is left handed
	};
	// Read preference and define textures for settingsHelper
	if (PlayerPrefs.GetInt("Hand") == 0){
		state = true;
		hover = hoverOn;
		pressed = pressedOn;
		normal = on;
		gameObject.renderer.material.mainTexture = on;
	};
	if (PlayerPrefs.GetInt("Hand") == 1){
		state = false;
		hover = hoverOff;
		pressed = pressedOff;
		normal = off;
		gameObject.renderer.material.mainTexture = off;
	};
}

function Update () {
	// Revert button texture if needed
	if (gameObject.renderer.material.mainTexture == hoverOn || gameObject.renderer.material.mainTexture == hoverOff){
		// If the mouse has been moved...
		if ( Input.GetAxis("Mouse X") != 0 && Input.GetAxis("Mouse Y") != 0){
			// ... And if the GameObject hasn't been hit with a ray since the last frame update, revert its texture
			if (revert == 1 ){ 
				if (state == false){gameObject.renderer.material.mainTexture = off;};
				if (state == true){gameObject.renderer.material.mainTexture = on;};
			};
			/// ... Add to the timer
			revert = 1; // Frames since not been hit by a ray
		};
	};
}

function onRaycastHit () { // Function if hit by a ray
	// Change to the hover texture
	if (state == false){gameObject.renderer.material.mainTexture = hoverOff;};
	if (state == true){gameObject.renderer.material.mainTexture = hoverOn;};
	
	if (Input.GetMouseButton(0)){ // If LMouse down, changed to pressed texture
		if (state == false){gameObject.renderer.material.mainTexture = pressedOff;};
		if (state == true){gameObject.renderer.material.mainTexture = pressedOn;};
	};
	if (Input.GetMouseButtonUp(0)){ // If LMouse Up, change the Action function
		Action();
	};
	revert = 0; //Resets the timer to reset the button texture when hit by another ray
}

function Action () {
	// The function that the button calls
	// Useful for being called by external scripts
	
	if (state == false){
		PlayerPrefs.SetInt("Hand",1);
		gameObject.renderer.material.mainTexture = on;
		off = on;
		hoverOff = hoverOn;
	}
	else{
		PlayerPrefs.SetInt("Hand",0);
		gameObject.renderer.material.mainTexture = off;
		on = off;
		hoverOn = hoverOff;
	};
	// Reload the scene
	GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = -1;
	GameObject.Find("Main Camera").GetComponent(sceneManager).change();
}