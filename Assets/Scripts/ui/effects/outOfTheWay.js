#pragma strict

//As you might have guessed, this script is very assertive
//If the player is within a certain area, the attatched game object will fade to show it

var player : GameObject;
var leftBoundary : float;
var rightBoundary : float;
var bottomBoundary : float;

private var transparent = 0;

function Start () {
}

function Update () {
	if (player.transform.position.y >= bottomBoundary){
		if (player.transform.position.x < leftBoundary){
			if (player.transform.position.x > rightBoundary){
				if(transparent == 0){
					iTween.FadeTo(gameObject,{"alpha":0.75,"time":0.25,"easetype":"easeOutCirc"});
					transparent = 1;
				};
			};
		};
	};
	else{
		if(transparent == 1){
			iTween.FadeTo(gameObject,{"alpha":1,"time":0.25,"easetype":"easeOutCirc"});
			transparent = 0;
		};
	};
}