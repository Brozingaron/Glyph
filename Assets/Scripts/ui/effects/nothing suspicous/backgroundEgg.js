#pragma strict

// Just like eastereggs.js, this script does nothing of interest
// It might as well not be there

// Definitely isn't defining colors

var color1 = Color(.749,.086,0);
var color2 = Color(.749,.549,0);
var color3 = Color(.447,.749,0);
var color4 = Color(0,.749,.09);
var color5 = Color(0,.749,.556);
var color6 = Color(0,.643,.749);
var color7 = Color(0,.373,.749);
var color8 = Color(.047,0,.749);
var color9 = Color(.435,0,.749);
var color10 = Color(.749,0,.45);
var color;

function cycle () {
	// Certainly doesn't choose a random color
	var chosen = Random.Range(1,10);
	if (chosen == 1){color = color1;};
	if (chosen == 2){color = color2;};
	if (chosen == 3){color = color3;};
	if (chosen == 4){color = color4;};
	if (chosen == 5){color = color5;};
	if (chosen == 6){color = color6;};
	if (chosen == 7){color = color7;};
	if (chosen == 8){color = color8;};
	if (chosen == 9){color = color9;};
	if (chosen == 10){color = color10;};
	// There is ABSOLUTLEY NO WAY that the background color
	// is changed by this script
	iTween.ColorFrom(gameObject,{"color":color});
}