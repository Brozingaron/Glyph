#pragma strict

// Allows the pleyer to use arrow keys to navigate menus
// Be warned that this is about 200 lines of if statements.

// Define some game objects
private var raySpammer : raySpam;
// Main buttons
private var mainButtonCount : int = 5; // How many buttons are on screen
var button1 : button;
var button2 : button;
var button3 : button;
var button4 : button;
var button5 : button;
// Bottom buttons
var altButtonCount : int; // How many alt buttons are on screen
var altButton0 : button; // The button on the far left
var altButton1 : button; // The rest are on the right
var altButton2 : button;
var altButton3 : button;
var altButton4 : button;

// Keep track of what's in focus
private var helping : boolean = false; //If the helper is controlling buttons
private var alt : boolean = false; //Alt or regular
private var button : int = 0; //Which button is in focus

function Start () {
	raySpammer = GameObject.Find("Main Camera").GetComponent(raySpam);
	// Remove invalid or disabled buttons
	if ( button5 == null || button5 == MissingReferenceException || button5.enabled == false){
		button5 = null;
		mainButtonCount -= 1;
	};
	if ( button4 == null || button4 == MissingReferenceException || button4.enabled == false){
		button4 = button5;
		button5 = null;
		mainButtonCount -= 1;
	};
	if ( button3 == null || button3 == MissingReferenceException || button3.enabled == false){
		button3 = button4;
		button4 = button5;
		button5 = null;
		mainButtonCount -= 1;
	};
	if ( button2 == null || button2 == MissingReferenceException || button2.enabled == false){
		button2 = button3;
		button3 = button4;
		button4 = button5;
		button5 = null;
		mainButtonCount -= 1;
	};
	if ( button1 == null || button1 == MissingReferenceException || button1.enabled == false){
		button1 = button2;
		button2 = button3;
		button3 = button4;
		button4 = button5;
		button5 = null;
		mainButtonCount -= 1;
	};
}

