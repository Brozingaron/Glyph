#pragma strict

// Define some important things
private var gameMan : gameManager;
private var raySpammer : raySpam;

var pauseSound : AudioClip;
var unpauseSound : AudioClip;

var visible : boolean = false;
var t : float = 0.21; //Time since last pause, allow pause at beginning of game

private var musicMan : musicManager; //Define the music manager for music effects

function Start () {
	// Find objects
	gameMan = GameObject.Find("gameMan").GetComponent(gameManager);
	raySpammer = GameObject.Find("Main Camera").GetComponent(raySpam);
	musicMan = gameObject.Find("Music(Clone)").GetComponent(musicManager);
	// Hide the pause GUIe 
	transform.position.z=-1000; // Hide the UI
	goAway();
}

function Update () {
	// Toggle visibility when escape is pressed and the player isn't dead
	if (t <= 0.5 ){
		t += Time.deltaTime; // Only allow 1 pause every 1/2 seconds
	};
	if( Input.GetButtonDown("pause") && gameMan.dead == false && GameObject.Find("count down") == null && t >= 0.5 ){
		if ( visible == false ){show();}
		else{ hide(); };
	};
}

function show () {
	// Show the UI
	gameMan.timeScale = 0;
	transform.position.z = 90;
	visible = true;
	// Show the mouse
	Screen.lockCursor = false;
	Screen.showCursor = true;
	// Send raycasts
	raySpammer.on = true;
	// Zoom and fade in
	iTween.FadeTo(gameObject,{"alpha":1,"time":0.2,"easetype":"easeOutSine"});
	iTween.ScaleTo(gameObject,{"x":89.2,"y":55.7,"time":0.2});
	// Play a sound
	audio.PlayOneShot(pauseSound);
	// Make the music quieter
	musicMan.fade(0.25);
}

function hide () {
	if(raySpammer.on != false){t = 0;} //Reset the timer unless the game is just starting
	// Thaw the game
	gameMan.timeScale = 1;
	visible = false;
	// Lock the mouse
	Screen.lockCursor = true;
	Screen.showCursor = false;
	// Stop doing redundant raycasts
	raySpammer.on = false;
	goAway();
	// Play a sound
	audio.PlayOneShot(unpauseSound);
	// Make the music louder
	musicMan.fade(1);
}

function goAway () {
	// Animates the window away
	// Zoom and fade out
	iTween.FadeTo(gameObject,{"alpha":0,"time":0.2,"easetype":"easeOutSine"});
	iTween.ScaleTo(gameObject,{"x":0,"y":0,"time":0.2,"easetype":"easeOutSine"});
	iTween.MoveTo(gameObject,{"z":-1000,"delay":0.2,"time":Time.deltaTime,"easetype":"linear"});
	musicMan.fade(1);
}