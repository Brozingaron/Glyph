#pragma strict

//Fades the Splash Screen out of view

function Start () {
	//transform.eulerAngles.y = 0; //Set the Y rotation to 0, the splash object is kept at 180 degrees to keep it out of the way during development
	iTween.FadeTo(gameObject,{"alpha":0.0,"time":1.0,"delay":2.0,"easetype":"easeInOutQuart"}); //iTween Function
	Destroy (gameObject,4); //Destroy the object after 5 seconds
	GameObject.Find("Main Camera").GetComponent(sceneManager).newScene = 1;
	GameObject.Find("Main Camera").GetComponent(sceneManager).animTime = 3;
}