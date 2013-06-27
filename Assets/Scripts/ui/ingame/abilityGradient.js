#pragma strict

// This secript manages gradients for the ability bar

var section : int = 1; //Which part of the bar to act as
//Define materials
var full : UnityEngine.Material;
var filling : UnityEngine.Material;
var empty : UnityEngine.Material;
var blank : UnityEngine.Material;

var textChild : GameObject;

private var gameMan : gameManager;
private var animated : boolean = false;
private var deanimated : boolean = true;
private var gone : boolean = false;

function Start () {
	gameMan = GameObject.Find("gameMan").GetComponent(gameManager); // Define the gameManager
	textChild.renderer.material.color.a = .5; // Have the labels dimmed by default
}

function Update () {
	if ( gameMan.charge >= .25 * section ){
		// If this bar is fully charged, change its material to the fully charged bar
		renderer.material = full;
		chargeAnim();
	}
	else{
		// If this bar isn't fully charged and it can be charged, see if it's totally empty or partially charged
		if ( gameMan.charge - ( .25 * ( section - 1 ) ) >= 0 && gameMan.chargeMax >= .25 * section){
			// If the charge level - the mimimum charge for this ability isn't negative, it's filling
			renderer.material = filling;
			// Set the texture offset
			renderer.material.SetTextureOffset("_MainTex",Vector2(0.5 - (gameMan.charge - ( .25 * ( section - 1 ) ) ) * 2,0));
			dechargeAnim();
		}
		else{
			if ( gameMan.chargeMax < .25 * section ){
				// If the max ability charge won't fill this bar, set its material to the unaviliable one
				renderer.material = blank;
				// Also change textChild's alpha
				textChild.renderer.material.color.a = .05;
			}
			else{
				// If this bar can be charged, set the texture to empty
				renderer.material = empty;
				dechargeAnim();
			};
		}
	};
	// Slide the object out of view
	if ( gameMan.dead == true && gone == false ){
		gone = true;
		iTween.MoveTo(gameObject,{"y":-54 - transform.localScale.y / 2,"easetype":"easeInBack","time":1,"delay":1});
		// The Bar Game Object was being arbitrary and I don't know why
		// This compensates for that fact
		iTween.MoveTo(GameObject.Find("Bar"),{"y":-54 - transform.localScale.y / 2,"easetype":"easeInBack","time":1,"delay":1});
	};
}

function chargeAnim () {
	if ( animated == false){
		// Don't fade in again, but fade out next time
		deanimated = false;
		animated = true;
		
		// Change the bar's opacity
		iTween.FadeFrom(gameObject,{"alpha":0.5,"easetype":"easeOutQuint","time":0.25});
		
		// Change the label's opacity
		iTween.FadeTo(textChild,{"alpha":1,"easetype":"easeOutQuint","time":0.5});
	}
}

function dechargeAnim () {
	if ( deanimated == false ){
		// Don't fade out again, but fade in next time
		deanimated = true;
		animated = false;
		
		// Change the bar's opacity
		iTween.FadeTo(gameObject,{"alpha":0.5,"easetype":"easeOutQuint","time":0.5});
		
		// Change the label's opacity
		iTween.FadeTo(textChild,{"alpha":0.5,"easetype":"easeOutQuint","time":0.5});
	}
}