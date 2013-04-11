#pragma strict

//Animates objects in and out when changing scenes
//All scene changes should go through this script

var newScene : int; // The new scene's index number
var timeout : float = 0.0; // Initialize the timer
var animTime : float = 0.2; // Time it takes for the animation to finish
var Background : GameObject; //Background Prefab

function Start () {
	newScene = Application.loadedLevel; // Get the current loaded level to compare it later
	// Animate in the elements if an animation tag is in the scene
	if (GameObject.FindWithTag("zoom") != null ){
		iTween.ScaleFrom(GameObject.FindWithTag("zoom"),{"x":0,"y":0,"easetype":"easeOutBack","time":0.5}); // Zoom animation scale
		iTween.FadeFrom(GameObject.FindWithTag("zoom"),{"alpha":0,"easetype":"easeOutSine","time":0.2}); // Zoom animation fade
	};
	if (GameObject.FindWithTag("slideup") != null ){	
		iTween.MoveFrom(gameObject.FindWithTag("slideup"),{"y":-60,"easetype":"easeOutElastic","time":1.25});
	};
		if (GameObject.FindWithTag("slidedown") != null ){
		iTween.MoveFrom(gameObject.FindWithTag("slidedown"),{"y":54 + gameObject.FindWithTag("slidedown").transform.localScale.y / 2,"easetype":"easeOutElastic","time":1});
	};
	// Add the background to the scene if it's not there already
	// Mostly for development purposes
	if (GameObject.Find("Background") == null && GameObject.Find("Background(Clone)") == null){
		Instantiate(Background,Vector3(0,0,-90),Quaternion.Euler(0,0,0));
	};
}

function Update () {
	if ( newScene != Application.loadedLevel ){ // If the new level is different from the other one, start the counter
		timeout += Time.deltaTime;
	};
	if ( timeout > animTime ){ // If the timer finishes, load the new level
		if (newScene == -1 || newScene == -2){
			if (newScene == -1){Application.LoadLevel(Application.loadedLevel);}; // If the newScene is -1, reload this scene
			if (newScene == -2){Application.Quit();}; // If the newScene is -2, quit the game
		}
		//Otherwise, proceed to load that level
		else{
			Application.LoadLevel(newScene);
		}
	};
}

function change () {
	iTween.ColorTo(GameObject.Find("Background Color"),{"Color":Color(0,.373,.753),"time":.2}); //Reset the background color to its default
	if (GameObject.FindWithTag("zoom") != null ){ //Only animate if a tag exists
		// Zoom animation scale to 10x original object's size
		iTween.ScaleTo(GameObject.FindWithTag("zoom"),{"x":GameObject.FindWithTag("zoom").transform.localScale.x * 10,"y":GameObject.FindWithTag("zoom").transform.localScale.y * 10,"easetype":"easeOutSine","time":1});
		iTween.FadeTo(GameObject.FindWithTag("zoom"),{"alpha":0,"easetype":"easeOutSine","time":0.2}); // Zoom animation fade
	};
	if (GameObject.FindWithTag("slideup") != null ){	
		iTween.MoveTo(gameObject.FindWithTag("slideup"),{"y":-54 - gameObject.FindWithTag("slideup").transform.localScale.y / 2,"easetype":"easeInBack","time":1,"delay":1});
	};
	if (GameObject.FindWithTag("slidedown") != null ){
		iTween.MoveTo(gameObject.FindWithTag("slidedown"),{"y":54 + gameObject.FindWithTag("slidedown").transform.localScale.y / 2,"easetype":"easeOutElastic","time":1});
	};
}