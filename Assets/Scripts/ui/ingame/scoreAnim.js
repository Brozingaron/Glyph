#pragma strict

// Animate in text for scores & whatnot

private var sceneMan : sceneManager;

function Start () {
	Invoke("Animate",Time.deltaTime);
	
	// Disable this object's GUI Text until it animates in
	gameObject.GetComponent(GUIText).enabled = false;
	
	// Find the scene manager
	sceneMan = GameObject.Find("Main Camera").GetComponent(sceneManager);
}

function Animate () {
	// Animate the text size
	iTween.ValueTo(gameObject,{"from":0,"to":gameObject.guiText.fontSize,"easetype":"easeOutElastic","Time":1,"onupdate":"tweenSize","onupdateparams":"float","delay":1.5});
}

function Update () {
	// Destroy when scene changes
	if ( sceneMan.newScene != Application.loadedLevel ){
		transform.position.y = 2;
	};
}

function tweenSize (scale : float){
	gameObject.GetComponent(GUIText).enabled = true;
	// iTween reference function to tween font size
	gameObject.guiText.fontSize = scale;
}