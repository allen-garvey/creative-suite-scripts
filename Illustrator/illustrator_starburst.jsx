/*
* Creates starburst around the center of the document
* Sizing doesn't work correctly on new artboard for some reason
*/
//creates new document if not already open
var doc = app.documents.length > 0 ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB, 512, 512);

/*
* Draws starburst from center of the document
* numPoints is the number of lines in the starburst
*/
function createStarburst(radius, numPoints){
	var centerPoint = [doc.width / 2, -1 * doc.height / 2];
	var arcRadLength = 2 / numPoints;
	for (var i = 0; i < numPoints; i++) {
		var radDegreesFromOrigin = arcRadLength * i * Math.PI;
		var xCoord = parametricCircleX(centerPoint[0], radius, radDegreesFromOrigin);
		var yCoord = parametricCircleY(centerPoint[1], radius, radDegreesFromOrigin);
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
	var line = doc.pathItems.add();
	line.stroked = true;
	line.closed = true;
	line.setEntirePath(pointsArray);
}

createStarburst(300, 65);