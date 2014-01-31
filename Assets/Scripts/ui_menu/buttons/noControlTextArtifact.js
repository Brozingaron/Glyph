#pragma strict

// Disables the GUI layer of the main camera to prevent text artifacts
// when loading the control setting scene.

function Start () {
	//Disable the GUI Layer
	GameObject.Find("Main Camera").GetComponent(GUILayer).enabled = false;
	
	//Turn it back on in the next frame
	Invoke("Activate",Time.deltaTime);
}

function Activate () {
	//Reactivate the GUI layer
	GameObject.Find("Main Camera").GetComponent(GUILayer).enabled = true;
	
	//This script is no longer needed
	Destroy(this);
}