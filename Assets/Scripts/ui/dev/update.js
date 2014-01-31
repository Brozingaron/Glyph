#pragma strict

// This script will check for an update to Glyph through a file on the Github Page
// If one is found, it will launch the default browser

private var versionString = "alpha_3(1/30/14).a"; //This string will exactly match the downloaded file
private var url = "http://brozingaron.github.io/Glyph/update/version"; //The file to test the build number
var ver : WWW; //The WWW variable

function Start () {
	// Start the download
	ver = new WWW(url);
	
	// Wait for the download to finish
	yield ver;
	
	//Log errors to console
	if(!String.IsNullOrEmpty(ver.error)){
		Debug.Log(ver.error);	
	}
	else{
		if( ver.text == versionString ){
			Destroy(this);
		}
		else{
			Application.OpenURL("http://brozingaron.github.io/Glyph/update/");
		}
	}
	Destroy(this);
}