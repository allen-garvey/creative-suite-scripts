#include lib/index.jsx
/*
* Creates starburst around the center of the document
*/

/*
* Draws starburst from center of the document
* numPoints is the number of lines in the starburst
*/
function createStarburst(radius, numPoints, radiusTransformFunc, centerPoint){
	centerPoint = centerPoint ? centerPoint : JSX.vector.centerPoint().point;
	var arcRadLength = 2 / numPoints;
	radiusTransformFunc = radiusTransformFunc ? radiusTransformFunc : function(radius, i){return radius;};
	for (var i = 0; i < numPoints; i++) {
		var tRadius = radiusTransformFunc(radius, i);
		var radDegreesFromOrigin = arcRadLength * i * Math.PI;
		drawLine([centerPoint, parametricCirclePoint(centerPoint, tRadius, radDegreesFromOrigin)]);
	}
}

function createFractalStarburst(radius, numPoints, radiusTransformFunc){
	var centerPoint = JSX.vector.centerPoint().point;
	var arcRadLength = 2 / numPoints;
	var fractalRadius = Math.floor(Math.sqrt(radius));
	var fractalPoints = Math.floor(Math.sqrt(numPoints));
	radiusTransformFunc = radiusTransformFunc ? radiusTransformFunc : function(radius, i){return radius;};
	for (var i = 0; i < numPoints; i++) {
		var tRadius = radiusTransformFunc(radius, i);
		var radDegreesFromOrigin = arcRadLength * i * Math.PI;
		var circleApexPoint = parametricCirclePoint(centerPoint, tRadius, radDegreesFromOrigin);
		drawLine([centerPoint, circleApexPoint]);
		createStarburst(fractalRadius, fractalPoints, function(radius, i){return Math.random() * radius}, circleApexPoint);
	}
}

function createSquarePinwheel(radius, numPoints, squareWidth, radiusTransformFunc){
	var centerPoint = JSX.vector.centerPoint().point;
	var RADIANS_IN_CIRCLE = 2;
	var arcRadLength = RADIANS_IN_CIRCLE / numPoints;
	radiusTransformFunc = radiusTransformFunc ? radiusTransformFunc : function(radius, i){return radius;};
	for (var i = 0; i < numPoints; i++) {
		var tRadius = radiusTransformFunc(radius, i);
		var radsFromOrigin = arcRadLength * i;
		var circleApexPoint = parametricCirclePoint(centerPoint, tRadius, radsFromOrigin * Math.PI);
		drawPath([centerPoint, 
			circleApexPoint, 
			parametricCirclePoint(circleApexPoint, squareWidth, (radsFromOrigin - .5) * Math.PI),
			parametricCirclePoint(centerPoint, squareWidth, (radsFromOrigin - .5) * Math.PI)]);
	}
}

function createTrianglePinwheel(radius, numPoints, squareWidth, radiusTransformFunc){
	var centerPoint = JSX.vector.centerPoint().point;
	var RADIANS_IN_CIRCLE = 2;
	var arcRadLength = RADIANS_IN_CIRCLE / numPoints;
	radiusTransformFunc = radiusTransformFunc ? radiusTransformFunc : function(radius, i){return radius;};
	for (var i = 0; i < numPoints; i++) {
		var tRadius = radiusTransformFunc(radius, i);
		var radsFromOrigin = arcRadLength * i;
		var circleApexPoint = parametricCirclePoint(centerPoint, tRadius, radsFromOrigin * Math.PI);
		var widthPoint = parametricCirclePoint(centerPoint, squareWidth, (radsFromOrigin - .5) * Math.PI);
		drawPath([centerPoint, 
			circleApexPoint,
			[JSX.math.random.randInt(widthPoint[0], circleApexPoint[0]), JSX.math.random.randInt(widthPoint[1], circleApexPoint[1])]
			]);
	}
}


/*
* convenience function to calculate coordinates on a circle
* returns single point [x, y] created by combining parametricCircleX and parametricCircleY functions
*/
function parametricCirclePoint(centerPoint, radius, radDegrees){
	var xCoord = parametricCircleX(centerPoint[0], radius, radDegrees);
	var yCoord = parametricCircleY(centerPoint[1], radius, radDegrees);
	return [xCoord, yCoord];
}


