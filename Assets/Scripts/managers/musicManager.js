#pragma strict

// This script is responsible for playing all music

// Define songs
var menuSong : AudioClip;
var arcadeSong : AudioClip;
private var newSong : AudioClip; // used in crossfading songs

function Start () {
	// Initiate music when the game object is created
	OnLevelWasLoaded();
}

function OnLevelWasLoaded () {
	// Update which song is playing
	if (Application.loadedLevel == 1 || Application.loadedLevel == 2 || Application.loadedLevel == 3 || Application.loadedLevel == 4 || Application.loadedLevel == 5){
		// Unmute the audio source
		audio.mute = false;
		// If the song is already playing, don't reset it
		if (audio.clip !== menuSong){
			crossFade();
			newSong = menuSong;
			Invoke("changeSong",0.5);
		}
		else{
			fade(1);
		};
	};
	if (Application.loadedLevel == 6 || Application.loadedLevel == 7){
		// Do the same as before, but for the arcade song
		audio.mute = false;
		// Restart the song even if it's playing
		crossFade();
		newSong = arcadeSong;
		Invoke("changeSong",0.5);
	};
	// Don't play if muted
	if (Application.loadedLevel == 0 || PlayerPrefs.GetInt("muted") == 1){
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