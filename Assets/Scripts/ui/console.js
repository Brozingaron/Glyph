#pragma strict

// The Developer Console sctipt

var background : GameObject; //The background of the console

// The console keeps up with these variables on its own
private var isEnabled : boolean = false; //If the console is enabled
private var visible : boolean = false; //If it's currently visible
private var thisInput : String = ""; //The current command
private var history : String = ""; //All other text in the console
private var valid : boolean = false; //If the last entered command was processed

function Start () {
	//Hide the console
	background.transform.position.y = 108;
	background.renderer.material.color.a = 0;
	guiText.font.material.color.a = 0;
	
	//The player can't be cheating right as a level loads
	if ( PlayerPrefs.HasKey("cheating") ){
		PlayerPrefs.DeleteKey("cheating");
	};
	
	// Enable or disable the console as defined by player prefs
	if (PlayerPrefs.GetInt("console") == 1 ){
		isEnabled = true;
	}
	else{
		isEnabled = true;
	}

	//Horrible ASCII Art, GO!
	//Geo isn't a monospace font. Deal with it.
	history =	"        GGGGGGG  LL            YY     YY     PPPPPP    HH       HH" + "\n" +
				"      GG              LL            YY     YY     PP    PP    HH       HH" + "\n" +
				"    GG  GGGG   LL           YYYYYY    PPPPPP     HHHHHHH" + "\n" +
				"  GG       GG   LL                YY        PP              HH       HH" + "\n" +
				"GGGGGGG  LLLLLLL    YY        PP             HH       HH" + "\n";

}

function OnLevelLoaded () {
	Start();
}

function Update () {
	// Don't do anything if the console is disabled
	if (isEnabled == true){
		if (Input.GetButtonDown("console") == true){
			if (visible == true){
				hide();
			}
			else{
				show();
			}
		};
		
		if ( visible ){
			for (var c : char in Input.inputString) {
				// Backspace
				if (c == "\b"[0]) {
					if (thisInput.Length != 0)
					thisInput = thisInput.Substring(0, thisInput.Length - 1);
				}
				// Enter
				else if (c == "\n"[0] || c == "\r"[0]) {// "\n" for Mac, "\r" for windows.
					// Record this entry, parse it, and clear the input
					history += "\n" + thisInput;
					parse();
					thisInput = "";
				}
				// Normal text input - just append to the end
				else if (c != "`" ) {
					thisInput += c;
				}
			}
			
			// Update the GUI Text
			guiText.text = history + "\n \n ~?" + thisInput;
		};
	};
}

function parse () {
	// Use ALL the if statements
	valid = false;
	if ( thisInput == "god"){
		valid = true;
		if ( GameObject.Find("Soul") !== null ){
			PlayerPrefs.SetInt("cheating",1);
			history += "\n Godmode enabled.";
			GameObject.Find("Soul").GetComponent(death).god = true;
		}
		else{
			history += "\n Unable to enter godmode";
		};
	};
	if ( thisInput == "charge" ){
		valid = true;
		if ( GameObject.Find("GameMan") !== null ){
			PlayerPrefs.SetInt("cheating",1);
			history += "\n Fully charged abilty bar.";
			GameObject.Find("GameMan").GetComponent(gameManager).charge = 1;
		}
		else{
			history += "\n Unable to charge ability bar.";
		};
	};
	if ( thisInput == "extraLife" ){
		valid = true;
		if ( GameObject.Find("GameMan") !== null ){
			PlayerPrefs.SetInt("cheating",1);
			history += "\n Added 1 life.";
			GameObject.Find("GameMan").GetComponent(gameManager).lives += 1;
		}
		else{
			history += "\n Unable to charge ability bar.";
		};
	};
	if ( thisInput == "cls" || thisInput == "clear" ){
		valid = true;
		history = "";
	};
	if ( thisInput == "sudo" ){
		valid = true;
		history += "\n sudo what?";
	};
	if ( thisInput == "make me a sandwich" ){
		valid = true;
		history += "\n What? Make it yourself.";
	};
	if ( thisInput == "sudo make me a sandwich"){
		valid = true;
		history += "\n okay.";
	};
	if ( thisInput.Contains("sudo") && valid == false){
		valid = true;
		history += "\n glyph-user is not in the sudoers file. /n This incident will be reported.";
	}
	if ( thisInput == "help" ){
		valid = true;
		history += "\n That would be cheating.";
	};
	if ( thisInput == "quit" ){
		valid = true;
		Application.Quit();
	};
	if ( thisInput == "hide" ){
		valid = true;
		hide();
	};
	if ( thisInput == "ls /bin/bash" || thisInput == "ls /bin/bash/" ){
		valid = true;
		history += "\n Directory listing of /bin/bash/: \n  charge \n  cls \n  clear \n  god \n  hide \n  sudo \n  ls";
	}
	if ( thisInput.Contains("ls") && valid == false ){
		valid = true;
		history += "\n Directory not found.";
	};
	
	
	if ( valid == false ){
		history += "\n Command not found.";
	}
}

function fadeTweenResponder ( alpha : float) {
	guiText.font.material.color.a = alpha;
}

function show () {
	visible = true;
	background.transform.position.y = 0;
	iTween.ColorTo(background,{"a":.7,"time":0.2});
	iTween.ValueTo(gameObject,{"from":0,"to":1,"time":0.2,"onupdate":"fadeTweenResponder","onupdateparams":gameObject});
}

function hide () {
	visible = false;
	iTween.ColorTo(background,{"a":0,"time":0.2});
	iTween.ValueTo(gameObject,{"from":1,"to":0,"time":0.2,"onupdate":"fadeTweenResponder"});
}