#pragma strict

// Animate in text for scores & whatnot

private var sceneMan : sceneManager;

function Awake () {
	// Animate the text size
	iTween.ValueTo(gameObject,{"from":0,"to":gameObject.guiText.fontSize,"easetype":"easeOutElastic","Time":1,"onupdate":"tweenSize","onupdateparams":"float","delay":1.5});
	iTween.MoveFrom(gameObject,{"y":2,"time":0,"delay":1.5});
	
	// Find the scene manager
	sceneMan = GameObject.Find("Main Camera").GetComponent(sceneManager);
}

function Update () {
	// Destroy when scene changes
	if ( sceneMan.newScene != Application.loadedLevel ){
		transform.position.y = 2;
	};
}

function tweenSize (scale : float){
	// iTween reference function to tween font size
	gameObject.guiText.fontSize = scale;
}