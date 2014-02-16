#pragma strict

//Scales GUIText GameObjects for non-1080p screens

var textSize : int = 0; //Set to the size in Px the text should appear at 1080p


function Start () {
	var newSize : float = textSize * ( Screen.height / 1080.0 ); //Calculate the new text size
	guiText.fontSize = newSize; //Set the text size
}