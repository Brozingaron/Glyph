#pragma strict

// This script is the main variable manager throughout the game
// It has its own empty gameObject that it is attached to

// Define ALL THE VARIABLES

// Game Statistics
var score : int = 0; // The current score
var multiplier : int = 1; // The current multiplier
var multiply : boolean = false; // If the score has a multiplier higher than 1x
var killedCount : int = 0; // The number of enemies brutally murdered in this game
var lastKilled : int = 0; // The number of enimies killed at the last update function
var comboTimer : float = 0.0; // The duration of this combo
var maxComboTimer : float = 5.0; // Limit the duration of a combo
var charge : float = 0.0; // The current charge of the ability bar
var timeAlive : float = 0.0; // The duration of this round
var lives : int = 3; // The number of lives the player has
// Charge Rates
private var chargeRate : float = 75.0; // Current Charge Rate as calculated by the game
var chargeRate1 : float = 5.0; // Ability 1
var chargeRate2 : float = 15.0; // Ability 2
var chargeRate3 : float = 25.0; // Ability 3
var chargeRate4 : float = 45.0; // Ability 4
var fountain : boolean = false; // If the player is over an energy fountain
// Game Options
var chargeMax : float = 1.0;
var dead : boolean = false;
// For pausing and INTERNAL TESTING ONLY
var timeScale : float = 1.0;

// Particle Prefab References
var pushParticle : GameObject;
var burstParticle : GameObject;
var nukeParticle : GameObject;
// Minimal Particles
var pushMinimalParticle : GameObject;
var burstMinimalParticle : GameObject;
var nukeMinimalParticle : GameObject;

// Define a few in-game objects
private var scoreObj : GUIText;
private var multObj : GUIText;
private var lifeObj : GUIText;
private var player : GameObject;

function Start () {
	// Find the Score, Multiplier & Lives
	scoreObj = GameObject.Find("score").guiText;
	multObj = GameObject.Find("multiplier").guiText;
	lifeObj = GameObject.Find("LifeCounter").guiText;
	// Find the player
	player = GameObject.Find("Soul");
	
	// Use minimal particles if enabled
	if ( PlayerPrefs.GetInt("minimalParticles") == 1){
		pushParticle = pushMinimalParticle;
		burstParticle = burstMinimalParticle;
		nukeParticle = nukeMinimalParticle;
	};
}

