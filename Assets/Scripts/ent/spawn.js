#pragma strict

// This script spawns enemies
// Attach this script to the object it should be parented to

// Define the prefabs for the objects that spawn
var square : GameObject;

// Define spawning variables
var spawnRate : float = 50; // seconds per enemy spawn
var spawnRateRandPercent : float = .20; //Percent of how random the spawning should be

// Define field dimensions
var height : float = 42.15;
var width : float = 94.4;
var vOffset : float = 3.03;
var margin : float = 1;

private var t : float = 0; // The time since the last enemy was spawned

function Start () {
	// Calculate new height & width based on margin
	height -= margin;
	width -= margin;
	t = spawnRate/2; //Prewarm the spawner
}

function Update () {
	t += Time.deltaTime;
	if ( t >= spawnRate + Random.Range(0,spawnRateRandPercent) * spawnRate || t >= spawnRate + Random.Range(0,spawnRateRandPercent) * spawnRate){
		//Figure out if a new entity should be spawned with some variation between spawn times
		
		var lastSpawn = Instantiate(square,Vector3(Random.Range(-1*width,width),Random.Range((-1*height)+vOffset,height+vOffset),0),Quaternion.Euler(0,0,0));
		lastSpawn.transform.parent = gameObject.transform;
		t = 0;
	}
}