#pragma downcast

// This script attaches to the children of the main menu to switch between game modes

// Private variables to keep track of the menu item
private var itemNumber : int; // Which menu item it is, numerically
private var isActive : boolean = false; // If this menu entry is the selected one
private var offset : int; // The difference between the active entry and this one
private var easeType : String = "easeOutQuint"; // The easetype used for iTween functions

// GameObjects & Components
private var background : GameObject; // Gradient of the menu item
private var frame : GameObject; // The contents of each menu header
private var title : GameObject; // Header of the menu item
private var leftSeperator : GameObject; // Left seperator
private var rightSeperator : GameObject; // Right seperator

var gradient : Texture2D[]; //Define an array of all background textures

function Start () {
	// Find the order of the menu by looking at the number of the gameobject
	itemNumber = parseInt(gameObject.name.Substring(0,1));
	
	// Find GameObjects & Components to be referenced later
	// They are buried two children deep which makes me question what I'm doing with my life
	background = transform.Find("GlobalTransform").transform.Find("Gradient").gameObject;
	frame = transform.Find("GlobalTransform").transform.Find("Frame").gameObject;
	title = transform.Find("GlobalTransform").transform.Find("Header").gameObject;
	leftSeperator = transform.Find("GlobalTransform").transform.Find("Left Seperator").gameObject;
	rightSeperator = transform.Find("GlobalTransform").transform.Find("Right Seperator").gameObject;
	
	Recolor(3); // Make Arcade mode the default
}

function onRaycastHit() {
	if (!isActive){
		// Find all the children of the parent of this object object...
		for (var child : Transform in transform.parent){
			//... And call the redraw function
			child.gameObject.GetComponent(menuItem).Recolor(itemNumber);
			child.gameObject.GetComponent(menuItem).Move(itemNumber);
		};
	};
}

function Recolor (current : int) {
	// Called by the menu controller when a new item becomes active
	
	//iTween.Stop(transform.Find("GlobalTransform").gameObject,true);
	
	isActive = false; // Allow making this menu item active later	
	offset = itemNumber - current; //Calculate how many menu items from the current one this is
	
	// Retexture the menu item
	background.renderer.material.mainTexture = gradient[Mathf.Abs(offset)];
	
	// Resize the seperators
	leftSeperator.transform.localScale.x = .2;
	rightSeperator.transform.localScale.x = .2;
	
	if ( offset == 0 ){
		// Recolor items to their hover state
		iTween.ColorTo(leftSeperator,{"color":Color(1,1,1,0.5),"time":0.5,"easetype":easeType});
		iTween.ColorTo(rightSeperator,{"color":Color(1,1,1,0.5),"time":0.5,"easetype":easeType});
		iTween.ColorTo(title,{"color":Color(1,1,1,1),"time":0.5,"easetype":easeType});
		
		// Resize the seperators
		leftSeperator.transform.localScale.x = .4;
		rightSeperator.transform.localScale.x = .4;
		
		isActive = true; // Prevent redundantly making this menu item active
	}
	else{
		// Recolor items based on the offset
		iTween.ColorTo(leftSeperator,{"color":Color(1,1,1,0),"time":0.5,"easetype":easeType});
		iTween.ColorTo(title,{"color":Color(1,1,1,0.3 - 0.05 * Mathf.Abs(offset)),"time":0.5,"easetype":easeType});
		iTween.ColorTo(rightSeperator,{"color":Color(1,1,1,0.3 - 0.05 * Mathf.Abs(offset)),"time":0.5,"easetype":easeType});
		
	}
	
	if ( offset == -1 ){
		iTween.ColorTo(rightSeperator,{"color":Color(1,1,1,0),"time":0.5,"easetype":easeType});
	}
}

function Move (current : int) {
	if (offset == 0){
		// Slide the menu item
		iTween.MoveTo(gameObject,{"x":-86.4 + 19.2 * (itemNumber - 1),"islocal":true,"time":0.5,"easetype":easeType});
		
		// Resize the window
		iTween.ScaleTo(background,{"x":9.6,"time":0.5,"easetype":easeType});
		iTween.MoveTo(background,{"x":38.4,"islocal":true,"time":0.5,"easetype":easeType});
		iTween.MoveTo(rightSeperator,{"x":86.4,"islocal":true,"time":0.5,"easetype":easeType});
		
		// Show the Frame
		iTween.Stop(frame);
		frame.transform.localScale.x = 1;
		frame.transform.localPosition.x = 48;
		iTween.MoveFrom(frame,{"y":-10,"islocal":true,"time":0.35,"delay":0.15,"easetype":easeType});
	}
	else{
		// Determine if it is necessary to slide out of the way
		if (offset < 0 && transform.position.x != -86.4 + 19.2 * (itemNumber - 1)){
			iTween.MoveTo(gameObject,{"x":-86.4 + 19.2 * (itemNumber - 1),"islocal":true,"time":0.5,"easetype":easeType});
		};
		if (offset > 0 && transform.position.x != -9.6 + 19.2 * (itemNumber - 1)){
			iTween.MoveTo(gameObject,{"x":-9.6 + 19.2 * (itemNumber - 1),"islocal":true,"time":0.5,"easetype":easeType});
		};
		if (background.transform.position.x != 0){
			// Resize the window
			iTween.ScaleTo(background,{"x":1.92,"time":0.5,"easetype":easeType});
			iTween.MoveTo(background,{"x":0,"islocal":true,"time":0.5,"easetype":easeType});
			iTween.MoveTo(rightSeperator,{"x":9.6,"islocal":true,"time":0.5,"easetype":easeType});
			
			// Hide the Frame
			frame.transform.localScale.x = 0;
		};
	}
}