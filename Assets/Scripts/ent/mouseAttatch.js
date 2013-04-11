#pragma strict

var zPos = 0; //The default Z position.
var sensitivity = 2.9;

//Define field variables
var width : float;
var xOffset : float;
var height : float;
var yOffset : float;
var diameter : float; //Margin of the player

//Define a few internal variables
private var x : float;
private var y : float;
private var xMin : float;
private var xMax : float;
private var yMin : float;
private var yMax : float;

function Start () {
	Screen.showCursor = false;
	Screen.lockCursor = true;
	//Scale sensitivity
	sensitivity = 2 * 1080 / Screen.height;
	
	//Calculate boundaries
	xMax = width / 2 + xOffset - diameter;
	xMin = -1*(width - diameter * 2) + width / 2 + xOffset - diameter;
	yMin = -1*height/2 - yOffset + diameter;
	yMax = (height - diameter*2) - height/2 - yOffset + diameter;
}

function Update () {
	x = transform.position.x + -1 * sensitivity * Input.GetAxis("Mouse X");
	y = transform.position.y + sensitivity * Input.GetAxis("Mouse Y");
	
	// Apply maximum domains
	if (x > xMax){x = xMax;};
	if (x < xMin){x = xMin;};
	if (y > yMax){y = yMax;};
	if (y < yMin){y = yMin;};
	
	// Apply the transformation
	gameObject.transform.position = Vector3(x,y,zPos);
}