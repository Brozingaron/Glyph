#pragma strict

// Responsible for animating the death header, background & background color change

var fadeOnly : boolean = false;
var slide : boolean = false;
var width : float; //Height of the object to scale it properly
var height : float; //Width of the object for similar reasons

function Start () {
	if (fadeOnly == false ){
		if ( slide == false ){
			iTween.ScaleFrom(gameObject,{"x":width,"y":0,"easetype":"easeOutSine","time":.5,"delay":2});
			iTween.MoveFrom(gameObject,{"y":10.8,"easetype":"easeOutSine","time":.5,"delay":2});
			iTween.FadeFrom(gameObject,{"alpha":0,"easetype":"easeOutSine","time":.3,"delay":2.2});
		}
		else{
			iTween.MoveFrom(gameObject,{"y":-54 - height / 2,"easetype":"easeOutBack","time":.5,"delay":3});
			iTween.FadeFrom(gameObject,{"alpha":0,"easetype":"easeOutSine","time":.1,"delay":3});
		};
	}
	else {
		// Gradually fade in the high score background
		iTween.FadeFrom(gameObject,{"alpha":0,"easetype":"easeOutSine","time":2.5,"delay":2.5});
		
		// The background's event is also responsible for external events
		iTween.ColorTo(GameObject.Find("Background Color"),{"Color":Color(.4,.4,.4),"time":1,"delay":0.5}); // Fades the BG color to grey
		GameObject.Find("Main Camera").GetComponent(raySpam).on = true; // Resume spamming rays
	};
}

function Update () {

}