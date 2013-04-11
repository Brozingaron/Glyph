#pragma strict

// This script is the main variable manager throughout the game
// It has its own empty gameObject that it is attached to

var score : int = 0;
var multiplier : int = 1;
var killedCount : int = 0;
var charge : float = 0.0;
var timeAlive : float = 0.0;
var chargeRate : float = 60.0; //Time it takse to fully charge the ability bar in seconds
var chargeMax : float = 1.0;
var dead : boolean = false;

// Particle Prefab References
var pushParticle : GameObject;
var burstParticle : GameObject;
var nukeParticle : GameObject;

// Define a few in-game objects
private var scoreObj : GUIText;
private var multObj : GUIText;
private var player : GameObject;

function Start () {
	// Find the Score & Multiplier
	scoreObj = GameObject.Find("score").guiText;
	multObj = GameObject.Find("multiplier").guiText;
	// Find the player
	player = GameObject.Find("Soul");
}

function Update () {
	// Count the time alive
	if ( dead == false ) {
		timeAlive += Time.deltaTime;
	};
	
	// Charge the ability bar
	if ( charge <= chargeMax && dead == false ){
		charge += ( 1 / chargeMax ) *  ( Time.deltaTime / chargeRate );
	};
	if ( charge > chargeMax ){ charge = chargeMax; }; //Cap the charge
	
	// When you use an ability
	if ( Input.GetButtonDown("ability1") && charge >= .25){
		// Make a pretty particle effect
		var pushParticles = Instantiate(pushParticle,player.transform.position,Quaternion.Euler(0,0,0));
		Destroy(pushParticles,1); // Destroy this particle effect after 1 second
		// If it's A1, wait 1 frame to let enemies realize they're dead, then tween the charge to 1 less bar
		iTween.ValueTo(gameObject,{"from":charge,"to":charge - 0.25 + 0.25 / chargeRate,"Time":0.25,"onupdate":"consumeTween","onupdateparams":"float","delay":Time.deltaTime});
	};
	if ( Input.GetButtonDown("ability2") && charge >= .50){
		// Make a pretty particle effect
		var burstParticles = Instantiate(burstParticle,player.transform.position,Quaternion.Euler(0,0,0));
		Destroy(burstParticles,1); // Destroy this particle effect after 1 second
		iTween.ValueTo(gameObject,{"from":charge,"to":charge - 0.50 + 0.25 / chargeRate,"Time":0.25,"onupdate":"consumeTween","onupdateparams":"float","delay":Time.deltaTime});
	};
	if ( Input.GetButtonDown("ability3") && charge >= .75){
		// Make a pretty particle effect
		var nukeParticles = Instantiate(nukeParticle,player.transform.position,Quaternion.Euler(0,0,0));
		Destroy(nukeParticles,1.5); // Destroy this particle effect after 1.5 seconds
		iTween.ValueTo(gameObject,{"from":charge,"to":charge - 0.75 + 0.25 / chargeRate,"Time":0.25,"onupdate":"consumeTween","onupdateparams":"float","delay":Time.deltaTime});
	};
	// Update the scoreboard
	scoreObj.text = "" + score;
	multObj.text = "x" + multiplier;
}

function consumeTween (newVal : float){
	charge = newVal;
}

function killed (){
	// Don't change the score directly. Fancy math is used
	// Call this function whenever an entity is killed
	score += 1 * multiplier;
	killedCount += 1;
}