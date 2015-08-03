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
	if(min > max){
		var temp = min;
		min = max;
		max = temp;
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

/*
* Returns array of Fibonacci numbers of length specified
* omits 0 and 1 at beginning and starts at second 1
*/
JSX.math.fibArray = function(len){
	if(len < 1){
		return [0];
	}
	else if(len === 1){
		return [1];
	}
	else if(len === 2){
		return [1, 2];
	}
	var fibs = [1, 2];
	for (var i = 2; i < len; i++) {
		var next = fibs[i - 1] + fibs[i - 2];
		fibs.push(next);
	};

	return fibs;
}

/*
* Function to calculate coordinates on a circle diameter
* angleRadians is the angle measurement in radians (e.g. 2pi)
* returns object {y, x, point} where point = [x, y]
*/
JSX.math.parametricCirclePoint = function(centerPoint, radius, angleRadians){
	/*
	* Calculates the x point on a circle using parametric equation for circle
	* originX is x coordinate for circle center, 
	* angleRadians is the angle in radians
	*/
	var parametricCircleX = function(originX, radius, angleRadians){
		return originX + radius * Math.cos(angleRadians);
	}

	/*
	* Calculates the y point on a circle using parametric equation for circle
	* originY is y coordinate for circle center, 
	* angleRadians is the angle in radians
	*/
	var parametricCircleY = function(originY, radius, angleRadians){
		return originY + radius * Math.sin(angleRadians);
	}

	var xCoord = parametricCircleX(centerPoint[0], radius, angleRadians);
	var yCoord = parametricCircleY(centerPoint[1], radius, angleRadians);
	return new JSX.vector.Point(xCoord, yCoord);
}

/*
* @returns the angle in radians of a point on a circle between 0 and 2PI
* angle is calculated clockwise with 0, positive y being the starting (0) point
* @parameter centerPoint : (JSX.vector.Point)  center of circle 
* @parameter circlePoint : (JSX.vector.Point)  a point on the circle's circumference
*/
JSX.math.parametricCircleAngle = function(centerPoint, circlePoint){
	var angleRads = -1 * Math.atan2(circlePoint.y - centerPoint.y, circlePoint.x - centerPoint.x) + 0.5 * Math.PI;
	if(angleRads < 0){
		angleRads = angleRads + 2 * Math.PI;
	}
	return angleRads;
}

/*
* @returns the distance between two points
* @parameter p1 : (JSX.vector.Point)
* @parameter p2 : (JSX.vector.Point)
*/
JSX.math.distance = function(p1, p2){
	return Math.sqrt((p2.x - p1.x) * (p2.x - p1.x) + (p2.y - p1.y) * (p2.y - p1.y));
}
