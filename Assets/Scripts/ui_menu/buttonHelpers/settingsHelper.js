#pragma strict

// Allows the pleyer to use arrow keys to navigate menus
// Be warned that this is about 200 lines of if statements.

// Define some game objects
private var raySpammer : raySpam;
// Main buttons
private var mainButtonCount : int = 4; // How many buttons are on screen
var button1 : controlSlider;
var button2 : button;
var button3 : videoSlider;
var button4 : button;
// Bottom buttons
private var altButtonCount : int = 1; // How many alt buttons are on screen
var altButton0 : button; // The button on the far left
var altButton1 : sound; // The rest are on the right

// Keep track of what's in focus
private var helping : boolean = false; //If the helper is controlling buttons
private var alt : boolean = false; //Alt or regular
private var button : int = 0; //Which button is in focus

function Start () {
	raySpammer = GameObject.Find("Main Camera").GetComponent(raySpam);
}

function Update () {
	// Initiate a mess of conditional statements to figure which button should be active
	if(helping == false){
		if (Input.GetButtonDown("up")){
			raySpammer.on = false;
			helping = true;
			alt = false;
			button = mainButtonCount;
		};
		if (Input.GetButtonDown("down")){
			raySpammer.on = false;
			helping = true;
			alt = false;
			button = 1;
		};
		if (Input.GetButtonDown("left")){
			raySpammer.on = false;
			helping = true;
			alt = true;
			button = 0;
		};
		if (Input.GetButtonDown("right")){
			raySpammer.on = false;
			helping = true;
			alt = true;
			button = altButtonCount;
		};
	}
	else{
		if (alt == false){
			if (Input.GetButtonDown("up")){
				button -= 1;
			};
			if (Input.GetButtonDown("down")){
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
			if (Input.GetButtonDown("right")){
				alt = true;
				button = 0;
			};
			if (Input.GetButtonDown("left")){
				alt = true;
				button = altButtonCount;
			};
		};
		if (alt == true){
			if (Input.GetButtonDown("left")){
				button += 1;
			};
			if (Input.GetButtonDown("right")){
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
			if (Input.GetButtonDown("down")){
				alt = false;
				button = 0;
			};
			if (Input.GetButtonDown("up")){
				alt = false;
				button = mainButtonCount;
			};
		};
	};
	// Initiate another mess of conditional statements to hover the buttons if one of the buttons was pressed
	if(Input.GetButtonDown("up") || Input.GetButtonDown("down") || Input.GetButtonDown("left") || Input.GetButtonDown("right")){
		raySpammer.on = false; //Disable the ray spammer
		Clear();
		if (alt == false){
			if (button == 1){button1.onRaycastHit();};
			if (button == 2){button2.onRaycastHit();};
			if (button == 3){button3.onRaycastHit();};
			if (button == 4){button4.onRaycastHit();};
		}
		else{
			if (button == 0){altButton0.onRaycastHit();};
			if (button == 1){altButton1.onRaycastHit();};
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
	if (button1 != null){ button1.gameObject.renderer.material.mainTexture = button1.normal; };
	if (button2 != null){ button2.gameObject.renderer.material.mainTexture = button2.normal; };
	if (button3 != null){ button3.gameObject.renderer.material.mainTexture = button3.normal; };
	if (button4 != null){ button4.gameObject.renderer.material.mainTexture = button4.normal; };
	// Now for the alt buttons
	if (altButton0 != null){ altButton0.gameObject.renderer.material.mainTexture = altButton0.normal; };
	if (altButton1 != null){ altButton1.gameObject.renderer.material.mainTexture = altButton1.normal; };
}