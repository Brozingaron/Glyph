#pragma strict

// Allows the pleyer to use arrow keys to navigate menus
// Be warned that this is about 200 lines of if statements.
// This script also keeps track of some matrix variables with the control settings

// Define some game objects
private var raySpammer : raySpam;
// Top row
var mainButtonCount : int; // How many buttons are on screen
var button1 : keyEditor;
var button2 : keyEditor;
var button3 : keyEditor;
var button4 : keyEditor;
var button5 : keyEditor;
var button6 : keyEditor;
// Bottom row
var altButtonCount : int; // How many alt buttons are on screen
var altButton1 : keyEditor;
var altButton2 : keyEditor;
var altButton3 : keyEditor;
var altButton4 : keyEditor;
var altButton5 : keyEditor;
var altButton6 : keyEditor;
//The done button
var doneButton : windowController;

var anotherListening : boolean = false;

// Keep track of what's in focus
var helping : boolean = false; //If the helper is controlling buttons
private var row : int = 0; //Which row is in focus
private var button : int = 0; //Which button is in focus

function Start () {
	raySpammer = GameObject.Find("Main Camera").GetComponent(raySpam);
}

function Update () {
	// Don't do anything if the player is choosing a key
	if (anotherListening == false){
		// Initiate a mess of conditional statements to figure which button should be active
		if(helping == false){
			if (Input.GetKeyDown(PlayerPrefs.GetString("upKey")) || Input.GetKeyDown(PlayerPrefs.GetString("upKeyAlt"))){
				raySpammer.on = false;
				helping = true;
				row = 0;
				button = 1;
			};
			if (Input.GetKeyDown(PlayerPrefs.GetString("downKey")) || Input.GetKeyDown(PlayerPrefs.GetString("downKeyAlt"))){
				raySpammer.on = false;
				helping = true;
				row = 0;
				button = 1;
			};
			if (Input.GetKeyDown(PlayerPrefs.GetString("leftKey")) || Input.GetKeyDown(PlayerPrefs.GetString("leftKeyAlt"))){
				raySpammer.on = false;
				helping = true;
				row = 0;
				button = 1;
			};
			if (Input.GetKeyDown(PlayerPrefs.GetString("rightKey")) || Input.GetKeyDown(PlayerPrefs.GetString("rightKeyAlt"))){
				raySpammer.on = false;
				helping = true;
				row = 0;
				button = 1;
			};
		}
		else{
			if (row == 0 || row == 1){
				if (Input.GetKeyDown(PlayerPrefs.GetString("rightKey")) || Input.GetKeyDown(PlayerPrefs.GetString("rightKeyAlt"))){
					button += 1;
				};
				if (Input.GetKeyDown(PlayerPrefs.GetString("leftKey")) || Input.GetKeyDown(PlayerPrefs.GetString("leftKeyAlt"))){
					button -= 1;
				};
				
				// Take maximums into account
				if (button <= 0){
					button = mainButtonCount;
				};
				if (button > mainButtonCount){
					button = 1;
				};
				
				// Deal with switching sets
				if (Input.GetKeyDown(PlayerPrefs.GetString("upKey")) || Input.GetKeyDown(PlayerPrefs.GetString("upKeyAlt"))){
					row -= 1;
					if ( row < 0 ){row = 2;};
				};
				if (Input.GetKeyDown(PlayerPrefs.GetString("downKey")) || Input.GetKeyDown(PlayerPrefs.GetString("downKeyAlt"))){
					row += 1;
					if ( row > 2 ){row = 0;};
				};
	
			}
			else{	
				// Take maximums into account
				button = 0;
				
				// Deal with switching sets
				if (Input.GetKeyDown(PlayerPrefs.GetString("downKey")) || Input.GetKeyDown(PlayerPrefs.GetString("downKeyAlt"))){
					row = 0;
					button = mainButtonCount;
				};
				if (Input.GetKeyDown(PlayerPrefs.GetString("upKey")) || Input.GetKeyDown(PlayerPrefs.GetString("upKeyAlt"))){
					row = 1;
					button = altButtonCount;
				};
				if (Input.GetKeyDown(PlayerPrefs.GetString("leftKey")) || Input.GetKeyDown(PlayerPrefs.GetString("leftKeyAlt"))){
					row = 1;
					button = altButtonCount;
				};
				if (Input.GetKeyDown(PlayerPrefs.GetString("rightKey")) || Input.GetKeyDown(PlayerPrefs.GetString("rightKeyAlt"))){
					row = 1;
					button = 0;
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
			if (row == 0){
				if (button == 1){button1.onRaycastHit();};
				if (button == 2){button2.onRaycastHit();};
				if (button == 3){button3.onRaycastHit();};
				if (button == 4){button4.onRaycastHit();};
				if (button == 5){button5.onRaycastHit();};
				if (button == 6){button6.onRaycastHit();};
			};
			if (row == 1){
				if (button == 1){altButton1.onRaycastHit();};
				if (button == 2){altButton2.onRaycastHit();};
				if (button == 3){altButton3.onRaycastHit();};
				if (button == 4){altButton4.onRaycastHit();};
				if (button == 5){altButton5.onRaycastHit();};
				if (button == 6){altButton6.onRaycastHit();};
			}
			if (row == 2){
				doneButton.onRaycastHit();
			}
		};
		// Initiate yet another mess of conditional statements to activate the effects of the button
		if(helping == true && Input.GetButtonDown("select")){
			if (row == 0){
				if (button == 1){ button1.Action(); };
				if (button == 2){ button2.Action(); };
				if (button == 3){ button3.Action(); };
				if (button == 4){ button4.Action(); };
				if (button == 5){ button5.Action(); };
				if (button == 6){ button6.Action(); };
			};
			if (row == 1){
				if (button == 1){ altButton1.Action(); };
				if (button == 2){ altButton2.Action(); };
				if (button == 3){ altButton3.Action(); };
				if (button == 4){ altButton4.Action(); };
				if (button == 5){ altButton5.Action(); };
				if (button == 6){ altButton6.Action(); };
			};
			if (row == 3){
				doneButton.gameObject.renderer.material.mainTexture = doneButton.pressed;
				doneButton.Action();
			}
		}
		// If the player moves the mouse, stop helping
		if(Input.GetAxis("Mouse X") != 0 && helping == true || Input.GetAxis("Mouse Y") != 0 && helping == true){
			Clear();
			helping = false;
			raySpammer.on = true;
		};
	};
}

function Clear (){
	// This function resets all textures
	if (button1 != null){ button1.clear(); };
	if (button2 != null){ button2.clear(); };
	if (button3 != null){ button3.clear(); };
	if (button4 != null){ button4.clear(); };
	if (button5 != null){ button5.clear(); };
	if (button6 != null){ button6.clear(); };
	// Now for the alt buttons
	if (altButton1 != null){ altButton1.clear(); };
	if (altButton2 != null){ altButton2.clear(); };
	if (altButton3 != null){ altButton3.clear(); };
	if (altButton4 != null){ altButton4.clear(); };
	if (altButton5 != null){ altButton5.clear(); };
	if (altButton6 != null){ altButton6.clear(); };
	// Now for the done button
	if (doneButton != null){ doneButton.gameObject.renderer.material.mainTexture = doneButton.normal; };
}