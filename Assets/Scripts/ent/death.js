#pragma strict

// May death rain upon them
private var touch : GameObject;

// Some GameObject references
var spriteObject : GameObject;
var trailObject : GameObject;
var Death : GameObject;

var deathSound : AudioClip;

var god : boolean = false; // For INTERNAL TESTING ONLY
private var dead : boolean = false;

function OnCollisionEnter(touch : Collision) {
	//If a collision is detected between another rigidbody object...
	if ( touch.gameObject.GetComponent(linearFollow) != null ){
		if ( touch.gameObject.GetComponent(linearFollow).lethal == true ){
			//See if it's lethal. If yes, kill it and the player
			touch.gameObject.GetComponent(enemyDeath).suicide();
			if (god == false && dead == false){
				dead = true; // Only die once
				die();
			};
		};
	}
};

function die () {
	Screen.showCursor = true;
	Screen.lockCursor = false;
	
	Destroy(GetComponent(mouseAttatch));
	
	// Tell the game Manager that you're dead
	GameObject.Find("gameMan").GetComponent(gameManager).dead = true;
	
	// Stop spawning enemies
	if( Application.loadedLevel == 6 ){Destroy(GameObject.Find("Field").GetComponent(arcadeSpawn));};
	if( Application.loadedLevel == 7 ){Destroy(GameObject.Find("Field").GetComponent(insaneSpawn));};
	
	// Kill all enemies
	var enemy : GameObject[];
	enemy = GameObject.FindGameObjectsWithTag("enemy");
	for(var i = 0 ; i < enemy.length ; i ++){
		enemy[i].GetComponent(enemyDeath).suicide();
	};	
	
	// Explode
	GameObject.Find("playerSplosion").particleSystem.Emit(1);
	trailObject.particleSystem.enableEmission = false;
	// Play the death sound
	audio.PlayOneShot(deathSound);
	// Fade
	iTween.ScaleTo(spriteObject,{"x":0,"y":0,"easetype":"easeOutSine","time":.5,"delay":0.1});
	// Show the death screen
	var dScreen = Instantiate(Death,Vector3(0,0,50),Quaternion.Euler(0,0,0));
	dScreen.transform.parent = GameObject.Find("Border").transform; //Make the death screen a child of the Border beacue it animates
	// Make the music quieter
	GameObject.Find("Music(Clone)").GetComponent(musicManager).fade(0.25);
}