/*
* Calculates the x point on a circle using parametric equation for circle
* originX is x coordinate for circle center, 
* radDegrees is the angle in radians
*/
function parametricCircleX(originX, radius, radDegrees){
	return originX + radius * Math.cos(radDegrees);
}

/*
* Calculates the y point on a circle using parametric equation for circle
* originY is y coordinate for circle center, 
* radDegrees is the angle in radians
*/
function parametricCircleY(originY, radius, radDegrees){
	return originY + radius * Math.sin(radDegrees);
}

function drawLine(pointsArray){
	var line = JSX.doc.pathItems.add();
	line.stroked = true;
	line.strokeColor = color.getColor();
	line.closed = true;
	line.setEntirePath(pointsArray);
}
function drawPath(pointsArray){
	var line = JSX.doc.pathItems.add();
	line.stroked = false;
	line.fillColor = color.getColor();
	line.closed = true;
	line.setEntirePath(pointsArray);
}

function expandingCirclesPerspective(num){
	var centerPoint = JSX.vector.centerPoint();
	var radii = JSX.math.fibArray(num);
	JSX.array.each(radii, function(r){
		r *= 10;
		var circle = JSX.doc.pathItems.ellipse(centerPoint[1], centerPoint[0], r, r, false, true);
		circle.stroked = false;
		circle.fillColor = color.getColor();
	});
}

function expandingCircles2(num){
	var centerPoint = JSX.vector.centerPoint();
	var radii = JSX.math.fibArray(num);
	JSX.array.each(radii, function(r){
		r *= 10;
		var x = centerPoint[0] - 2 * r;
		var y = centerPoint[1] + 2 * r;
		var circle = JSX.doc.pathItems.ellipse(y, x, r, r, false, true);
		circle.stroked = false;
		circle.fillColor = color.getColor();
	});
}

function expandingCircles3(num){
	var centerPoint = JSX.vector.centerPoint();
	var radii = JSX.math.fibArray(num);
	JSX.array.each(radii, function(r){
		r *= 10;
		var x = centerPoint[0] - r;
		var y = centerPoint[1] + r;
		var circle = JSX.doc.pathItems.ellipse(y, x, r, r, false, true);
		circle.stroked = false;
		circle.fillColor = color.getColor();
	});
}

function expandingCircles4(num){
	var centerPoint = JSX.vector.centerPoint();
	var radii = JSX.math.fibArray(num);
	JSX.array.each(radii, function(r){
		r *= 10;
		var x = centerPoint[0] - r;
		var y = centerPoint[1] +  2 * r;
		var circle = JSX.doc.pathItems.ellipse(y, x, r, r, false, true);
		circle.stroked = false;
		circle.fillColor = color.getColor();
	});
}

function expandingCirclesStroke(num){
	var centerPoint = JSX.vector.centerPoint();
	var radii = JSX.math.fibArray(num);
	JSX.array.each(radii, function(r){
		r *= 10;
		var x = centerPoint[0] - 0.5 * r;
		var y = centerPoint[1] + 0.5 * r;
		var circle = JSX.doc.pathItems.ellipse(y, x, r, r, false, true);
		circle.stroked = true;
		circle.fillColor = new NoColor();
	});
}

function expandingCircles(num){
	var centerPoint = JSX.vector.centerPoint();
	var radii = JSX.math.fibArray(num).reverse();
	JSX.array.each(radii, function(r){
		r *= 10;
		var x = centerPoint.x - 0.5 * r;
		var y = centerPoint.y + 0.5 * r;
		var circle = JSX.doc.pathItems.ellipse(y, x, r, r, false, true);
		circle.stroked = false;
		circle.fillColor = color.getColor();
	});
}

/*
* Main app
*/
var color = new JSX.color.Palette();
// createStarburst(400, 100, function(radius, i){return radius * Math.random();});
// createTrianglePinwheel(600, 5, 20, function(radius, i){return radius * Math.random();});
expandingCircles(10);
createFractalStarburst(400, 32, function(radius, i){return radius * Math.random();});

