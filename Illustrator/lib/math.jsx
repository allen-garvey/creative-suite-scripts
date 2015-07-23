/*
* Math and random functions
*/
var JSX = JSX || {};
JSX.math = {};
JSX.math.random = {};

JSX.math.random.randElement = function(lvArray){
	return lvArray[Math.floor(Math.random() * lvArray.length)];
}

 /**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * Courtesy of MDN
 */
JSX.math.random.randInt = function(min, max) {
	//sets default min to 0 if not specified
	if(!max && max !== 0){
		max = min;
		min = 0;
	}
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/*
* Creates random number between 0 and 1 following 'power law distribution
* the higher the power, the more the distribution is skewed towards 0
*/
JSX.math.random.powLawRandInt = function(pow){
	pow = (typeof pow === 'number') ? pow : 2;
	return Math.pow(Math.random(), pow);
}

/*
* Tests if a number is the square root of an integer
*/
JSX.math.isSquareOfInteger = function(num){
	return Math.sqrt(num) % 1 === 0;
}