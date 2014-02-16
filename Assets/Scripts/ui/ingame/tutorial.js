#pragma strict

// This script acts as the game's tutorial
// It is currently designed to only be shown in Arcade mode
// Upon completion, it unlocks insane mode


// Define textures
var slideTex1 : Texture2D;
var slideTex2 : Texture2D;
var slideTex3 : Texture2D;
var slideTex4 : Texture2D;
var slideTex5 : Texture2D;
var slideTex6 : Texture2D;
var slideTex7 : Texture2D;
var slideTex8 : Texture2D;
var font : UnityEngine.Font;

// Define prefabs
var fountain : GameObject;
var enemy : GameObject;

// Define private variables
private var slide : int = 0; // the current slide
private var gameMan : GameObject;
private var dummy : GameObject;
private var dummyFountain : GameObject;
private var upKey : GameObject;
private var dnKey : GameObject;
private var lfKey : GameObject;
private var rtKey : GameObject;
private var a1 : GameObject;
private var a2 : GameObject;
private var a3 : GameObject;
private var textSize : float;

function Start () {
	if ( PlayerPrefs.GetInt("tutorialSeen") != 0 ){
		Destroy(gameObject);
	}
	else{
		// Move into view
		gameObject.transform.position.z = -50;
		
		// Assume the role of the count down
		Destroy(GameObject.Find("count down"));
		gameObject.name = "count down";
		
		// Find the game manager
		gameMan = GameObject.Find("gameMan");
		
		Screen.lockCursor = true;
		Screen.showCursor = false;
		
		
		//Take over all animations
		//iTween.Stop();
		GameObject.Find("Border").transform.localScale.x = 188.8;
		GameObject.Find("Border").transform.localScale.y = 84.3;
		
		//Move the score frame into view
		GameObject.Find("ScoreHeader").transform.position.y = 46.7;
		
		// Move unwanted text offscreen
		GameObject.Find("multiplier").GetComponent(GUIText).enabled = false;
		GameObject.Find("score").GetComponent(GUIText).enabled = false;
		GameObject.Find("Aurum").GetComponent(GUIText).enabled = false;
	};
}

function Update () {
	// Check for specific events to advance the slide
	
	// These events are placed in backwards chronological order to prevent advancing all in one click
	if ( slide == 8 ) {
		if( Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1) || Input.GetMouseButtonDown(2) || Input.anyKeyDown){
			finish();
		}
	}
	if ( slide == 7 ) {
		if( Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1) || Input.GetMouseButtonDown(2) || Input.anyKeyDown){
			slide = 8;
			slide8();
		}
	}
	if ( slide == 6 ) {
		if( Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1) || Input.GetMouseButtonDown(2) || Input.anyKeyDown){
			slide = 7;
			slide7();
		}
	}
	if ( slide == 5 ) {
		if( Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1) || Input.GetMouseButtonDown(2) || Input.anyKeyDown){
			slide = 6;
			slide6();
		}
	}
	if ( slide == 4 ) {
		if( Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1) || Input.GetMouseButtonDown(2) || Input.anyKeyDown){
			slide = 5;
			slide5();
		}
	}
	if ( slide == 3 ) {
		//The rest of the slides advance with any action
		if( Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1) || Input.GetMouseButtonDown(2) || Input.anyKeyDown){
			slide = 4;
			slide4();
		}
	}
	if ( slide == 2 ) {
		//Advance to slide 3 by moving the player
		if ( GameObject.Find("Soul").transform.position.x >= 10 || GameObject.Find("Soul").transform.position.x <= -10 ||
			GameObject.Find("Soul").transform.position.y >= 10 || GameObject.Find("Soul").transform.position.y <= -10 ){
				slide = 3;
				slide3();
		}
	}
	if ( slide == 1 ) {
		//Advance to slide 2 with any action
		if( Input.GetMouseButtonDown(0) || Input.GetMouseButtonDown(1) || Input.GetMouseButtonDown(2) || Input.anyKeyDown){
			slide = 2;
			slide2();
		}
	}
	if ( slide == 0 ){
		// Start the tutorial
		slide = 1;
		slide1();
	}
}

