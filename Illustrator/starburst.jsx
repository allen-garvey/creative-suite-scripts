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
		drawLine([centerPoint, JSX.math.parametricCirclePoint(centerPoint, tRadius, radDegreesFromOrigin).point]);
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
		var circleApexPoint = JSX.math.parametricCirclePoint(centerPoint, tRadius, radDegreesFromOrigin).point;
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
		var circleApexPoint = JSX.math.parametricCirclePoint(centerPoint, tRadius, radsFromOrigin * Math.PI).point;
		drawPath([centerPoint, 
			circleApexPoint, 
			JSX.math.parametricCirclePoint(circleApexPoint, squareWidth, (radsFromOrigin - .5) * Math.PI).point,
			JSX.math.parametricCirclePoint(centerPoint, squareWidth, (radsFromOrigin - .5) * Math.PI).point]);
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
		var circleApexPoint = JSX.math.parametricCirclePoint(centerPoint, tRadius, radsFromOrigin * Math.PI).point;
		var widthPoint = JSX.math.parametricCirclePoint(centerPoint, squareWidth, (radsFromOrigin - .5) * Math.PI).point;
		drawPath([centerPoint, 
			circleApexPoint,
			[JSX.math.random.randInt(widthPoint[0], circleApexPoint[0]), JSX.math.random.randInt(widthPoint[1], circleApexPoint[1])]
			]);
	}
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
		var circle = JSX.doc.pathItems.ellipse(centerPoint.y, centerPoint.x, r, r, false, true);
		circle.stroked = false;
		circle.fillColor = color.getColor();
	});
}

function expandingCircles2(num){
	var centerPoint = JSX.vector.centerPoint();
	var radii = JSX.math.fibArray(num);
	JSX.array.each(radii, function(r){
		r *= 10;
		var x = centerPoint.x - 2 * r;
		var y = centerPoint.y + 2 * r;
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
		var x = centerPoint.x - r;
		var y = centerPoint.y + r;
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
		var x = centerPoint.x - r;
		var y = centerPoint.y +  2 * r;
		var circle = JSX.doc.pathItems.ellipse(y, x, r, r, false, true);
		circle.stroked = false;
		circle.fillColor = color.getColor();
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
expandingCircles2(10);

