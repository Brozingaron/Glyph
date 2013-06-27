#pragma strict

var tMinus : float = 3.5; // Time before the game starts. The countdown always starts at 3.

// GameObjects to wake up from hibernation
var field : GameObject;
var player : GameObject;
var playerSprite : GameObject;
var gameMgr : GameObject;

// Private variables for keeping track of animations
private var b1 : boolean = false;
private var b2 : boolean = false;
private var b3 : boolean = false;


function Start (){
	// Put the game to sleep
	if( Application.loadedLevel == 6 ){field.GetComponent(arcadeSpawn).enabled = false;};
	if( Application.loadedLevel == 7 ){field.GetComponent(insaneSpawn).enabled = false;};
	player.GetComponent(mouseAttatch).enabled = false;
	
	// Animate in the player
	iTween.ScaleFrom(playerSprite,{"x":0,"y":0,"z":0,"easetype":"easeOutElastic","time":1,"delay":1});
	
	transform.position.y = 2; // Move the countdown offscreen until it's at 3
}

function Update () {
	tMinus -= Time.deltaTime;
	
	if( tMinus <= 3 ){ transform.position.y = 0.75; };
	
	// Set the text
	if( tMinus <= 3 && b1 == false ){ bounce(); b1 = true; gameObject.guiText.text = "3"; };
	if( tMinus <= 2 && b2 == false ){ bounce(); b2 = true; gameObject.guiText.text = "2"; };
	if( tMinus <= 1 && b3 == false ){ bounce(); b3 = true; gameObject.guiText.text = "1"; };
	
	// Destroy & wake up the game when the counter expires
	if ( tMinus <= 0 ){
		transform.position.y = 2;
		if( Application.loadedLevel == 6 ){field.GetComponent(arcadeSpawn).enabled = true;};
		if( Application.loadedLevel == 7 ){field.GetComponent(insaneSpawn).enabled = true;};
		player.GetComponent(mouseAttatch).enabled = true;
		gameMgr.GetComponent(gameManager).timeAlive = 0.0;
		Destroy(gameObject);
	};
}

function bounce () {
	// Animate the text size
	iTween.ValueTo(gameObject,{"from":0,"to":gameObject.guiText.fontSize,"easetype":"easeOutElastic","Time":1,"onupdate":"tweenSize","onupdateparams":"float"});
}

function tweenSize (scale : float){
	// iTween reference function to tween font size
	gameObject.guiText.fontSize = scale;
}