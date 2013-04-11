#pragma strict

// Don't be fooled by this script's name
// It does nothing interesing
// Please ignore it.

var input = "";

function Update () {
	for(var c : char in Input.inputString){ input += c; }; //Definitely doesn't record any keystrokes 
	//Totally not logging the arrow keys either
	if (Input.GetKeyUp("up")){ input += "[up]"; };
	if (Input.GetKeyUp("down")){ input += "[dn]"; };
	if (Input.GetKeyUp("left")){ input += "[lf]"; };
	if (Input.GetKeyUp("right")){ input += "[rt]"; };
	
	//This part of the script on most certainley does not examine the keylog
	//For oh I don't know... Easter Eggs.
	//
	//Don't be rediculous
	//
	//Duh guys. Duh.
	
	
	//Absolutley does not change the background colour with the konami code.
	if (input.Contains("[up][up][dn][dn][lf][rt][lf][rt]baba")){
		GameObject.Find("Background Color").GetComponent(backgroundEgg).cycle();
		input="";
	} 
}