#pragma strict

// This script updates the user on the level build progress

var timeBetweenUpdates : int = 2; //The time in seconds between text updates
private var t : float; // A counter for the timer

var actualDetails = [
	"Building Level...",
	"Placing items...",
	"Loading...",
	"Working...",
	"Still Going...",
	"Almost done..."
	];
private var lastActualUpdate : int; //Used to cycle the actualDetails in order

var randomDetails = new Array (
	"Putting things in places...",
	"Melting CPU...",
	"Thinking about it...",
	"Reticulating splines...",
	"Taking obscene amounts of time...",
	"Creating Big Bang...",
	"Making up new loading steps...",
	"Copying World of Goo...",
	"Doing that thing with stuff...",
	"Doing that other thing...",
	"Extrapolating...",
	"Interpolating...",
	"Anisotropicing...",
	"Nouning...",
	"Doing...",
	"Fixing...",
	"Spawning...",
	"Activating trap cards...",
	"Making Gravity...",
	"Physicsing...",
	"Sewing more CPU threads...",
	"Protesting...",
	"Starting over...",
	"Taking a lunch break...",
	"Running up your electric bill...",
	"Turning your computer into a furnace...",
	"Testing patience levels...",
	"Engaging spinny logo...",
	"Demanding Caffine...",
	"Firing Programming Department...",
	"Hiring Interior Designer...",
	"Wasting time...",
	"Calculating calculations...",
	"Assuming assumptions..."
	);
private var lastRandomUpdate : int; //Used to cycle the randomDetails without repeating

function Start () {
	// Randomize the random details
	for (var i = randomDetails.length - 1; i > 0; i--) {
		var r = Random.Range(0,i);
		var tmp = randomDetails[i];
		randomDetails[i] = randomDetails[r];
		randomDetails[r] = tmp;
    };
    
    randomDetails.Add("Running out of things to say...");
    
	guiText.text = actualDetails[0];
	lastActualUpdate = 0;
}

function Update () {
	if ( lastRandomUpdate < randomDetails.length - 1 && lastActualUpdate < actualDetails.Length - 1 ){
		t += Time.deltaTime;
	};
	
	if (t >= timeBetweenUpdates){
		//Should an actual update or a random one be displayed?
		if ( Random.Range(0,20) == 4 && lastActualUpdate < actualDetails.Length - 1 ) {
			// Have a 1/20 chance in giving an actual update
			lastActualUpdate += 1;
			guiText.text = actualDetails[lastActualUpdate];
		}
		else{
			// Otherwise, just give a random one.
			lastRandomUpdate += 1;
			guiText.text = randomDetails[lastRandomUpdate] as String;
		};
		t = 0;
	};
}