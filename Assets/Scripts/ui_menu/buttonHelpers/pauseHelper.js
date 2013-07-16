#pragma strict

// Allows the pleyer to use arrow keys to navigate menus
// Be warned that this is about 200 lines of if statements.

// Define some game objects
private var raySpammer : raySpam;
// Main buttons
var mainButtonCount : int; // How many buttons are on screen
var button1 : button;
var button2 : button;
var button3 : button;
var button4 : button;
var button5 : button;

// Keep track of what's in focus
private var helping : boolean = false; //If the helper is controlling buttons
private var button : int = 0; //Which button is in focus

function Start () {
	raySpammer = GameObject.Find("Main Camera").GetComponent(raySpam);
}

function Update () {
	// Initiate a mess of conditional statements to figure which button should be active
	if(helping == false){
		if (Input.GetKeyDown(PlayerPrefs.GetString("upKey")) || Input.GetKeyDown(PlayerPrefs.GetString("upKeyAlt"))){
			raySpammer.on = false;
			helping = true;
			button = mainButtonCount;
		};
		if (Input.GetKeyDown(PlayerPrefs.GetString("downKey")) || Input.GetKeyDown(PlayerPrefs.GetString("downKeyAlt"))){
			raySpammer.on = false;
			helping = true;
			button = 1;
		};
	}
	else{
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
		// There are no bottom buttons like the other sets
		if (Input.GetKeyDown(PlayerPrefs.GetString("rightKey")) || Input.GetKeyDown(PlayerPrefs.GetString("rightKeyAlt"))){
			Clear();
			helping = false;
		};
		if (Input.GetKeyDown(PlayerPrefs.GetString("leftKey")) || Input.GetKeyDown(PlayerPrefs.GetString("leftKeyAlt"))){
			Clear();
			helping = false;
		};
	};
	// Initiate another mess of conditional statements to hover the buttons if one of the buttons was pressed
	if(Input.GetKeyDown(PlayerPrefs.GetString("upKey")) || Input.GetKeyDown(PlayerPrefs.GetString("upKeyAlt")) || 
			Input.GetKeyDown(PlayerPrefs.GetString("downKey")) || Input.GetKeyDown(PlayerPrefs.GetString("downKeyAlt")) ||
			Input.GetKeyDown(PlayerPrefs.GetString("leftKey")) || Input.GetKeyDown(PlayerPrefs.GetString("leftKeyAlt")) ||
			Input.GetKeyDown(PlayerPrefs.GetString("rightKey")) || Input.GetKeyDown(PlayerPrefs.GetString("rightKeyAlt")) ){
		raySpammer.on = false; //Disable the ray spammer
		Clear();
		if (button == 1){button1.onRaycastHit();};
		if (button == 2){button2.onRaycastHit();};
		if (button == 3){button3.onRaycastHit();};
		if (button == 4){button4.onRaycastHit();};
		if (button == 5){button5.onRaycastHit();};
	};
	// Initiate yet another mess of conditional statements to activate the effects of the button
	if(helping == true && Input.GetButtonDown("select")){
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
	}
	// If the player moves the mouse, or the game gets unpaused, stop helping
	if(Input.GetAxis("Mouse X") != 0 && helping == true || Input.GetAxis("Mouse Y") != 0 && helping == true || Input.GetButtonDown("pause") && helping == true){
		Clear();
		helping = false;
		raySpammer.on = true;
	};
}

function Clear (){
	// This function resets all textures
	if (button1 != null){ button1.gameObject.renderer.material.mainTexture = button1.normal; };
	if (button2 != null){ button2.gameObject.renderer.material.mainTexture = button2.normal; };
	if (button3 != null){ button3.gameObject.renderer.material.mainTexture = button3.normal; };
	if (button4 != null){ button4.gameObject.renderer.material.mainTexture = button4.normal; };
	if (button5 != null){ button5.gameObject.renderer.material.mainTexture = button5.normal; };
}