#include lib/index.jsx
/*
* Creates starburst around the center of the document
*/

/*
* Draws starburst from center of the document
* numPoints is the number of lines in the starburst
*/
function createStarburst(radius, numPoints, radiusTransformFunc){
	var centerPoint = JSX.vector.centerPoint();
	var arcRadLength = 2 / numPoints;
	radiusTransformFunc = radiusTransformFunc ? radiusTransformFunc : function(radius, i){return radius;};
	for (var i = 0; i < numPoints; i++) {
		var tRadius = radiusTransformFunc(radius, i);
		var radDegreesFromOrigin = arcRadLength * i * Math.PI;
		drawLine([centerPoint, parametricCirclePoint(centerPoint, tRadius, radDegreesFromOrigin)]);
	}
}

function createSquarePinwheel(radius, numPoints, squareWidth, radiusTransformFunc){
	var centerPoint = JSX.vector.centerPoint();
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
	var centerPoint = JSX.vector.centerPoint();
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

/*
* Main app
*/
var color = new JSX.color.Palette();
// createStarburst(400, 100, function(radius, i){return radius * Math.random();});
createTrianglePinwheel(600, 5, 20, function(radius, i){return radius * Math.random();});

