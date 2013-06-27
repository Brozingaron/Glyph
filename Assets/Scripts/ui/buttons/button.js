#pragma strict

// Generic button script
// Also interacts with mouseovers

var sceneToSelf : boolean = true;
var sceneTo : int = 0;

// Define a few textures for the button
var pressed : Texture2D;
var hover : Texture2D;
var normal : Texture2D;
private var revert : int = 0; // Deals with changing the texture back when not hovering

function Update () {
	// Revert button texture if needed
	if (gameObject.renderer.material.mainTexture == hover){
		// If the mouse has been moved...
		if ( Input.GetAxis("Mouse X") != 0 && Input.GetAxis("Mouse Y") != 0){
			// ... And if the GameObject hasn't been hit with a ray since the last frame update, revert its texture
			if (revert == 1 ){ 
				gameObject.renderer.material.mainTexture = normal;
			};
			/// ... Add to the timer
			revert = 1; // Frames since not been hit by a ray
		};
	};
}

function onRaycastHit () { // Function if hit by a ray
	gameObject.renderer.material.mainTexture = hover; //Change material to hover
	if (Input.GetMouseButton(0)){ // If LMouse down
		gameObject.renderer.material.mainTexture = pressed; //Change material to pressed
	};
	if (Input.GetMouseButtonUp(0)){ // If LMouse Up
		gameObject.renderer.material.mainTexture = normal; //Change material to default
		Action(); // Do stuff
	};
	revert = 0; //Resets the timer to reset the button texture when hit by another ray
}

function Action () {
	// The function that the button calls
	// Useful for being called by external scripts
	
	// Tell Scene Manager what to do
	// Should the button reset the scene or change it?
	if (sceneToSelf == true){
		GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = -1;
	}
	else {
		GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = sceneTo;
	};
	GameObject.Find("Main Camera").GetComponent(sceneManager).change(); //Tell Scene Manager to change the level
}