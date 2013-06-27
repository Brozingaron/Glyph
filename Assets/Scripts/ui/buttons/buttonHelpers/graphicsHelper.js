#pragma strict

// Allows the pleyer to use arrow keys to navigate menus
// Be warned that this is about 200 lines of if statements.

// Define some game objects
private var raySpammer : raySpam;
// Main buttons
private var mainButtonCount : int = 6; // How many buttons are on screen
var button1 : resolutionary;
var button2 : resolutionary;
var button3 : resolutionary;
var button4 : resolutionary;
var button5 : minimalParticles;
var button6 : vSync;
// Bottom buttons
private var altButtonCount : int = 0; // How many alt buttons are on screen
var altButton0 : button; // The button on the far left

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
			if(button == 1 && button1.disabled == true){button = 2;};
			if(button == 2 && button2.disabled == true){button = 3;};
			if(button == 3 && button3.disabled == true){button = 4;};
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
				if(button == 3 && button1.disabled == true){button = 2;};
				if(button == 2 && button2.disabled == true){button = 1;};
				if(button == 1 && button3.disabled == true){button = 6;};
			};
			if (Input.GetButtonDown("down")){
				button += 1;
				if (button > mainButtonCount){
					button = 1;
				};
				if(button == 1 && button1.disabled == true){button = 2;};
				if(button == 2 && button2.disabled == true){button = 3;};
				if(button == 3 && button3.disabled == true){button = 4;};
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
			if (button == 1){button1.gameObject.renderer.material.mainTexture = button1.hover;};
			if (button == 2){button2.gameObject.renderer.material.mainTexture = button2.hover;};
			if (button == 3){button3.gameObject.renderer.material.mainTexture = button3.hover;};
			if (button == 4){button4.gameObject.renderer.material.mainTexture = button4.hover;};
			if (button == 5){button5.gameObject.renderer.material.mainTexture = button5.hover;};
			if (button == 6){button6.gameObject.renderer.material.mainTexture = button6.hover;};
		}
		else{
			if (button == 0){altButton0.gameObject.renderer.material.mainTexture = altButton0.hover;};
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
			if (button == 6){
				button6.gameObject.renderer.material.mainTexture = button6.pressed;
				button6.Action();
			};
		};
		if (alt == true){
			if (button == 0){
				altButton0.gameObject.renderer.material.mainTexture = altButton0.pressed;
				altButton0.Action();
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
	if( button1.disabled == false ) { button1.gameObject.renderer.material.mainTexture = button1.normal; };
	if( button2.disabled == false ) { button2.gameObject.renderer.material.mainTexture = button2.normal; };
	if( button3.disabled == false ) { button3.gameObject.renderer.material.mainTexture = button3.normal; };
	if( button4.disabled == false ) { button4.gameObject.renderer.material.mainTexture = button4.normal; };
	button5.gameObject.renderer.material.mainTexture = button5.normal;
	button6.gameObject.renderer.material.mainTexture = button6.normal;
	altButton0.gameObject.renderer.material.mainTexture = altButton0.normal;
}