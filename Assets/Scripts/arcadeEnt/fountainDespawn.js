#pragma strict

// Despawns energy fountains when they are depleted or they expire

var power : float = 30; //How much energy the fountain has

//Define some gameObjects
private var player : GameObject;
private var gameMan : gameManager;
var subEmitter : ParticleSystem;

function Start () {
	player = GameObject.Find("Soul");
	gameMan = GameObject.Find("gameMan").GetComponent(gameManager);
}

function Update () {
	// Deplete & charge if the player is near only if the game is active
	if ( gameMan.timeScale != 0 && gameMan.dead == false && GameObject.Find("count down") == null ){
		if ( Vector2.Distance(transform.position, player.transform.position) <= 5){
			power -= 2 * Time.deltaTime * gameMan.timeScale;
			gameMan.fountain = true;
		}
		else{
			power -= Time.deltaTime * gameMan.timeScale;
			gameMan.fountain = false;
		};
	};
	// Destroy the system if it has a power of 0
	if (power <= 0){
		gameMan.fountain = false;
		Destroy(gameObject);
	};
	// Fade away if the game ends
	if (gameMan.dead == true){
		particleSystem.Stop();
		subEmitter.Stop();
	}
	// Update the particle effect to show power loss
	transform.localScale = Vector3(power / 30,power / 30,power / 30);
	particleSystem.startSize = power / 30 * 8;
	particleSystem.startLifetime = power / 30 * 3;
	subEmitter.startSize = power / 30 * 10;
	subEmitter.startSize = power / 30 * 5;
}