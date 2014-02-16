#pragma strict

// Define button components like seperators
private var topSep : GameObject; // Top Seperator
private var botSep : GameObject; // Bottom Seperator
private var lefSep : GameObject; // Left Seperator
private var rigSep : GameObject; // Right Seperator

// Some internal variables to keep track of
private var easeType : String = "easeOutQuint";
private var isActive : boolean = false;
private var t : float;

// Which scene this button should switch to
// A value of 0 does not change the scene
// A value of -1 reloads the current scene
// A value of -2 kills the game
// Any positive value tries to load that scene number
var newScene : int;

function Start () {
	topSep = transform.Find("Global Transform").transform.Find("Top Seperator").gameObject;
	botSep = transform.Find("Global Transform").transform.Find("Bottom Seperator").gameObject;
	lefSep = transform.Find("Global Transform").transform.Find("Left Seperator").gameObject;
	rigSep = transform.Find("Global Transform").transform.Find("Right Seperator").gameObject;
	Inactive();
}

function Update () {
	if (isActive){
		if (t >= Time.deltaTime){
			Inactive();
		}
		else{
			if (Input.GetMouseButtonDown(0)){
				Click();
			};
			if (Input.GetMouseButtonUp(0)){
				Inactive();
				Action();
			};
		};
		t += Time.deltaTime;
	};
}

function onRaycastHit () {
	if (!isActive){
		Active();
	};
	t = 0;
}

function Action () {
	if (newScene != 0){
		GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = newScene;
	};
}

// The functions below are called to animate and change the button materials

function Active () {
	iTween.ColorTo(gameObject,{"color":Color(1,1,1,0.1),"includechildren":false,"time":0.5,"easetype":easeType});
	iTween.ColorTo(topSep,{"color":Color(1,1,1,0.5),"time":0.5,"easetype":easeType});
	iTween.ColorTo(botSep,{"color":Color(1,1,1,0.5),"time":0.5,"easetype":easeType});
	iTween.ColorTo(lefSep,{"color":Color(1,1,1,0.5),"time":0.5,"easetype":easeType});
	iTween.ColorTo(rigSep,{"color":Color(1,1,1,0.5),"time":0.5,"easetype":easeType});
	isActive = true;
}

function Inactive () {
	iTween.ColorTo(gameObject,{"color":Color(1,1,1,0),"includechildren":false,"time":0.5,"easetype":easeType});
	iTween.ColorTo(topSep,{"color":Color(1,1,1,0.25),"time":0.5,"easetype":easeType});
	iTween.ColorTo(botSep,{"color":Color(1,1,1,0.25),"time":0.5,"easetype":easeType});
	iTween.ColorTo(lefSep,{"color":Color(1,1,1,0.25),"time":0.5,"easetype":easeType});
	iTween.ColorTo(rigSep,{"color":Color(1,1,1,0.25),"time":0.5,"easetype":easeType});
	isActive = false;
}

function Click () {
	iTween.ColorTo(gameObject,{"color":Color(1,1,1,0.5),"includechildren":false,"time":0.5,"easetype":easeType});
	iTween.ColorTo(topSep,{"color":Color(1,1,1,0.75),"time":0.5,"easetype":easeType});
	iTween.ColorTo(botSep,{"color":Color(1,1,1,0.75),"time":0.5,"easetype":easeType});
	iTween.ColorTo(lefSep,{"color":Color(1,1,1,0.75),"time":0.5,"easetype":easeType});
	iTween.ColorTo(rigSep,{"color":Color(1,1,1,0.75),"time":0.5,"easetype":easeType});
}