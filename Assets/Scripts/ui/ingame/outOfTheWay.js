#pragma strict

//As you might have guessed, this script is very assertive
//If the player is within a certain area, the attatched game object will fade to show it

var player : GameObject;
var leftBoundary : float;
var rightBoundary : float;
var bottomBoundary : float;
var count : int = 0; // The number of entities in the range of the fading area

private var transparent : boolean = false;

function Update () {
	if (count >= 1 && transparent == false){
		iTween.Stop(gameObject);
		iTween.FadeTo(gameObject,{"alpha":0.75,"time":0.25,"easetype":"easeOutCirc"});
		transparent = true;
	};
	if (count == 0 && transparent == true){
		iTween.Stop(gameObject);
		iTween.FadeTo(gameObject,{"alpha":1,"time":0.25,"easetype":"easeOutCirc"});
		transparent = false;
	};
}