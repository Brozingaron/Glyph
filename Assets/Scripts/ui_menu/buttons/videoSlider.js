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

var allRes : Resolution[];

private var revert = 0.0; // Deals with changing the texture back when not hovering

function Start () {
	allRes = Screen.resolutions; //Get ALL OF THE RESOLUTIONS
	// Define textures for settingsHelper
	if (Screen.fullScreen == true){
		hover = hoverOn;
		pressed = pressedOn;
		normal = on;
		gameObject.renderer.material.mainTexture = on;
	}
	else{
		hover = hoverOff;
		pressed = pressedOff;
		normal = off;
		gameObject.renderer.material.mainTexture = off;
	}
}
function Update () {
	// Revert button texture if needed
	if (gameObject.renderer.material.mainTexture == hoverOn || gameObject.renderer.material.mainTexture == hoverOff){
		// If the mouse has been moved...
		if ( Input.GetAxis("Mouse X") != 0 || Input.GetAxis("Mouse Y") != 0){
			// ... And if the GameObject hasn't been hit with a ray since the last frame update, revert its texture
			if (revert == 1 ){ 
				if (Screen.fullScreen == false){gameObject.renderer.material.mainTexture = off;};
				if (Screen.fullScreen == true){gameObject.renderer.material.mainTexture = on;};
			};
			/// ... Add to the timer
			revert = 1; // Frames since not been hit by a ray
		};
	};
}

function onRaycastHit () { // Function if hit by a ray
	// Change to the hover texture
	if (Screen.fullScreen == false){gameObject.renderer.material.mainTexture = hoverOff;};
	if (Screen.fullScreen == true){gameObject.renderer.material.mainTexture = hoverOn;};
	
	if (Input.GetMouseButton(0)){ // If LMouse down, changed to pressed texture
		if (Screen.fullScreen == false){gameObject.renderer.material.mainTexture = pressedOff;};
		if (Screen.fullScreen == true){gameObject.renderer.material.mainTexture = pressedOn;};
	};
	if (Input.GetMouseButtonUp(0)){ // If LMouse Up, call the Action function
		Action();
	};
	revert = 0; //Resets the timer to reset the button texture when hit by another ray
}

function Action () {
	// The function that the button calls
	// Useful for being called by external scripts
	
	if (Screen.fullScreen == false){
		// When going full screen, change the resolution to the highest supported by the monitor
		Screen.SetResolution(allRes[allRes.Length - 1].width,allRes[allRes.Length - 1].height,true);
		gameObject.renderer.material.mainTexture = on;
		off = on;
		hoverOff = hoverOn;
	}
	else{
		// When going into windowed mode, change the resolution to the highest that will fit on the desktop
		if (1080 >= allRes[allRes.Length - 1].height ){
			if (720 >= allRes[allRes.Length - 1].height ){
			Screen.SetResolution(853,480,false);
			}
			else{
			Screen.SetResolution(1280,720,false);
			}
		}
		else{
			Screen.SetResolution(1920,1080,false);
		};
		gameObject.renderer.material.mainTexture = off;
		on = off;
		hoverOn = hoverOff;
	};
	// Reload the scene
	GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = -1;
	GameObject.Find("Main Camera").GetComponent(sceneManager).change();
}