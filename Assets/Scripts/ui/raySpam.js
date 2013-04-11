#pragma strict

//Sends out rays every update for buttons and mouse things

var on : boolean = false; //Whether to send rays or not

function Update () {
	if (Screen.lockCursor == false){ // Cast rays if the mouse isn't locked...
		if (Screen.showCursor == true){ // ...And isn't hidden...
			if (on == true){ // ...And has been told to cast
				var hit : RaycastHit; //Define hit
				var ray = Camera.main.ScreenPointToRay(Input.mousePosition); //Make the ray at the mouse location going parallel to the camera
				if (Physics.Raycast(ray,hit)){ //Test ray collision
					hit.transform.SendMessage("onRaycastHit", SendMessageOptions.DontRequireReceiver); //Perform hit objects' function
				};
			};
		};
	};
}