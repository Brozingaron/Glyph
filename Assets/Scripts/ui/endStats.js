#pragma strict

// This script shows the end stats on the death screen

// Should this guiText show labels or values?
// There are 2 different objects for typography stuff
var values : boolean = false;

private var gameMgr : gameManager;
private var sceneMan : sceneManager;

function Start () {
	// Find the Game Manager
	gameMgr = GameObject.Find("gameMan").GetComponent(gameManager);
	
	// Animate the text size
	iTween.ValueTo(gameObject,{"from":0,"to":gameObject.guiText.fontSize,"easetype":"easeOutElastic","Time":1,"onupdate":"tweenSize","onupdateparams":"float","delay":3});
	iTween.MoveFrom(gameObject,{"y":2,"time":0,"delay":3});
	
	// Find the scene manager
	sceneMan = GameObject.Find("Main Camera").GetComponent(sceneManager);
}

function Update () {
	// Set the new text
	if ( values == false ){
		gameObject.guiText.text = " Score: \n Enemies Killed: \n Time Alive: " ;
	}
	else{
		// Turn the time into minute and second components
		var tMin : int = Mathf.FloorToInt(Mathf.Round(gameMgr.timeAlive)/60);
		var tSec : int = Mathf.Round(((Mathf.Round(gameMgr.timeAlive)/60) - tMin) * 60);
		var tSecString : String = "" + tSec;
		
		// If the player dies in less than 10 seconds, we need another zero
		if (tSec < 10){ tSecString = "0" + tSec; };
		// If the player dies on an exact minute, we need 2 more zeros
		if (tSec == 0){ tSecString = "00"; };
		
		// Change the GUIText
		gameObject.guiText.text = gameMgr.score + "\n" + gameMgr.killedCount + "\n" + tMin + ":" + tSecString;
	};
	
	// Destroy when scene changes
	if ( sceneMan.newScene != Application.loadedLevel ){
		transform.position.y = 2;
	};
}

function tweenSize (scale : float){
	// iTween reference function to tween font size
	gameObject.guiText.fontSize = scale;
}