function slide1 () {
	//Hide Aurum Text
	GameObject.Find("Aurum").GetComponent(GUIText).enabled = false;
	
	// Update the texture
	gameObject.renderer.material.mainTexture = slideTex1;
	
	// Freeze the game
	gameMan.GetComponent(gameManager).timeScale = 0;
	
	// Set the charge rate to zero
	gameMan.GetComponent(gameManager).chargeRate1 = Mathf.Infinity;
	
	// Spawn a dummy
	dummy = Instantiate(enemy, Vector3(43, 19, 0), Quaternion.Euler(0,180,0));
	Destroy( dummy.GetComponent(linearFollow) );
}

function slide2 () {
	// Update the texture
	gameObject.renderer.material.mainTexture = slideTex2;
	
	// Unfreeze the game
	gameMan.GetComponent(gameManager).timeScale = 1;
	
	// Destroy the dummy
	Destroy(dummy);
	
	// Allow the player to move
	GameObject.Find("Soul").GetComponent(mouseAttatch).enabled = true;
	
	// Add text to show the current keybindings
	// Create Empty GameObjects
	upKey = new GameObject("up");
	dnKey = new GameObject("dn");
	lfKey = new GameObject("lf");
	rtKey = new GameObject("rt");
	
	// Add GUIText components to them
	upKey.AddComponent(GUIText);
	dnKey.AddComponent(GUIText);
	lfKey.AddComponent(GUIText);
	rtKey.AddComponent(GUIText);
	
	// Set the GUIText fonts
	upKey.guiText.font = font;
	dnKey.guiText.font = font;
	lfKey.guiText.font = font;
	rtKey.guiText.font = font;
	
	// Set the GUIText anchor
	upKey.guiText.anchor = TextAnchor.MiddleCenter;
	dnKey.guiText.anchor = TextAnchor.MiddleCenter;
	lfKey.guiText.anchor = TextAnchor.MiddleCenter;
	rtKey.guiText.anchor = TextAnchor.MiddleCenter;
	
	// Set the GUIText align
	upKey.guiText.alignment = TextAlignment.Center;
	dnKey.guiText.alignment = TextAlignment.Center;
	lfKey.guiText.alignment = TextAlignment.Center;
	rtKey.guiText.alignment = TextAlignment.Center;
	
	// Set the GUIText font size
	textSize = 54 * Screen.height / 1080;
	upKey.guiText.fontSize = textSize;
	dnKey.guiText.fontSize = textSize;
	lfKey.guiText.fontSize = textSize;
	rtKey.guiText.fontSize = textSize;
	
	// Position the text
	upKey.transform.position = Vector3(0.758,0.785,0);
	dnKey.transform.position = Vector3(0.758,0.726,0);
	lfKey.transform.position = Vector3(0.725,0.726,0);
	rtKey.transform.position = Vector3(0.79,0.726,0);
	
	// Set the text
	upKey.GetComponent(GUIText).guiText.text = PlayerPrefs.GetString("upKey");
	dnKey.GetComponent(GUIText).guiText.text = PlayerPrefs.GetString("downKey");
	lfKey.GetComponent(GUIText).guiText.text = PlayerPrefs.GetString("leftKey");
	rtKey.GetComponent(GUIText).guiText.text = PlayerPrefs.GetString("rightKey");
}

function slide3 () {
	// Update the texture
	gameObject.renderer.material.mainTexture = slideTex3;
	
	// Freeze the game
	gameMan.GetComponent(gameManager).timeScale = 1;
	
	// Disallow the player to move
	GameObject.Find("Soul").GetComponent(mouseAttatch).enabled = false;
	
	// Reset the player's position
	GameObject.Find("Soul").transform.position = Vector3(0,0,0);
	
	// Destroy the text
	Destroy(upKey);
	Destroy(dnKey);
	Destroy(lfKey);
	Destroy(rtKey);
}

