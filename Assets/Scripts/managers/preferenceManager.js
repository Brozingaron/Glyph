#pragma strict

// This script is called upon at launch to reload user settings
// It also creats blank settings if needed


function Start () {
	// Create varibles if needed
	if( PlayerPrefs.HasKey("minimalParticles") == false ){
		PlayerPrefs.SetInt("minimalParticles",0);
	};
	if( PlayerPrefs.HasKey("muted") == false){
		PlayerPrefs.SetInt("muted",0);
	};
	if( PlayerPrefs.HasKey("infiniteHS") == false){
		PlayerPrefs.SetInt("infiniteHS",0);
	};
	if( PlayerPrefs.HasKey("arcadeHS") == false){
		PlayerPrefs.SetInt("arcadeHS",0);
	};
	if( PlayerPrefs.HasKey("insaneHS") == false){
		PlayerPrefs.SetInt("insaneHS",0);
	};
	if( PlayerPrefs.HasKey("endlessHS") == false){
		PlayerPrefs.SetInt("endlessHS",0);
	};
	if( PlayerPrefs.HasKey("aurum") == false){
		PlayerPrefs.SetInt("aurum",0);
	};
	
	//Now do the keybindings
	
	if( PlayerPrefs.HasKey("a1Key") == false){
		PlayerPrefs.SetString("a1Key","1");
	};
	if( PlayerPrefs.HasKey("a2Key") == false){
		PlayerPrefs.SetString("a2Key","2");
	};
	if( PlayerPrefs.HasKey("a3Key") == false){
		PlayerPrefs.SetString("a3Key","3");
	};
	if( PlayerPrefs.HasKey("a4Key") == false){
		PlayerPrefs.SetString("a4Key","4");
	};
	if( PlayerPrefs.HasKey("a5Key") == false){
		PlayerPrefs.SetString("a5Key","5");
	};
	if( PlayerPrefs.HasKey("upKey") == false){
		PlayerPrefs.SetString("upKey","w");
	};
	if( PlayerPrefs.HasKey("downKey") == false){
		PlayerPrefs.SetString("downKey","s");
	};
	if( PlayerPrefs.HasKey("leftKey") == false){
		PlayerPrefs.SetString("leftKey","a");
	};
	if( PlayerPrefs.HasKey("rightKey") == false){
		PlayerPrefs.SetString("rightKey","d");
	};
	
	//Now do the alt keybindings
	if( PlayerPrefs.HasKey("a1KeyAlt") == false){
		PlayerPrefs.SetString("a1KeyAlt","z");
	};
	if( PlayerPrefs.HasKey("a2KeyAlt") == false){
		PlayerPrefs.SetString("a2KeyAlt","x");
	};
	if( PlayerPrefs.HasKey("a3KeyAlt") == false){
		PlayerPrefs.SetString("a3KeyAlt","c");
	};
	if( PlayerPrefs.HasKey("a4KeyAlt") == false){
		PlayerPrefs.SetString("a4KeyAlt","v");
	};
	if( PlayerPrefs.HasKey("a5KeyAlt") == false){
		PlayerPrefs.SetString("a5KeyAlt","b");
	};
	if( PlayerPrefs.HasKey("upKeyAlt") == false){
		PlayerPrefs.SetString("upKeyAlt","up");
	};
	if( PlayerPrefs.HasKey("downKeyAlt") == false){
		PlayerPrefs.SetString("downKeyAlt","down");
	};
	if( PlayerPrefs.HasKey("leftKeyAlt") == false){
		PlayerPrefs.SetString("leftKeyAlt","left");
	};
	if( PlayerPrefs.HasKey("rightKeyAlt") == false){
		PlayerPrefs.SetString("rightKeyAlt","right");
	};
	
	// The user isn't cheating (yet)
	if( PlayerPrefs.HasKey("cheating") == true){
		PlayerPrefs.DeleteKey("cheating");
	};
}