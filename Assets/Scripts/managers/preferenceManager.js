#pragma strict

// This script is called upon at launch to reload user settings

function Start () {
	// Create varibles if needed
	if( PlayerPrefs.GetInt("minimalParticles") == null ){
		PlayerPrefs.SetInt("minimalParticles",0);
	};
	if( PlayerPrefs.GetInt("muted") == null){
		PlayerPrefs.SetInt("muted",0);
	};
}