#pragma strict

// This script helps to invoke the header's outOfTheWay fade in and out functions
// This works by changing the number of entities in the way

// Find the header
private var header : outOfTheWay;
// Determines if this entitity was causing the bar to be faded
private var fader : boolean = false;

function Start() {
	header = GameObject.Find("ScoreHeader").GetComponent(outOfTheWay); // Find the score header
}

function Update() {
	// Hide the score bar if necessary
	if (gameObject.transform.position.y >= header.bottomBoundary && gameObject.transform.position.x < header.leftBoundary && gameObject.transform.position.x > header.rightBoundary){
		if (fader == false){
			header.count += 1;
			fader = true;
		};
	}
	else{
		// Fade it in if  necessary
		if (fader == true){
			header.count += -1;
			fader = false;
		};
	};
}