#pragma strict

//Fades the Splash Screen out of view

var blank : boolean = false; // If this object is the empty screen or the image

function Start () {
	if (blank == false){
		iTween.FadeTo(gameObject,{"alpha":0.0,"time":1.0,"delay":4,"easetype":"easeInOutQuart"}); //iTween Function
		Destroy (gameObject,10); //Destroy the object after 10 seconds
		GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = 1;
		GameObject.Find("Main Camera").GetComponent(sceneManager).animTime = 5;
	}
	else{
		iTween.FadeTo(gameObject,{"alpha":0.0,"time":0.5,"easetype":"easeInOutQuart"}); // iTween
		Destroy (gameObject,10); //Destroy the object after 1 second
	}
}