#include lib/index.jsx
/*
* Creates starburst around the center of the document
*/

/*
* Draws starburst from center of the document
* numPoints is the number of lines in the starburst
*/
function createStarburst(radius, numPoints){
	var centerPoint = [JSX.doc.width / 2, -1 * JSX.doc.height / 2];
	var arcRadLength = 2 / numPoints;
	for (var i = 0; i < numPoints; i++) {
		var radDegreesFromOrigin = arcRadLength * i * Math.PI;
		var xCoord = parametricCircleX(centerPoint[0], radius, radDegreesFromOrigin);
		var yCoord = parametricCircleY(centerPoint[1], radius, radDegreesFromOrigin);
		drawLine([centerPoint, [xCoord, yCoord]]);
	}
}
function createIrregularStarburst(radius, numPoints){
	var centerPoint = [JSX.doc.width / 2, -1 * JSX.doc.height / 2];
	var arcRadLength = 2 / numPoints;
	for (var i = 0; i < numPoints; i++) {
		var randRadius = radius * Math.random();
		var radDegreesFromOrigin = arcRadLength * i * Math.PI;
		var xCoord = parametricCircleX(centerPoint[0], randRadius, radDegreesFromOrigin);
		var yCoord = parametricCircleY(centerPoint[1], randRadius, radDegreesFromOrigin);
		drawLine([centerPoint, [xCoord, yCoord]]);
	}
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

/*
* Main app
*/
var color = new JSX.color.Color();
createIrregularStarburst(400, 100);


