#pragma strict

// Changes the screen resolution
//
// It's not just revolutionary, but we felt the need to steal Apple's second worst marketing term ever.
// In case you're wondering what it lost to, http://gizmodo.com/5942762/this-is-officially-the-dumbest-slogan-apple-has-ever-come-up-with

// Define textures
var pressedOn : Texture2D;
var pressedOff : Texture2D;
var hoverOn : Texture2D;
var hoverOff : Texture2D;
var on : Texture2D;
var off : Texture2D;
var unavailable : Texture2D;

// Some variables for the graphicsHelper
var pressed : Texture2D;
var hover : Texture2D;
var normal : Texture2D;
var disabled : boolean;

private var revert = 0.0; // Deals with changing the texture back when not hovering

var newRes : int = 1080; //New resolution (horizontally)
var allRes : Resolution[];
private var current : boolean; //If this resolution is the current one
private var invalid : boolean; //If this resolution cannot be displayed by the current monitor
private var fullscreen : boolean; //If this resolution needs to run fullscreen to fit on the monitor

function Start (){
	//Get all supported resolutions
	allRes = Screen.resolutions;
	
	//See if this resolution is the current one
	if( Screen.height == newRes ){
		current = true;
		pressed = pressedOn;
		hover = hoverOn;
		normal = on;
	}
	else{
		current = false;
		pressed = pressedOff;
		hover = hoverOff;
		normal = off;
	};
	
	// See if the game is running at native resolution
	if( newRes == 0 && Screen.height == allRes[allRes.Length - 1].height ){current = true;};
	
	//See if the monitor is compatible with this resolution
	if( newRes > allRes[allRes.length - 1].height ){
		invalid = true;
		gameObject.renderer.material.mainTexture = unavailable;
		disabled = true;
	}
}

function Update () {
	// Revert button texture if needed
	if (gameObject.renderer.material.mainTexture == hoverOn && invalid == false || gameObject.renderer.material.mainTexture == hoverOff && invalid == false){
		// If the mouse has been moved...
		if ( Input.GetAxis("Mouse X") != 0 && Input.GetAxis("Mouse Y") != 0){
			// ... And if the GameObject hasn't been hit with a ray since the last frame update, revert its texture
			if (revert == 1 ){ 
				if (current == true){gameObject.renderer.material.mainTexture = on;};
				if (current == false){gameObject.renderer.material.mainTexture = off;};
			};
			/// ... Add to the timer
			revert = 1; // Frames since not been hit by a ray
		};
	};
}

function onRaycastHit () { // Function if hit by a ray
	if (invalid == false){ // Don't do anything if this resolution won't work
		if (current == true){gameObject.renderer.material.mainTexture = hoverOn;}; //Change to the hover texture
		if (current == false){gameObject.renderer.material.mainTexture = hoverOff;};
		if (Input.GetMouseButton(0)){ // If LMouse down
			if (current == true){gameObject.renderer.material.mainTexture = pressedOn;}; //Change to the pressed texture
			if (current == false){gameObject.renderer.material.mainTexture = pressedOff;};
		};
		if (Input.GetMouseButtonUp(0) && current == false){ // If LMouse Up & this isn't the current resolution...
			// ... Call the Action function
			Action();
		};
		revert = 0; //Resets the timer to reset the button texture when hit by another ray
	};
}

function Action () {
	// The function that the button calls
	// Useful for being called by external scripts
		
	//See if this resolution needs to be fullscreen while keeping the current state if possible
	if( newRes >= allRes[allRes.Length - 1].height ){fullscreen = true;}
	else{ fullscreen = Screen.fullScreen; };
	
	// Change the resolution
	if (newRes == 1080){Screen.SetResolution(1920,1080,fullscreen);};
	if (newRes == 720){Screen.SetResolution(1280,720,fullscreen);};
	if (newRes == 576){Screen.SetResolution(1024,576,fullscreen);};
	if (newRes == 0){Screen.SetResolution(allRes[allRes.Length - 1].width,allRes[allRes.Length - 1].height,true);};
	
	if (current == true){gameObject.renderer.material.mainTexture = on;}; //Change to the normal texture
	if (current == false){gameObject.renderer.material.mainTexture = off;};
	
	// Reload the scene
	GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = -1;
	GameObject.Find("Main Camera").GetComponent(sceneManager).change();
}