#pragma strict

// This script is attached to every key binding cell in the control settings
// It updates both the text and the keybindings

// Define some variables
var lighterBG : boolean = false; // To shade the grid like a checkerboard, should this cell be lighter than others?
var keyName : String; // The key name this cell is responsible for as defined in the PlayerPrefs
var font : Font; // The font to be used on the key name

// Private variables for internal affairs
private var size : int = 150; // The size of the font to be used
private var hover : boolean = false; // If the button is being hovered
private var key : String; // the recorded string
private var revert : int = 0; // Deals with changing the texture back when not hovering
private var listening : boolean = false; // If the button is looking for a keyboard input
private var guiTextObj : GameObject;
private var matrixController : matrixHelper;
private var okay : boolean = false; // If this keybinding can be saved

function Start () {
	// Do the checkerboard effect
	if ( lighterBG == true ){gameObject.renderer.material.color.a = .2;}
	else{gameObject.renderer.material.color.a = 0.1;};
	
	// Create the text object; move it; rename it; set its text, font, size, color, alignment and anchor; and parent it to this object
	var guiTextObj = new GameObject();
	guiTextObj.AddComponent(GUIText);
	guiTextObj.transform.parent = null;
	guiTextObj.transform.position = Vector3(transform.position.x / 192 + 0.5,transform.position.y / 108 + 0.5,0);
	guiTextObj.name = "buttonText";
	guiTextObj.guiText.font = font;
	guiTextObj.AddComponent(textScale);
	guiTextObj.guiText.text = PlayerPrefs.GetString(keyName);
		// Deal with key names that are too long
	if ( PlayerPrefs.GetString(keyName) == "up" ) { size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "down") { size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "left") { size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "right") { size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "right shift") { guiTextObj.guiText.text = "rShft"; size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "left shift") { guiTextObj.guiText.text = "lShft"; size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "right ctrl") { guiTextObj.guiText.text = "rCtrl"; size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "left ctrl") { guiTextObj.guiText.text = "lCtrl"; size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "right cmd") { guiTextObj.guiText.text = "rCmd"; size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "left cmd") { guiTextObj.guiText.text = "lCmd"; size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "backspace") { guiTextObj.guiText.text = "bkspc"; size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "page up") { guiTextObj.guiText.text = "pgUp"; size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "page down") { guiTextObj.guiText.text = "pgDn"; size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "insert") { size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "space") { size = 100;};
	if ( PlayerPrefs.GetString(keyName) == "tab") { size = 100;};
	guiTextObj.GetComponent(textScale).textSize = size;
	guiTextObj.guiText.material.color = Color(1,1,1);
	guiTextObj.guiText.alignment = TextAlignment.Center;
	guiTextObj.guiText.anchor = TextAnchor.MiddleCenter;
	guiTextObj.transform.parent = gameObject.transform;
	matrixController = transform.parent.gameObject.transform.parent.GetComponent(matrixHelper);
}

