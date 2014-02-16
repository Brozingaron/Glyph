#pragma strict

// This is a button script to open and close windows

var close : boolean; //Should this button open or close the window?
var target : additionalWindow; // The window this button affects

// Define a few textures for the button
var pressed : Texture2D;
var hover : Texture2D;
var normal : Texture2D;
private var revert : int = 0; // Deals with changing the texture back when not hovering

function Update () {
	// Revert button texture if needed
	if (gameObject.renderer.material.mainTexture == hover){
		// And if the mouse has been moved...
		if ( Input.GetAxis("Mouse X") != 0 || Input.GetAxis("Mouse Y") != 0){
			// ... And if the GameObject hasn't been hit with a ray since the last frame update, revert its texture
			if (revert == 1 ){ 
				gameObject.renderer.material.mainTexture = normal;
			};
			// ... Add to the timer
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
	
	if ( close == true ) {
		target.Hide();
	}
	else{
		target.Show();
	};
}