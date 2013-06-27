#pragma strict

// This script changes the main menu's splash text.
// Exciting.

private var splashes = [];
private var cpu : String;
private var tweenedExit : boolean = false;
var sceneMan : sceneManager;

function Start () {
	cpu = "" + SystemInfo.processorType;
	// Define ALL the splash texts
	splashes = [
		// Generic
		"Magikarp used splash text!",
		"Insanity. Not even once.",
		"No. Insane mode is not broken.",
		"Nouns!",
		"Science!",
		"Try using Z, X, and C!",
		"0% Undead!",
		"Yours for only $0.00!",
		"Tell your friends!",
		"Use ALL the references!",
		"Swamp for game!",
		"It's me! I was the turkey all along!",
		"Definetly doesn't use the Konami Code!",
		// Programming
		"JavaScript!",
		"C++ != D",
		"We need more semicolons!",
		"sin(x) = 4",
		"while(x=10){x=10};",
		// Computer stuffs
		"0 RPM!",
		"1 real and 47 virtual cores!",
		cpu.Substring(cpu.IndexOf("@")+1)+"!",
		cpu.Substring(cpu.IndexOf("@")+1)+"? My wifi is faster than that",
		SystemInfo.graphicsMemorySize + "MB!",
		"All your clock cycles are belong to us",
		// Portal
		"Think with Portals!",
		"SPAAAAAAAAAAACE!",
		// Monty Python
		"Are you suggesting coconuts migrate?",
		"'Tis but a scratch!",
		"She turned me into a newt! It got better...",
		"And the breakfast cereals!",
		"Five is right out!",
		"1... 2... 5!",
		// Douglas Adams
		"Don't Panic.",
		"I never could get the hang of Thursdays",
		"Hi there!",
		"Don't forget your towel!",
		"Oh no, not again.",
		"6 x 9 = 42"
	];
	
	// Pick a splash text at random
	guiText.text = '' + splashes[Random.Range(0,splashes.length - 1)];
	// Tween to match background
	iTween.MoveFrom(gameObject,{"y":-0.025,"easetype":"easeOutElastic","time":1.25});
}

function Update () {
	if (tweenedExit == false && sceneMan.newScene != Application.loadedLevel){
		iTween.MoveTo(gameObject,{"y":-0.025,"easetype":"easeOutElastic","time":1.25});
		tweenedExit = true;
	};
	
}