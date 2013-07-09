#pragma strict

// This script plays image sequences
// It's a workaround for Unity Free not playing videos

var frameRate : int = 30; //The frame rate of the image sequence
var pathToImageSequence : String; // The path to the image sequence
var frames : int; // How many frames are in the image sequence

private var secondsPerFrame : float; // How long to wait before changing the frame
var frame : int; // Which frame the playback is on
private var t : float; // How mich time has passed between frame updates

function Start () {
	// Calculate the time between frames
	secondsPerFrame = 1 / frameRate;
}

function Update () {
	t += Time.deltaTime;
	if ( t >= secondsPerFrame ){
		frame += 1;
		gameObject.renderer.material.mainTexture = Resources.Load( pathToImageSequence + frame, Texture2D );
	};
	if ( frame == frames){
		frame = 1;
		gameObject.renderer.material.mainTexture = Resources.Load( pathToImageSequence + frame, Texture2D );
	};
}

function OnDisable () {
	// Unload ALL the textures
	// But seriously, free around 50 MB of RAM for every second @ 30 FPS
	Resources.UnloadUnusedAssets();
}