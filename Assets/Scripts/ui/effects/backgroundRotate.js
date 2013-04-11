#pragma strict

var velocityMin : float = 0;
var velocityMax : float = 1;
var clockwise : boolean;
var velocity : float;

function Start (){
	//Generate a random velocity
	velocity = Random.Range(velocityMin,velocityMax);
}

function Update () {	
	//Initiate rotation
	if (clockwise == true){
		transform.Rotate(Vector3.up * velocity * Time.deltaTime); //Clockwise rotation around Z axis at 1/velocity units per second
	}
	else{
		transform.Rotate(-1 * Vector3.up * velocity * Time.deltaTime); //Counterclockwise rotation around Z axis at 1/velocity units per second
	}
}

/* function Update () {
	//Reset the rotation when it passes 360 degrees while retaining any extra rotation
	if (transform.Rotate.Z >= 360){transform.Rotate.Z += -360;};
	if (transform.Rotate.Z <= -360){transform.Rotate.Z += 360;};
} */