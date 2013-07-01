#pragma strict

// May death rain upon them
private var touch : GameObject;

// Some GameObject references
var spriteObject : GameObject;
var trailObject : GameObject;
var Death : GameObject;
var gameMan : gameManager;

var deathSound : AudioClip;

var god : boolean = false; // For INTERNAL TESTING ONLY
private var dead : boolean = false;

function OnCollisionStay(touch : Collision) {
	//If a collision is detected between another rigidbody object and the player isn't invincible as indicated by transparency...
	if ( spriteObject.renderer.material.color.a == 1.0 ){
		if ( touch.gameObject.GetComponent(linearFollow) != null && touch.gameObject.GetComponent(linearFollow).lethal == true ){
			//See if it's lethal. If yes, kill it and the player
			touch.gameObject.GetComponent(enemyDeath).suicide();
			gameMan.die();
		};
	};
};

function damaged () {
	// Animate to indicate the player is temporarily invincible
	spriteObject.renderer.material.color.a = 0.0;
	iTween.FadeTo(spriteObject,{"alpha":.50,"time":0.1,"delay":0.0});
	iTween.FadeTo(spriteObject,{"alpha":.25,"time":0.1,"delay":0.1});
	iTween.FadeTo(spriteObject,{"alpha":.50,"time":0.1,"delay":0.2});
	iTween.FadeTo(spriteObject,{"alpha":.25,"time":0.1,"delay":0.3});
	iTween.FadeTo(spriteObject,{"alpha":1.0,"time":0.2,"delay":0.4});
}

function fatal () {
	// Called by gameManager to end the game
	Screen.showCursor = true;
	Screen.lockCursor = false;
	
	Destroy(GetComponent(mouseAttatch));
	
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