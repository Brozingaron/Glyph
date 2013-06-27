#pragma strict

// Define a few textures for the button
var pressed : Texture2D;
var hover : Texture2D;
var normal : Texture2D;
private var revert = 0.0; // Deals with changing the texture back when not hovering

// What should this button do?
var quit : boolean = false;
var reset : boolean = false;
var resume : boolean = true;

function Update () {
	if (revert > Time.deltaTime){ // If the GameObject hasn't been hit with a ray since the last frame, revert its texture
		gameObject.renderer.material.mainTexture = normal;
	}
	else {
		revert += Time.deltaTime; // Time since not been hit by a ray
	};
}

function onRaycastHit () { // Function if hit by a ray
	gameObject.renderer.material.mainTexture = hover; //Change material to hover
	if (Input.GetMouseButton(0)){ // If LMouse down
		gameObject.renderer.material.mainTexture = pressed; //Change material to pressed
	};
	if (Input.GetMouseButtonUp(0)){ // If LMouse Up
		gameObject.renderer.material.mainTexture = normal; //Change material to default
		if (resume == true){
			GameObject.Find("Paused").GetComponent(pauseGUI).hide(); //Go back to what you were doing before
		};
		if (quit == true){
			GameObject.Find("Paused").GetComponent(pauseGUI).goAway(); // Animate the GUI away
			GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = 1; //Go back to the main menu
			GameObject.Find("Main Camera").GetComponent(sceneManager).change(); //Tell Scene Manager to change the level
		};
		if (reset == true){
			GameObject.Find("Paused").GetComponent(pauseGUI).goAway(); // Animate the GUI away
			GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = -1; // Reload the level
			GameObject.Find("Main Camera").GetComponent(sceneManager).change(); // Tell the Scene Manager to change the level
		};
	};
	revert = 0; //Resets the timer to reset the button texture when hit by another ray
}