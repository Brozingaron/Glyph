#pragma strict

// This script changes gamemodes so that they can be unlocked

// Requirements of the button
var boolRequirement : String; // The name of an entry in the player prefs that must have a value of 1
var scoreRequirementMode : String; // The gamemode where a minimum score must be acquired
var scoreRequirementValue : int; // The minimum required value of said score

var lockedTexture : Texture2D; // The texture of the locked button

function Start () {
	if( PlayerPrefs.GetInt(boolRequirement) == 1 && PlayerPrefs.GetInt(scoreRequirementMode + "HS") >= scoreRequirementValue ){
		gameObject.GetComponent(button).enabled = true;
	}
	else{
		Destroy(gameObject.GetComponent(button));
		gameObject.renderer.material.mainTexture = lockedTexture;
	}
	Destroy(this); //This component is no longer needed
}