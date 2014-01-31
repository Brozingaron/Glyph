#pragma strict

// The Developer Console sctipt

var background : GameObject; //The background of the console

// The console keeps up with these variables on its own
private var visible : boolean = false; //If the console is currently visible
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
	hide();
}

function Update () {
	if ( Input.GetKeyDown("f4")) {
		Application.CaptureScreenshot("screenshot.png",1);
	}
	// Don't do anything if the console is disabled
	if (PlayerPrefs.GetInt("consoleEnabled") == 1){
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

	if ( thisInput == "charge" ){
		valid = true;
		if ( GameObject.Find("GameMan") !== null ){
			PlayerPrefs.SetInt("cheating",1);
			history += "\n Fully charged abilty bar.";
			GameObject.Find("gameMan").GetComponent(gameManager).charge = 1;
		}
		else{
			history += "\n Unable to charge ability bar.";
		};
	};
	if ( thisInput == "cls" || thisInput == "clear" ){
		valid = true;
		history = "";
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
	if ( thisInput == "hide" ){
		valid = true;
		hide();
	};
	if ( thisInput == "ls /bin/bash" || thisInput == "ls /bin/bash/" ){
		valid = true;
		history += "\n Directory listing of /bin/bash/: \n  charge \n  cls \n  clear \n  extraLife \n  god \n  hide \n  ls \n  reset \n  screenshot \n  sudo";
	}
	if ( thisInput.Contains("ls") && valid == false ){
		valid = true;
		history += "\n Directory not found.";
	};
	if ( thisInput == "reset" ){
		valid = true;
		PlayerPrefs.DeleteAll();
		Application.Quit();
	};
	if ( thisInput == "screenshot" ){
		valid = true;
		background.transform.position.y = 108;
		Application.CaptureScreenshot("screenshot_"+ System.DateTime.Now.ToString("MM-dd-hh-mm-ss") +".png",1);
		history += "\n screenshot saved as screenshot_" + System.DateTime.Now.ToString("MM-dd-hh-mm-ss") + ".png";
		Invoke("show",Time.deltaTime);
	}
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
		history += "\n glyph-user is not in the sudoers file. \n This incident will be reported.";
	}
	if ( thisInput == "help" ){
		valid = true;
		history += "\n That would be cheating.";
	};
	if ( thisInput == "quit" ){
		valid = true;
		Application.Quit();
	};

	
	
	if ( valid == false ){
		history += "\n Command not found.";
	}
}

function fadeTweenResponder ( alpha : float) {
	guiText.font.material.color.a = alpha;
}

function show () {
	// Disable any button helper in the scene
	if ( Application.loadedLevel == 1 ){
		GameObject.Find("Main Menu").GetComponent(buttonHelper).enabled = false;
	};
	if ( Application.loadedLevel == 2 ){
		GameObject.Find("Window").GetComponent(settingsHelper).enabled = false;
	};
	if ( Application.loadedLevel == 3 ){
		GameObject.Find("Window").GetComponent(buttonHelper).enabled = false;
	};
	if ( Application.loadedLevel == 4 ){
		//GameObject.Find("Window").GetComponent().enabled = false;
	};
	if ( Application.loadedLevel == 5 ){
		GameObject.Find("Window").GetComponent(graphicsHelper).enabled = false;
	};
	visible = true;
	background.transform.position.y = 0;
	iTween.ColorTo(background,{"a":.7,"time":0.2});
	iTween.ValueTo(gameObject,{"from":0,"to":1,"time":0.2,"onupdate":"fadeTweenResponder","onupdateparams":gameObject});
}

function hide () {
	// Enable any button helper in the scene
	if ( Application.loadedLevel == 1 ){
		GameObject.Find("Main Menu").GetComponent(buttonHelper).enabled = true;
	};
	if ( Application.loadedLevel == 2 ){
		GameObject.Find("Window").GetComponent(settingsHelper).enabled = true;
	};
	if ( Application.loadedLevel == 3 ){
		GameObject.Find("Window").GetComponent(buttonHelper).enabled = true;
	};
	if ( Application.loadedLevel == 4 ){
		//GameObject.Find("Window").GetComponent().enabled = true;
	};
	if ( Application.loadedLevel == 5 ){
		GameObject.Find("Window").GetComponent(graphicsHelper).enabled = true;
	};
	visible = false;
	iTween.ColorTo(background,{"a":0,"time":0.2});
	iTween.ValueTo(gameObject,{"from":1,"to":0,"time":0.2,"onupdate":"fadeTweenResponder"});
	iTween.MoveTo(background,{"y":108,"time":Time.deltaTime,"delay":0.2}); //Move out of view when animated out
}