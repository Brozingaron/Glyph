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
		"Nouns!",
		"Science!",
		"Uses calculus!",
		"Uses trig!",
		"Uses JavaScript!",
		"0% Undead!",
		"Yours for only $0.00!",
		"Tell your friends!",
		"Use ALL the references!",
		"Swamp for game!",
		"It's me! I was the turkey all along!",
		"Definetly doesn't use the Konami Code!",
		// Programming & Math
		"JavaScript!",
		"C++ != D",
		"We need more semicolons!",
		"var score = 4294967297",
		"sin(x) = 4",
		"Simplifies dy/dx to y/x!",
		"while(x=10){x=10};",
		// Computer stuffs
		"0 RPM!",
		"1 real and 47 virtual cores!",
		cpu.Substring(cpu.IndexOf("@")+1)+"!",
		cpu.Substring(cpu.IndexOf("@")+1)+"? My wifi is faster than that",
		SystemInfo.graphicsMemorySize + "MB!",
		"All your clock cycles are belong to us",
		// Gaming
		"Think with Portals!",
		"SPAAAAAAAAAAACE!",
		"Also try Minecraft!",
		"Also try Tilt to Live!",
		"It's like Tilt to Live but with less tilting!",
		//xkcd
		"sudo make me a sandwich",
		"thisAlgorithmBecomingSkynetCost = 9999999999",
		// Monty Python
		"Are you suggesting coconuts migrate?",
		"'Tis but a scratch!",
		"She turned me into a newt! It got better...",
		"And the breakfast cereals!",
		"Five is right out!",
		// Douglas Adams
		"Don't Panic.",
		"I never could get the hang of Thursdays",
		"Hi there!",
		"Don't forget your towel!",
		"Oh no, not again.",
		"6 x 9 = 42",
		"6 x 9 = 4.36217102940856442472!" //SOURCE: http://www.wolframalpha.com/input/?i=X+factorial%3D42
	];
	
	// Pick a splash text at random
	transform.FindChild("Splash Text").GetComponent(TextMesh).text = '' + splashes[Random.Range(0,splashes.length - 1)];
}