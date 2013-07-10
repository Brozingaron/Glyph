#pragma strict

// This script is responsible for playing all music

// Define songs
var menuSong : AudioClip;
var arcadeSong : AudioClip;
var insaneSong : AudioClip;
var workingSong : AudioClip;
var endlessSong : AudioClip;
private var newSong : AudioClip; // used in crossfading songs

function Start () {
	// Initiate music when the game object is created
	OnLevelWasLoaded();
}

function OnLevelWasLoaded () {
	// Update which song is playing
	if (Application.loadedLevel == 0){
		audio.mute = true;
	};
	if (Application.loadedLevel == 1 || Application.loadedLevel == 2 || Application.loadedLevel == 3 || Application.loadedLevel == 4 || Application.loadedLevel == 5){
		// If the song is already playing, don't reset it
		if (audio.clip !== menuSong){
			change(menuSong);
		}
		else{
			fade(1);
		};
	};
	if (Application.loadedLevel == 6){
		// Arcade
		change(arcadeSong);
	};
	if (Application.loadedLevel == 7){
		// Insane Mode
		change(insaneSong);
	};
	if (Application.loadedLevel == 8){
		// Endless Mode
		// This plays the loading song to give time to generate the level
		change(workingSong);
	};
	if (PlayerPrefs.GetInt("muted") == 0){
		audio.mute = false;
	}
	else{
		audio.mute = true;
	}
}

function change (song : AudioClip) {
	// Call this function to change the song
	audio.mute = false;
	crossFade();
	newSong = song;
	Invoke("changeSong",0.5);
	
	// Don't play if muted
	if ( PlayerPrefs.GetInt("muted") == 1){
		audio.mute = true;
	};
}

// Define functions for fading volume levels
function fade (newVol : float) {
	iTween.ValueTo(gameObject,{"from":audio.volume,"to":newVol,"easetype":"easeOutCubic","Time":1,"onupdate":"tweenVol","onupdateparams":"float"});
}

function crossFade () {
	iTween.ValueTo(gameObject,{"from":audio.volume,"to":0,"easetype":"linear","Time":0.5,"delay":0.0,"onupdate":"tweenVol","onupdateparams":"float"});
	iTween.ValueTo(gameObject,{"from":0,"to":1,"easetype":"linear","Time":0,"delay":0.5,"onupdate":"tweenVol","onupdateparams":"float"});
}

function changeSong () {
	// Respond to song changes
	audio.clip = newSong;
	audio.Play();
}

function tweenVol (vol : float) {
	audio.volume = vol;
	// Respond to fade in and out iTween functions
}