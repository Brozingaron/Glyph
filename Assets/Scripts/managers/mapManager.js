#pragma strict

// This script generates random maps for Endless Mode
// It is attached to the map's parent object

// Variables that the game should keep track of
var level : int = 1;

// Prefabs for the walls and junk
var stoneWall : GameObject;

// Floor textures
var stoneFloor : Texture2D;

// The room resources that will be used in generation
private var wall : GameObject;
private var floorTex : Texture2D;

// A bunch of other importand variables that keep track of important things
private var z : float;
private var roomCount : int;
private var roomsGenerated : int = 0;
private var w : int; // The width of the current room
private var h : int; // The height of the current room
private var x : int; // The X Offset of the current room
private var y : int; // The Y Offset of the current room
private var wallTopGenerated : int = 0;
private var wallBottomGenerated : int = 0;
private var wallLeftGenerated : int = 0;
private var wallRightGenerated : int = 0;
private var generatedObject : GameObject;
private var sphereCollider : GameObject;
private var done : boolean = true; // If this room's generation is done
private var valid : boolean = false; // If this room's coordinates are valid

function Start () {
	z = gameObject.transform.position.z;
	// Pick a random number of rooms
	roomCount = Random.Range(20,40);
	
	Debug.Log("mapManager: " + roomCount + " rooms will be generated");
	
	// What theme should we use?
	// Get the interior designers to figure this out and switch the prefabs
	// And yes. We hired if statements for interior designers.
	if (level <= 5){
		wall = stoneWall;
		floorTex = stoneFloor;
	};
}

function Update () {
	// Should another room be generated?
	if ( done == true && valid == false && roomsGenerated < roomCount){
		// Generate random coordinates for this room
		w = Random.Range(4,10); // Get random width
		h = Random.Range(4,10); // Get random height
		x = Random.Range(-40,40); // Get random X
		y = Random.Range(-40,40); // Get random Y
		
		// If this is the first room, put it at the origin
		if ( roomsGenerated == 0 ){
			x = 0;
			y = 0;
		};
		
		Debug.Log("mapManager: Picked (" + w + "," + h + "," + x + "," + y + ") as room coordinates");
		
		valid = true;
		done = false;
		
		/*
		// Check these values to make sure rooms don't intersect
		sphereCollider = Physics.OverlapSphere( Vector3(lastRoomDimensions[1] / 2 + lastRoomDimensions[ // Words
		if ( sphereCollider.name = "floor" || sphereCollider == null ){
			// This process happens 4 times for all corners
			...
						valid = true;
			// Ain't nobody got time for that
			
		};
	*/
	};
	
	// If a room is good, make it
	if ( done == false && valid == true){
		// Figure out how many wall blocks are needed
		
		done = true; // If no if condition changes this variable, the next room can be generated
		
		//Start with the top walls
		if ( wallTopGenerated < w - 2 || w%2 == 0 && wallTopGenerated <= w - 2 ){
			generatedObject = Instantiate(wall, Vector3(
				// Get the coordinates
				( w/2 - 1 - wallTopGenerated + x) * 10, //X
				( h/2 + y) * 10, //Y
				z), // Z
				Quaternion.Euler(90,0,0)); // Then give it a specific rotation
			wallTopGenerated += 1;
			// Parent the newly made wall to this game object
			generatedObject.transform.parent = gameObject.transform;
			done = false;
		};
		
		// Now do the bottom walls
		if ( wallBottomGenerated < w - 2 || w%2 == 0 && wallBottomGenerated <= w - 2 ){
			generatedObject = Instantiate(wall, Vector3(
				// Get the coordinates
				( w/2 - 1 - wallBottomGenerated + x) * 10, //X
				( h/-2 + y) * 10, //Y
				z), // Z
				Quaternion.Euler(270,180,0));  // Then give it a specific rotation
			wallBottomGenerated += 1;
			// Parent the newly made wall to this game object
			generatedObject.transform.parent = gameObject.transform;
			done = false;
		};
		
		// Now do the left walls
		if ( wallLeftGenerated < h - 2 || h%2 == 0 && wallLeftGenerated <= h - 2 ){
			generatedObject = Instantiate(wall, Vector3(
				// Get the coordinates
				( w/2 + x ) * 10 , //X
				( h/2 - 1 - wallLeftGenerated + y ) * 10, //Y
				z), // Z
				Quaternion.Euler(0,270,270)); // Then give it a specific rotation
			wallLeftGenerated += 1;
			// Parent the newly made wall to this game object
			generatedObject.transform.parent = gameObject.transform;
			done = false;
		};
		
		// Now do the right walls
		if ( wallRightGenerated < h - 2 || h%2 == 0 && wallRightGenerated <= h - 2 ){
			generatedObject = Instantiate(wall, Vector3(
				// Get the coordinates
				( w/-2 + x ) * 10, //X
				( h/2 - 1 - wallRightGenerated + y ) * 10, //Y
				z), // Z
				Quaternion.Euler(0,90,90));  // Then give it a specific rotation
			wallRightGenerated += 1;
			// Parent the newly made wall to this game object
			generatedObject.transform.parent = gameObject.transform;
			done = false;
		};
		
		if (done == true){
			// Make the floor now
			generatedObject = GameObject.CreatePrimitive(PrimitiveType.Plane);
			// Rotate, move and scale it
			generatedObject.transform.rotation = Quaternion.Euler(90,0,0);
			generatedObject.transform.position = Vector3(x * 10, y * 10, z);
			generatedObject.transform.localScale = Vector3(w - 2, 1, h - 2);
			// If one of the lengths is even, then we need to add one back to these values
			if ( w%2 == 0 ){ generatedObject.renderer.material.mainTextureScale = generatedObject.transform.localScale += Vector3(1,0,0);};
			if ( h%2 == 0 ){ generatedObject.renderer.material.mainTextureScale = generatedObject.transform.localScale += Vector3(0,0,1);};
			// Set its texture
			generatedObject.renderer.material.mainTexture = floorTex;
			// Tile its texture
			generatedObject.renderer.material.mainTextureScale = Vector2(w-2, h-2);
			if ( w%2 == 0 ){ generatedObject.renderer.material.mainTextureScale = generatedObject.renderer.material.mainTextureScale += Vector2(1,0);};
			if ( h%2 == 0 ){ generatedObject.renderer.material.mainTextureScale = generatedObject.renderer.material.mainTextureScale += Vector2(0,1);};
			// Make it a child to this game object
			generatedObject.transform.parent = gameObject.transform;
		}
	};
	
	// Reset the pending room and start again.
	// Fun times.
	if ( done == true && valid == true){
		//valid = false;
		w = h = x = y = wallTopGenerated = wallBottomGenerated = wallLeftGenerated = wallRightGenerated = 0;
		roomsGenerated += 1;
		
		//Debug.Log("Room generated. Starting again.");
	};
}