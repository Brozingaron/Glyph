#pragma strict

// Spawns bosses and acts as a point where enemies transform
// This script is primarily referenced by transform.js

// Define boss prefabs
var trapezoid : GameObject;

private var boss : int;
private var instantiated : GameObject; // the instantiated gameObject

function Start () {
	Invoke("Create",1); // Call the Create function in 1 second
	transform.position.x = Random.Range(-69,69);
	transform.position.y = Random.Range(-14,26); // Move to a random location
	
	boss = Random.Range(0,0); // Pick a boss
	gameObject.name = "bossSpawn";
}

function Create () {
	// Wait for this function to be called before spawning the boss
	
	// Spawn the boss picked in the start function
	if ( boss == 0 ) { instantiated =  Instantiate(trapezoid); };
	// Move the boss to where this object is
	instantiated.transform.position = transform.position;
	
	// Parent it to this parent
	// Make it a brother...?
	instantiated.transform.parent = transform.parent;
	
	// Destroy this gameObject 1 second later to avoid spawning another boss
	Destroy(gameObject,1);
}