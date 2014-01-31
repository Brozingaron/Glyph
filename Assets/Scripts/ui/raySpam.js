#pragma strict

//Sends out rays every update for buttons and mouse things

var on : boolean = false; //Whether to send rays or not

function Start () {
	// Wait for animations to finish before activating
	if (on == true){
		on = false;
		Invoke("Activate",0.5);
	};
}

function Update () {
	// Cast rays if the mouse isn't locked or hidden and this object has been told to cast rays
	if (Screen.lockCursor == false && Screen.showCursor == true && on == true){
		var hit : RaycastHit; //Define hit
		var ray = Camera.main.ScreenPointToRay(Input.mousePosition); //Make the ray at the mouse location going parallel to the camera
		if (Physics.Raycast(ray,hit)){ //Test ray collision
			hit.transform.SendMessage("onRaycastHit", SendMessageOptions.DontRequireReceiver); //Perform hit object's function
		};
	};
}

function Activate () {
	on = true;
}

function Deactivate () {
	on = false;
}

function OnApplicationFocus (focus : boolean){
	if (focus){
		Activate();
	}
	else{
		Deactivate();
	};
}