function Update () {
	// Initiate a mess of conditional statements to figure which button should be active
	if(helping == false){
		if (Input.GetKeyDown(PlayerPrefs.GetString("upKey")) || Input.GetKeyDown(PlayerPrefs.GetString("upKeyAlt"))){
			raySpammer.on = false;
			helping = true;
			alt = false;
			button = mainButtonCount;
		};
		if (Input.GetKeyDown(PlayerPrefs.GetString("downKey")) || Input.GetKeyDown(PlayerPrefs.GetString("downKeyAlt"))){
			raySpammer.on = false;
			helping = true;
			alt = false;
			button = 1;
		};
		if (Input.GetKeyDown(PlayerPrefs.GetString("leftKey")) || Input.GetKeyDown(PlayerPrefs.GetString("leftKeyAlt"))){
			raySpammer.on = false;
			helping = true;
			alt = true;
			button = 0;
		};
		if (Input.GetKeyDown(PlayerPrefs.GetString("rightKey")) || Input.GetKeyDown(PlayerPrefs.GetString("rightKeyAlt"))){
			raySpammer.on = false;
			helping = true;
			alt = true;
			button = altButtonCount;
		};
	}
	else{
		if (alt == false){
			if (Input.GetKeyDown(PlayerPrefs.GetString("upKey")) || Input.GetKeyDown(PlayerPrefs.GetString("upKeyAlt"))){
				button -= 1;
			};
			if (Input.GetKeyDown(PlayerPrefs.GetString("downKey")) || Input.GetKeyDown(PlayerPrefs.GetString("downKeyAlt"))){
				button += 1;
			};
			// Take maximums into account
			if (button <= 0){
				button = mainButtonCount;
			};
			if (button > mainButtonCount){
				button = 1;
			};
			// Deal with switching sets
			if (Input.GetKeyDown(PlayerPrefs.GetString("rightKey")) || Input.GetKeyDown(PlayerPrefs.GetString("rightKeyAlt"))){
				alt = true;
				button = 0;
			};
			if (Input.GetKeyDown(PlayerPrefs.GetString("leftKey")) || Input.GetKeyDown(PlayerPrefs.GetString("leftKeyAlt"))){
				alt = true;
				button = altButtonCount;
			};
		};
		if (alt == true){
			if (Input.GetKeyDown(PlayerPrefs.GetString("leftKey")) || Input.GetKeyDown(PlayerPrefs.GetString("leftKeyAlt"))){
				button += 1;
			};
			if (Input.GetKeyDown(PlayerPrefs.GetString("rightKey")) || Input.GetKeyDown(PlayerPrefs.GetString("rightKeyAlt"))){
				button -= 1;
			};
			// Take maximums into account
			if (button < 0){
				button = altButtonCount;
			};
			if (button > altButtonCount){
				button = 0;
			};
			// Deal with switching sets
			if (Input.GetKeyDown(PlayerPrefs.GetString("downKey")) || Input.GetKeyDown(PlayerPrefs.GetString("downKeyAlt"))){
				alt = false;
				button = 0;
			};
			if (Input.GetKeyDown(PlayerPrefs.GetString("upKey")) || Input.GetKeyDown(PlayerPrefs.GetString("upKeyAlt"))){
				alt = false;
				button = mainButtonCount;
			};
		};
	};
	// Initiate another mess of conditional statements to hover the buttons if one of the buttons was pressed
	if(Input.GetKeyDown(PlayerPrefs.GetString("upKey")) || Input.GetKeyDown(PlayerPrefs.GetString("upKeyAlt")) || 
			Input.GetKeyDown(PlayerPrefs.GetString("downKey")) || Input.GetKeyDown(PlayerPrefs.GetString("downKeyAlt")) ||
			Input.GetKeyDown(PlayerPrefs.GetString("leftKey")) || Input.GetKeyDown(PlayerPrefs.GetString("leftKeyAlt")) ||
			Input.GetKeyDown(PlayerPrefs.GetString("rightKey")) || Input.GetKeyDown(PlayerPrefs.GetString("rightKeyAlt")) ){
		raySpammer.on = false; //Disable the ray spammer
		Clear();
		if (alt == false){
			if (button == 1 && button1 != null && button1 != MissingReferenceException){button1.onRaycastHit();};
			if (button == 2 && button2 != null && button2 != MissingReferenceException){button2.onRaycastHit();};
			if (button == 3 && button3 != null && button3 != MissingReferenceException){button3.onRaycastHit();};
			if (button == 4 && button4 != null && button4 != MissingReferenceException){button4.onRaycastHit();};
			if (button == 5 && button5 != null && button5 != MissingReferenceException){button5.onRaycastHit();};
		}
		else{
			if (button == 0){altButton0.onRaycastHit();};
			if (button == 1){altButton1.onRaycastHit();};
			if (button == 2){altButton2.onRaycastHit();};
			if (button == 3){altButton3.onRaycastHit();};
			if (button == 4){altButton4.onRaycastHit();};
		};
	};
	// Initiate yet another mess of conditional statements to activate the effects of the button
	if(helping == true && Input.GetButtonDown("select")){
		if (alt == false){
			if (button == 1){
				button1.gameObject.renderer.material.mainTexture = button1.pressed;
				button1.Action();
			};
			if (button == 2){
				button2.gameObject.renderer.material.mainTexture = button2.pressed;
				button2.Action();
			};
			if (button == 3){
				button3.gameObject.renderer.material.mainTexture = button3.pressed;
				button3.Action();
			};
			if (button == 4){
				button4.gameObject.renderer.material.mainTexture = button4.pressed;
				button4.Action();
			};
			if (button == 5){
				button5.gameObject.renderer.material.mainTexture = button5.pressed;
				button5.Action();
			};
		};
		if (alt == true){
			if (button == 0){
				altButton0.gameObject.renderer.material.mainTexture = altButton0.pressed;
				altButton0.Action();
			};
			if (button == 1){
				altButton0.gameObject.renderer.material.mainTexture = altButton0.pressed;
				altButton1.Action();
			};
			if (button == 2){
				altButton0.gameObject.renderer.material.mainTexture = altButton0.pressed;
				altButton2.Action();
			};
			if (button == 3){
				altButton0.gameObject.renderer.material.mainTexture = altButton0.pressed;
				altButton3.Action();
			};
			if (button == 4){
				altButton0.gameObject.renderer.material.mainTexture = altButton0.pressed;
				altButton4.Action();
			};
		};
	}
	// If the player moves the mouse, stop helping
	if(Input.GetAxis("Mouse X") != 0 && helping == true || Input.GetAxis("Mouse Y") != 0 && helping == true){
		Clear();
		helping = false;
		raySpammer.on = true;
	};
}

function Clear (){
	// This function resets all textures
	if (button1 != null && button1 != MissingReferenceException){ button1.gameObject.renderer.material.mainTexture = button1.normal; };
	if (button2 != null && button2 != MissingReferenceException){ button2.gameObject.renderer.material.mainTexture = button2.normal; };
	if (button3 != null && button3 != MissingReferenceException){ button3.gameObject.renderer.material.mainTexture = button3.normal; };
	if (button4 != null && button4 != MissingReferenceException){ button4.gameObject.renderer.material.mainTexture = button4.normal; };
	if (button5 != null && button5 != MissingReferenceException){ button5.gameObject.renderer.material.mainTexture = button5.normal; };
	// Now for the alt buttons
	if (altButton0 != null){ altButton0.gameObject.renderer.material.mainTexture = altButton0.normal; };
	if (altButton1 != null){ altButton1.gameObject.renderer.material.mainTexture = altButton1.normal; };
	if (altButton2 != null){ altButton2.gameObject.renderer.material.mainTexture = altButton2.normal; };
	if (altButton3 != null){ altButton3.gameObject.renderer.material.mainTexture = altButton3.normal; };
	if (altButton4 != null){ altButton4.gameObject.renderer.material.mainTexture = altButton4.normal; };
	
	if (Application.loadedLevel == 1){
		GameObject.Find("Highscore").guiText.text = "";
	}
}