function slide4 () {
	// Update the texture
	gameObject.renderer.material.mainTexture = slideTex4;
	
	// Change the charge value
	gameMan.GetComponent(gameManager).charge = .15;
}

function slide5 () {
	// Update the texture
	gameObject.renderer.material.mainTexture = slideTex5;
	
	// Change the charge value
	gameMan.GetComponent(gameManager).charge = .25;
	
	// Add text to show the current keybindings
	// Create Empty GameObjects
	a1 = new GameObject("ability1");
	a2 = new GameObject("ability2");
	a3 = new GameObject("ability3");
	
	// Add GUIText components to them
	a1.AddComponent(GUIText);
	a2.AddComponent(GUIText);
	a3.AddComponent(GUIText);
	
	// Set the GUIText fonts
	a1.guiText.font = font;
	a2.guiText.font = font;
	a3.guiText.font = font;
	
	// Set the GUIText anchor
	a1.guiText.anchor = TextAnchor.MiddleCenter;
	a2.guiText.anchor = TextAnchor.MiddleCenter;
	a3.guiText.anchor = TextAnchor.MiddleCenter;
	
	// Set the GUIText align
	a1.guiText.alignment = TextAlignment.Center;
	a2.guiText.alignment = TextAlignment.Center;
	a3.guiText.alignment = TextAlignment.Center;
	
	// Set the GUIText font size
	textSize = 106 * Screen.height / 1080;
	a1.guiText.fontSize = textSize;
	a2.guiText.fontSize = textSize;
	a3.guiText.fontSize = textSize;
	
	// Position the text
	a1.transform.position = Vector3(0.43,0.82,0);
	a2.transform.position = Vector3(0.505,0.82,0);
	a3.transform.position = Vector3(0.59,0.82,0);
	
	// Set the text
	a1.GetComponent(GUIText).guiText.text = PlayerPrefs.GetString("a1Key");
	a2.GetComponent(GUIText).guiText.text = PlayerPrefs.GetString("a2Key");
	a3.GetComponent(GUIText).guiText.text = PlayerPrefs.GetString("a3Key");
}

function slide6 () {
	// Update the texture
	gameObject.renderer.material.mainTexture = slideTex6;
	
	// Reset the charge value
	gameMan.GetComponent(gameManager).charge = .25;
	
	// Destroy the text from the previous slide
	Destroy(a1);
	Destroy(a2);
	Destroy(a3);
}

function slide7 () {
	// Update the texture
	gameObject.renderer.material.mainTexture = slideTex7;
	
	// Spawn a fountain
	dummyFountain = Instantiate(fountain,Vector3(-75,0,-20),Quaternion.Euler(0,0,0));
}

function slide8 () {
	// Update the texture
	gameObject.renderer.material.mainTexture = slideTex8;
	
	// Destroy the fountain
	Destroy(dummyFountain);
}

function finish () {
	// Mark the tutorial as completed
	PlayerPrefs.SetInt("tutorialSeen",1);
	
	// Activate the game
	if( Application.loadedLevel == 6 ){GameObject.Find("Field").GetComponent(arcadeSpawn).enabled = true;};
	if( Application.loadedLevel == 7 ){GameObject.Find("Field").GetComponent(insaneSpawn).enabled = true;};
	if( GameObject.Find("Soul").GetComponent(mouseAttatch) != null){GameObject.Find("Soul").GetComponent(mouseAttatch).enabled = true;};
	if( GameObject.Find("Soul").GetComponent(wasdMove) != null){GameObject.Find("Soul").GetComponent(wasdMove).enabled = true;};
	gameMan.GetComponent(gameManager).timeAlive = 0.0;
	gameMan.GetComponent(gameManager).timeScale = 1.0;
	gameMan.GetComponent(gameManager).chargeRate1 = 10;
	
	// Reactivate text elements
	GameObject.Find("multiplier").GetComponent(GUIText).enabled = true;
	GameObject.Find("score").GetComponent(GUIText).enabled = true;
	GameObject.Find("Aurum").GetComponent(GUIText).enabled = true;
	
	// Terminate the tutorial
	Destroy(gameObject);
}