function Update () {
	// Revert button color if needed
	if ( listening == false ){
		if ( hover == true && matrixController.helping == false ){
			if (revert == 1 ){ 
				clear();
			};
			// ... Add to the timer
			revert = 1; // Frames since not been hit by a ray
		};
	}
	else{
		gameObject.renderer.material.color = Color(0,2/3,1,1);
		// Record alphanumeric keys
		key = Input.inputString;
		
		// Escape cancells the change
		if(Input.GetKeyDown("escape") || Input.GetKeyDown("delete")){
			listening = false;
			matrixController.anotherListening = false;
			GetComponentInChildren(GUIText).guiText.material.color = Color(1,1,1);
			gameObject.renderer.material.color = Color(1,1,1);
			if ( lighterBG == true ){gameObject.renderer.material.color.a = .2;}
			else{gameObject.renderer.material.color.a = 0.1;};
		};
		
		// Record other keys
		if(Input.GetKeyDown("up")){key = "up";};
		if(Input.GetKeyDown("down")){key = "down";};
		if(Input.GetKeyDown("left")){key = "left";};
		if(Input.GetKeyDown("right")){key = "right";};
		if(Input.GetKeyDown("right shift")){key = "right shift";};
		if(Input.GetKeyDown("left shift")){key = "left shift";};
		if(Input.GetKeyDown("left ctrl")){key = "left ctrl";};
		if(Input.GetKeyDown("right ctrl")){key = "right ctrl";};
		if(Input.GetKeyDown("left cmd")){key = "right cmd";};
		if(Input.GetKeyDown("right cmd")){key = "right cmd";};
		if(Input.GetKeyDown("backspace")){key = "backspace";};
		if(Input.GetKeyDown("tab")){key = "tab";};
		if(Input.GetKeyDown("space")){key = "space";};
		if(Input.GetKeyDown("insert")){key = "insert";};
		if(Input.GetKeyDown("home")){key = "home";};
		if(Input.GetKeyDown("page up")){key = "page up";};
		if(Input.GetKeyDown("page down")){key = "page down";};
		if(Input.GetKeyDown("end")){key = "end";};
		
		//Ignore enter
		if(Input.GetKey("return")){ key = "";};
		
		// If the new valid key has been entered, stop listening and update the setting
		if(key.Length > 0 ){
			//verify the new input
			verify();
			if(okay){
				PlayerPrefs.SetString(keyName,key); // Set the key
				listening = false; // Stop listening
				matrixController.anotherListening = false;
				
				size = 150;
				
				// Deal with key names that are too long
				if ( key == "up") { size = 100;};
				if ( key == "down") { size = 100;};
				if ( key == "left") { size = 100;};
				if ( key == "right") { size = 100;};
				if ( key == "right shift") { key = "rShft"; size = 100;};
				if ( key == "left shift") { key = "lShft"; size = 100;};
				if ( key == "right ctrl") { key = "rCtrl"; size = 100;};
				if ( key == "left ctrl") { key = "lCtrl"; size = 100;};
				if ( key == "right cmd") { key = "rCmd"; size = 100;};
				if ( key == "left cmd") { key = "lCmd"; size = 100;};
				if ( key == "backspace") { key = "bkspc"; size = 100;};
				if ( key == "page up") { key = "pgUp"; size = 100;};
				if ( key == "page down") { key = "pgDn"; size = 100;};
				if ( key == "insert") { size = 100;};
				if ( key == "space") { size = 100;};
				if ( key == "tab") { size = 100;};
				
				Destroy(GetComponentInChildren(textScale));
				transform.GetChild(0).gameObject.AddComponent(textScale).textSize = size;
				
				// Update the GUI Text
				GetComponentInChildren(GUIText).guiText.text = key;
				
				// Revert the colors
				GetComponentInChildren(GUIText).guiText.material.color = Color(1,1,1);
				gameObject.renderer.material.color = Color(1,1,1);
				if ( lighterBG == true ){gameObject.renderer.material.color.a = .2;}
				else{gameObject.renderer.material.color.a = 0.1;};
				
				// Clear the input string
				key = "";
			}
			else{
				listening = false; // Stop listening
				matrixController.anotherListening = false;
				
				// Revert the colors
				GetComponentInChildren(GUIText).guiText.material.color = Color(1,1,1);
				gameObject.renderer.material.color = Color(1,1,1);
				if ( lighterBG == true ){gameObject.renderer.material.color.a = .2;}
				else{gameObject.renderer.material.color.a = 0.1;};
				
				// Clear the input string
				key = "";
			};
		};
	};
}

function onRaycastHit () { // Function if hit by a ray
	if ( listening == false && matrixController.anotherListening == false ){
		gameObject.renderer.material.color.a = .5;
		hover = true;
		if (Input.GetMouseButton(0)){ // If LMouse down
			buttonDown();
		};
		if (Input.GetMouseButtonUp(0)){ // If LMouse Up
			Action(); // Do stuff
		};
		revert = 0; //Resets the timer to reset the button texture when hit by another ray
	};
}

function buttonDown () {
	// This is a separate function so it can be easily called from the button helper
	// (If it used textures, it wouldn't be an issue)
	gameObject.renderer.material.color = Color(1,1,1,1);
	GetComponentInChildren(GUIText).guiText.material.color = Color(0,0,0);
}

function clear () {
	// Revert the transparency
	if ( lighterBG == true ){gameObject.renderer.material.color.a = .2;}
	else{gameObject.renderer.material.color.a = 0.1;};
	GetComponentInChildren(GUIText).guiText.material.color = Color(1,1,1);
	hover = false;
}

function Action () {
	if ( matrixController.anotherListening == false ){
		gameObject.renderer.material.color = Color(0,2/3,1,1);
		listening = true;
		matrixController.anotherListening = true;
		GetComponentInChildren(GUIText).guiText.material.color = Color(1,1,1);
	};
}

function verify () {
	// Check the key string to make sure there aren't any keybinding duplicates
	okay = true;
	
	//Begin obscenely long if statement
	if (key == PlayerPrefs.GetString("a1Key") ||
		key == PlayerPrefs.GetString("a1KeyAlt") ||
		key == PlayerPrefs.GetString("a2Key") ||
		key == PlayerPrefs.GetString("a2KeyAlt") ||
		key == PlayerPrefs.GetString("a3Key") ||
		key == PlayerPrefs.GetString("a3KeyAlt") ||
		key == PlayerPrefs.GetString("a4Key") ||
		key == PlayerPrefs.GetString("a4KeyAlt") ||
		key == PlayerPrefs.GetString("a5Key") ||
		key == PlayerPrefs.GetString("a5KeyAlt") ||
		key == PlayerPrefs.GetString("upKey") ||
		key == PlayerPrefs.GetString("upKeyAlt") ||
		key == PlayerPrefs.GetString("downKey") ||
		key == PlayerPrefs.GetString("downKeyAlt") ||
		key == PlayerPrefs.GetString("leftKey") ||
		key == PlayerPrefs.GetString("leftKeyAlt") ||
		key == PlayerPrefs.GetString("rightKey") ||
		key == PlayerPrefs.GetString("rightKeyAlt") ||
		key == "`"){ okay = false; };
}