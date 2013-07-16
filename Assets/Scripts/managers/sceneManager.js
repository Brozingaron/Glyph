#pragma strict

//Animates objects in and out when changing scenes
//All scene changes should go through this script

var newScene : int; // The new scene's index number
var timeout : float = 0.0; // Initialize the timer
var animTime : float = 0.2; // Time it takes for the animation to finish
var Background : GameObject; //Background Prefab
var musicManPrefab : GameObject; // Music Manager Prefab
var consolePrefab : GameObject; // console Prefab

function Start () {
	newScene = Application.loadedLevel; // Get the current loaded level to compare it later
	// Animate in the elements if an animation tag is in the scene
	if (GameObject.FindWithTag("zoom") != null ){
		iTween.ScaleFrom(GameObject.FindWithTag("zoom"),{"x":0,"y":0,"easetype":"easeOutBack","time":0.5}); // Zoom animation scale
		iTween.FadeFrom(GameObject.FindWithTag("zoom"),{"alpha":0,"easetype":"easeOutSine","time":0.2}); // Zoom animation fade
	};
	if (GameObject.FindWithTag("slideup") != null ){	
		iTween.MoveFrom(gameObject.FindWithTag("slideup"),{"y":-54 - gameObject.FindWithTag("slideup").transform.localScale.y / 2,"easetype":"easeOutElastic","time":1});
	};
	if (GameObject.FindWithTag("slidedown") != null ){
		iTween.MoveFrom(gameObject.FindWithTag("slidedown"),{"y":54 + gameObject.FindWithTag("slidedown").transform.localScale.y / 2,"easetype":"easeOutElastic","time":1});
	};
	// Add the background & Music Manager to the scene if they're not there already
	// Mostly for development purposes
	if (GameObject.Find("Background") == null && GameObject.Find("Background(Clone)") == null){
		Instantiate(Background,Vector3(0,0,-90),Quaternion.Euler(0,0,0));
	};
	if (GameObject.Find("Music") == null && GameObject.Find("Music(Clone)") == null ){
		Instantiate(musicManPrefab,Vector3(0,0,0),Quaternion.Euler(0,0,0));
	};
	if (GameObject.Find("Console") == null && GameObject.Find("Console(Clone)") == null ){
		Instantiate(consolePrefab,Vector3(24,108,90),Quaternion.Euler(90,0,0));
	};
	// Hide the background if needed
	if (Application.loadedLevel == 8){
		GameObject.Find("Faded").renderer.material.color.a = 0;
		GameObject.Find("Solid").renderer.material.color.a = 0;
		GameObject.Find("Thin").renderer.material.color.a = 0;
		GameObject.Find("Vignette").renderer.material.color.a = 0;
		GameObject.Find("White").renderer.material.color.a = 0;
		GameObject.Find("Background Color").renderer.material.color.a = 0;
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
	//Deactivate RaySpam
	GameObject.Find("Main Camera").GetComponent(raySpam).Deactivate();
	
	//Animate ALL the things
	if (newScene != 8 && newScene != -1 && newScene != 7 ){
		iTween.ColorTo(GameObject.Find("Background Color"),{"Color":Color(0,.373,.753),"time":0.2}); //Reset the background color to its default
		// Fade in the starbursts
		iTween.ColorTo(GameObject.Find("Faded"),{"a":1,"time":0.2});
		iTween.ColorTo(GameObject.Find("Solid"),{"a":1,"time":0.2});
		iTween.ColorTo(GameObject.Find("Thin"),{"a":1,"time":0.2});
		iTween.ColorTo(GameObject.Find("Vignette"),{"a":1,"time":0.2});
		iTween.ColorTo(GameObject.Find("White"),{"a":1,"time":0.2});
	};
	if (newScene == 7){
		iTween.ColorTo(GameObject.Find("Background Color"),{"Color":Color(.749,0,0),"time":0.2}); //Reset the background color to red
		// Fade in the starbursts
		iTween.ColorTo(GameObject.Find("Faded"),{"a":1,"time":0.2});
		iTween.ColorTo(GameObject.Find("Solid"),{"a":1,"time":0.2});
		iTween.ColorTo(GameObject.Find("Thin"),{"a":1,"time":0.2});
		iTween.ColorTo(GameObject.Find("Vignette"),{"a":1,"time":0.2});
		iTween.ColorTo(GameObject.Find("White"),{"a":1,"time":0.2});
	};
	if (newScene == 8){
		// If going to classic or endless, fade to black and fade out the starbursts
		iTween.ColorTo(GameObject.Find("Background Color"),{"Color":Color(0,0,0),"time":0.2});
		iTween.ColorTo(GameObject.Find("Faded"),{"a":0,"time":0.2});
		iTween.ColorTo(GameObject.Find("Solid"),{"a":0,"time":0.2});
		iTween.ColorTo(GameObject.Find("Thin"),{"a":0,"time":0.2});
		iTween.ColorTo(GameObject.Find("Vignette"),{"a":0,"time":0.2});
		iTween.ColorTo(GameObject.Find("White"),{"a":0,"time":0.2});
	};
	
	if (GameObject.FindWithTag("zoom") != null ){ //Only animate if a tag exists
		// Zoom animation scale to 10x original object's size
		iTween.ScaleTo(GameObject.FindWithTag("zoom"),{"x":GameObject.FindWithTag("zoom").transform.localScale.x * 10,"y":GameObject.FindWithTag("zoom").transform.localScale.y * 10,"easetype":"easeOutSine","time":1});
		iTween.FadeTo(GameObject.FindWithTag("zoom"),{"alpha":0,"easetype":"easeOutSine","time":0.2}); // Zoom animation fade
	};
	if (GameObject.FindWithTag("slideup") != null ){	
		iTween.MoveTo(gameObject.FindWithTag("slideup"),{"y":-54 - gameObject.FindWithTag("slideup").transform.localScale.y * 4,"easetype":"easeOutElastic","time":1});
	};
	if (GameObject.FindWithTag("slidedown") != null ){
		iTween.MoveTo(gameObject.FindWithTag("slidedown"),{"y":54 + gameObject.FindWithTag("slidedown").transform.localScale.y / 2,"easetype":"easeOutElastic","time":1});
	};
}