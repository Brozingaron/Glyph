#pragma strict

// Accounts for the player's ruthless actions
// including the effects of the abilities

var spriteObject : GameObject; // The mesh's sprite (for animating)

var health : float = 1; // Allows partial damage to enemies
var pointValue : int = 1; // How many points this enemy is worth

private var distance : float; // Distance from the player to this enemy. Used in damage calculation
private var dead : boolean = false; // If this enemy is dead
private var suicidal : boolean = false; // If this enemy was killed because the game ended

function Update () {
	// React to abilities
	if ( Input.GetButtonDown("ability1") && GameObject.Find("gameMan").GetComponent(gameManager).charge >= .25 ){
		// Calculate the distance between the player & this enemy
		distance = Vector3.Magnitude( Vector3(transform.position.x - GameObject.Find("Soul").transform.position.x, transform.position.y - GameObject.Find("Soul").transform.position.y, 0));
		// What should happen to the enemy depending on its distance
		if (distance <= 25 ){
			health -= 25 / distance - 1;
			push(Mathf.Abs(-1 * (distance / 25) * (distance / 25) + 0.5 ),1.5,"easeOutQuint");
		};
	};
	if ( Input.GetButtonDown("ability2") && GameObject.Find("gameMan").GetComponent(gameManager).charge >= .50 ){
		// Calculate the distance between the player & this enemy
		distance = Vector3.Magnitude( Vector3(transform.position.x - GameObject.Find("Soul").transform.position.x, transform.position.y - GameObject.Find("Soul").transform.position.y, 0));
		// What should happen to the enemy depending on its distance
		if (distance <= 35 ){
			health -= 35 / distance - 1;
			push(Mathf.Abs(-1 * (distance / 35) * (distance / 35) + 1 ),2,"easeOutQuint");
		};
	};
	if ( Input.GetButtonDown("ability3") && GameObject.Find("gameMan").GetComponent(gameManager).charge >= .75 ){
		// Calculate the distance between the player & this enemy
		distance = Vector3.Magnitude( Vector3(transform.position.x - GameObject.Find("Soul").transform.position.x, transform.position.y - GameObject.Find("Soul").transform.position.y, 0));
		// What should happen to the enemy depending on its distance
		if (distance <= 50 ){
			health -= 50 / distance - 1;
			push(Mathf.Abs(-1 * (distance / 50) * (distance / 50) + 1 ),5,"easeOutQuint");
		};
	};
	
	if ( health <= 0 && dead == false && suicidal == false ){
		// If health is less than or equal to 0, die and inform the gameManager that
		// there has been another casualty
		dead = true; // Don't die again
		GameObject.Find("gameMan").GetComponent(gameManager).killed(pointValue);
		die();
	}
}

function push (amount : float,speed:float, easeType : String){
	// This function calls another function depending on the movement script
	// It is directly responsible for enemies moving backwards
	if (gameObject.GetComponent(linearFollow) != null){
		gameObject.GetComponent(linearFollow).push(amount,speed,easeType);
	}
}

function die () {
	// Destroy the movement script
	if (GetComponent(linearFollow) != null){
		Destroy(GetComponent(linearFollow));
	};
	if (GetComponent(trapezoidBoss) != null){
		Destroy(GetComponent(trapezoidBoss));
	};
	// Disable the particle system
	transform.FindChild("Trail").particleSystem.Stop();
	// Do entity spawn animations in reverse
	iTween.ScaleTo(spriteObject,{"x":0,"y":0,"easetype":"easeOutSine","time":.5,"oncomplete":"finalBlow","oncompletetarget":gameObject}); // Zoom animation scale
	iTween.FadeTo(spriteObject,{"alpha":0,"easetype":"easeOutSine","time":0.25}); // Zoom animation fade
}

function finalBlow () {
	// Removes the object from the scene
	// This function is called by iTween when the enemy animates out
	
	// Reset to origin to fade menu bar back in
	gameObject.transform.position.x = 0;
	gameObject.transform.position.y = 0;
	Invoke("finalFinalBlow",Time.deltaTime);
}

function finalFinalBlow () {
	Destroy(gameObject);
}

function suicide (){
	// Kill self if touches the player
	// Fancier events can be added later
	die();
	suicidal = true;
}