function Update () {
	// Count the time alive
	if ( dead == false ) {
		timeAlive += Time.deltaTime * timeScale;
	};
	
	// Find the charge rate
	if ( charge <= 0.25 ){ chargeRate = chargeRate1;}; // If no bars are filled
	if ( charge > 0.25 && charge <= .5){ chargeRate = chargeRate2;}; // If 1 bar is filled
	if ( charge > 0.5 && charge <= 0.75){ chargeRate = chargeRate3;}; //If 2 bars are filled
	if ( charge > 0.75 ){ chargeRate = chargeRate4;}; //If 3 bars are filled
	
	// Halve the charge rate if the player is over a fountain
	if ( fountain == true ){
		chargeRate = chargeRate / 2;
	};
	
	// Charge the ability bar
	if ( charge < chargeMax && dead == false && GameObject.Find("count down") == null ){
		charge += ( 1 / chargeMax ) *  ( Time.deltaTime * timeScale / chargeRate );
	};
	if ( charge > chargeMax ){ charge = chargeMax; }; //Cap the charge
	
	// When you use an ability
	if ( charge >= .25 && timeScale > 0 && dead == false ){
		if ( Input.GetKeyDown(PlayerPrefs.GetString("a1Key")) || Input.GetKeyDown(PlayerPrefs.GetString("a1KeyAlt"))){
			// Make a pretty particle effect
			var pushParticles = Instantiate(pushParticle,player.transform.position,Quaternion.Euler(0,0,0));
			Destroy(pushParticles,1); // Destroy this particle effect after 1 second
			iTween.ValueTo(gameObject,{"from":charge,"to":charge - 0.25 + 0.25 / chargeRate,"Time":0.25,"onupdate":"consumeTween","onupdateparams":"float"});
			
			// Tell enemies to react
			for ( var enemy : GameObject in GameObject.FindGameObjectsWithTag("enemy") ){
				enemy.GetComponent(enemyDeath).push();
			}
		};
	};
	if ( charge >= .50 && timeScale > 0 && dead == false){
		if ( Input.GetKeyDown(PlayerPrefs.GetString("a2Key")) || Input.GetKeyDown(PlayerPrefs.GetString("a2KeyAlt"))){
			// Make a pretty particle effect
			var burstParticles = Instantiate(burstParticle,player.transform.position,Quaternion.Euler(0,0,0));
			Destroy(burstParticles,1); // Destroy this particle effect after 1 second
			iTween.ValueTo(gameObject,{"from":charge,"to":charge - 0.50 + 0.25 / chargeRate,"Time":0.25,"onupdate":"consumeTween","onupdateparams":"float"});
			
			// Tell enemies to react
			for ( var enemy : GameObject in GameObject.FindGameObjectsWithTag("enemy") ){
				enemy.GetComponent(enemyDeath).burst();
			}
		};
	};
	if ( charge >= .75 && timeScale > 0 && dead == false){
		if ( Input.GetKeyDown(PlayerPrefs.GetString("a3Key")) || Input.GetKeyDown(PlayerPrefs.GetString("a3KeyAlt"))){
			// Make a pretty particle effect
			var nukeParticles = Instantiate(nukeParticle,player.transform.position,Quaternion.Euler(0,0,0));
			Destroy(nukeParticles,1.5); // Destroy this particle effect after 1.5 seconds
			iTween.ValueTo(gameObject,{"from":charge,"to":charge - 0.75 + 0.25 / chargeRate,"Time":0.25,"onupdate":"consumeTween","onupdateparams":"float"});
			
			// Tell enemies to react
			for ( var enemy : GameObject in GameObject.FindGameObjectsWithTag("enemy") ){
				enemy.GetComponent(enemyDeath).nuke();
			}
		};
	};
	
	// Count the duration of this combo
	if ( multiplier > 1 ){
		comboTimer += Time.deltaTime * timeScale;
	}; 
	
	// Combo Maker
	if (killedCount > lastKilled){
		multiplier += killedCount - lastKilled; // Update the combo
		comboTimer = 0; // Reset the timer
	};
	
	// Combo Breaker
	if ( comboTimer > maxComboTimer && dead == false ){
		if ( PlayerPrefs.HasKey("cheating") == false){ // If the player isn't cheating...
			PlayerPrefs.SetInt("aurum", PlayerPrefs.GetInt("aurum") + multiplier);// Add that much aurum
		};
		GameObject.Find("Aurum").GetComponent(aurumText).refresh();
		multiplier = 1; //Reset the multiplier
		comboTimer = 0;
		multiply = false; // Stop the multiplier
	};
	
	// Update the lastKilled variable for the next update event
	lastKilled = killedCount;
	
	// Update the scoreboard
	scoreObj.text = "" + score;
	multObj.text = "x" + multiplier;
	
	// Update the life counter
	if( dead == false){
		lifeObj.text = "x" + lives;
	}
	else{
		lifeObj.text = "";
	}
}

function consumeTween (newVal : float){
	charge = newVal;
}

function killed (pointValue : int){
	// Don't change the score directly. Fancy math is used
	// Call this function whenever an entity is killed
	killedCount += 1;
	if (multiply == false){
		multiply = true;
	}
	else{
		multiplier += 1;
	};
	score += pointValue * multiplier;
}

function die (){
	// Call this function when the player dies or loses a life
	lives -= 1;
	if ( lives < 0 ){
		player.GetComponent(death).fatal();
		lives = 0;
		dead = true;
		// Set highscores (but only if the player didn't cheat)
		if ( PlayerPrefs.HasKey("cheating") == false ){
			if ( Application.loadedLevel == 6 && PlayerPrefs.GetInt("arcadeHS") < score ){
				PlayerPrefs.SetInt("arcadeHS",score);
			};
			if ( Application.loadedLevel == 7 && PlayerPrefs.GetInt("insaneHS") < score ){
				PlayerPrefs.SetInt("insaneHS",score);
			};
			if ( Application.loadedLevel == 8 && PlayerPrefs.GetInt("endlessHS") < score ){
				PlayerPrefs.SetInt("endlessHS",score);
			};
		};
	}
	else{
		player.GetComponent(death).damaged();
	};
	
}