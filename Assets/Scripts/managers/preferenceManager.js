#pragma strict

// This script is called upon at launch to reload user settings
// It also creats blank settings if needed

function Start () {
	// Create varibles if needed
	if( PlayerPrefs.GetInt("minimalParticles") == null ){
		PlayerPrefs.SetInt("minimalParticles",0);
	};
	if( PlayerPrefs.GetInt("muted") == null){
		PlayerPrefs.SetInt("muted",0);
	};
	if( PlayerPrefs.GetInt("infiniteHS") == null){
		PlayerPrefs.SetInt("infiniteHS",0);
	};
	if( PlayerPrefs.GetInt("arcadeHS") == null){
		PlayerPrefs.SetInt("arcadeHS",0);
	};
	if( PlayerPrefs.GetInt("insaneHS") == null){
		PlayerPrefs.SetInt("insaneHS",0);
	};
	if( PlayerPrefs.GetInt("endlessHS") == null){
		PlayerPrefs.SetInt("endlessHS",0);
	};
}