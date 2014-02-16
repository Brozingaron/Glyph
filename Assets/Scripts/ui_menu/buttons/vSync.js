#pragma strict

// vSync button

// Define textures
var pressedOn : Texture2D;
var pressedOff : Texture2D;
var hoverOn : Texture2D;
var hoverOff : Texture2D;
var on : Texture2D;
var off : Texture2D;

// Some variables for the graphicsHelper
var pressed : Texture2D;
var hover : Texture2D;
var normal : Texture2D;
var disabled : boolean;

private var revert = 0.0; // Deals with changing the texture back when not hovering

var state : boolean = false; //If vSync is on or not

function Start () {
	if (QualitySettings.vSyncCount > 0){
		state = true;
	};
	if (state == false){
		gameObject.renderer.material.mainTexture = off;
		pressed = pressedOff;
		hover = hoverOff;
		normal = off;
	};
	if (state == true){
		gameObject.renderer.material.mainTexture = on;
		pressed = pressedOn;
		hover = hoverOn;
		normal = on;
	};
}

function Update () {
	// Revert button texture if needed
	if (gameObject.renderer.material.mainTexture == hoverOn || gameObject.renderer.material.mainTexture == hoverOff){
		// If the mouse has been moved...
		if ( Input.GetAxis("Mouse X") != 0 || Input.GetAxis("Mouse Y") != 0){
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
	if (state == true){gameObject.renderer.material.mainTexture = hoverOn;}; //Change to the hover texture
	if (state == false){gameObject.renderer.material.mainTexture = hoverOff;};
	if (Input.GetMouseButton(0)){ // If LMouse down
		if (state == true){gameObject.renderer.material.mainTexture = pressedOn;}; //Change to the pressed texture
		if (state == false){gameObject.renderer.material.mainTexture = pressedOff;};
	};
	if (Input.GetMouseButtonUp(0)){ // If LMouse Up, call the Action function
		Action();
	};
	revert = 0; //Resets the timer to reset the button texture when hit by another ray
}

function Action () {
	// The function that the button calls
	// Useful for being called by external scripts
	
	// Toggle Vsync
	if (state == true){
		gameObject.renderer.material.mainTexture = on; // reset the texture
		QualitySettings.vSyncCount = 0; //disable aniso filtering
	}
	else{
		gameObject.renderer.material.mainTexture = off; // reset the texture
		QualitySettings.vSyncCount = 1; //enable aniso filtering
	};
	
	// Reload the scene
	GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = -1;
	GameObject.Find("Main Camera").GetComponent(sceneManager).change();
}