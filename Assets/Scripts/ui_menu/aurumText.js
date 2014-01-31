#pragma strict

private var lastValue : int = 0;
private var deltaValue : int = 0;
private var createdTextObject : GameObject;


function Start () {
	lastValue = PlayerPrefs.GetInt("aurum");
	refresh();
}

function refresh () {
	// Update the value
	guiText.text = "<color=#ffffffb0><b>Aurum:</b></color> " + PlayerPrefs.GetInt("aurum");
	
	// If aurum was added or removed...
	if ( PlayerPrefs.GetInt("aurum") > lastValue ){	
		// Figure out the difference
		deltaValue = PlayerPrefs.GetInt("aurum") - lastValue;
		
		// And make a new GUIText Object to show the value
		createdTextObject = Instantiate(new GameObject(), Vector3(0.993,0.93,0), Quaternion.identity);
		createdTextObject.AddComponent(GUIText);
		
		// Change the text on it
		if ( lastValue >= 0 ){ createdTextObject.guiText.text = "<color=ffffffbb>+" + deltaValue + "</color>"; };
		else { createdTextObject.guiText.text = "<color=ffffffbb>-" + deltaValue + "</color>"; };
		
		// And change the size and font to match this gameObject's
		createdTextObject.guiText.fontSize = guiText.fontSize;
		createdTextObject.guiText.font = guiText.font;
		
		// And change its anchor
		createdTextObject.guiText.anchor = TextAnchor.UpperRight;
		
		// And animate it
		iTween.MoveFrom( createdTextObject, {"x":1.2,"time":0.5,"easeType":"easeOutBack"});
		iTween.MoveTo( createdTextObject, {"x":1.2,"time":0.5,"delay":1.5,"easeType":"easeInBack"});
		
		// And destroy it when its animations are done
		Destroy( createdTextObject, 2 );
	}
}