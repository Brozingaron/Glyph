#pragma strict

// Animates and hides additional windows like the control matrix

var background : GameObject;
var window : GameObject;
var newZ : float;

private var backgroundA : float; //The original alpha of the background
private var windowY : float; // The original height of the window

function Start () {
	// Record the new variables
	backgroundA = background.renderer.material.color.a;
	windowY = window.transform.localScale.y;
	
	// Hide the window
	Invoke("transformZ",Time.deltaTime);
}

function Show () {
	// Move the object to a visible position
	transform.position.z = newZ;
	transform.position.y = 0;
	transform.position.x = 0;
	// Reset all values
	background.renderer.material.color.a = 0;
	window.renderer.material.color.a = 0;
	window.transform.localScale.y = 0;
	
	//Tween everything
	iTween.ColorTo(background,{"a":backgroundA,"time":2,"easeType":"easeOutQuart"});
	iTween.ColorTo(window,{"a":1,"time":0.5,"easeType":"easeOutBack","includeChildren":false});
	iTween.ScaleTo(window,{"y":windowY,"time":0.5,"easeType":"easeOutBack"});
}

function Hide () {
	//Tween everything
	iTween.ColorTo(background,{"a":0,"time":0.5,"easeType":"easeInQuart"});
	iTween.ColorTo(window,{"a":0,"time":0.5,"easeType":"easeInBack","onComplete":"transformZ","onCompleteTarget":gameObject,"includeChildren":false});
	iTween.ScaleTo(window,{"y":0,"time":0.5,"easeType":"easeInBack"});
}

function transformZ () {
	//Move the object to a hidden position
	transform.position.z = -1000;
	transform.position.y = -100;
	transform.position.x = -100;
}