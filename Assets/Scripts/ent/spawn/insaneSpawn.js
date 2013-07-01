#pragma strict

// This script spawns enemies
// Attach this script to the object it should be parented to

// Define the prefabs for the objects that spawn
var square : GameObject;
var fountain : GameObject;
private var gameMan : gameManager;

// Define spawning variables
var spawnRate : float = 2; // seconds per enemy spawn
var spawnRateRandPercent : float = .20; //Percent of how random the spawning should be
var progressionRate : float = 0.05; // How many more enemies per second to spawn
private var spawnStage : int = 0; // See spawning stages in the Update function
private var lastSpawn : GameObject = null; // Used to parent game objects to the field

// Define field dimensions
var height : float = 42.15;
var width : float = 94.4;
var vOffset : float = 3.03;
var margin : float = 5;

private var t : float = 0; // The time since the last enemy was spawned

function Start () {
	// Calculate new height & width based on margin
	height -= margin;
	width -= margin;
	t = spawnRate/2; //Prewarm the spawner
	gameMan = GameObject.Find("gameMan").GetComponent(gameManager);
}

function Update () {
	spawnRate = spawnRate - progressionRate * Time.deltaTime * gameMan.timeScale; // Make more enemies spawn over time
	if ( spawnRate <= 0.5 ){
		// Tame the spawning while still increasing difficulty
		spawnRate = 2;
		spawnStage += 1;
	}
	// Spawn Fountains
	if (GameObject.Find("Fountain") == null && GameObject.Find("Fountain(Clone)") == null){
		Instantiate(fountain,Vector3(Random.Range(-1*width,width),Random.Range((-1*height)+vOffset,height+vOffset),-10),Quaternion.Euler(0,0,0));
	};
	t += Time.deltaTime * gameMan.timeScale;
	if ( t >= spawnRate + Random.Range(0,spawnRateRandPercent) * spawnRate || t >= spawnRate + Random.Range(0,spawnRateRandPercent) * spawnRate){
		//Figure out if a new entity should be spawned with some variation between spawn times
		if ( spawnStage == 1 || spawnStage == 0){
			// During the first spawn stage, spawn 1 enemy at a time in a random place
			spawnSquare();
		};
		if ( spawnStage == 2){
			// Spawn enemies in groups of 2 during the second stage
			spawnSquare();
			spawnSquare();
		};
		if ( spawnStage == 3){
			spawnSquare();
			spawnSquare();
			spawnSquare();
			spawnSquare();
		};
	}
}
//
// Enemy spawn functions
//
function spawnSquare () {
	// Spawn 1 square enemy in a random place
	lastSpawn = Instantiate(square,Vector3(Random.Range(-1*width,width),Random.Range((-1*height)+vOffset,height+vOffset),0),Quaternion.Euler(0,0,0));
	lastSpawn.transform.parent = gameObject.transform;
}