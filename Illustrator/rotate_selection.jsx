#include lib/index.jsx
/*
* Rotates selected pathItem to create pinwheel like effect
* rotates around lowest point
*/

function rotateItem(pathItem){
	var points = [];
	JSX.array.each(pathItem.pathPoints, function(item){
		points.push(new JSX.vector.Point(item.anchor));
	});
	var lowestIndex = lowestPointIndex(points);
	var centerPoint = points[lowestIndex];
	var pointsInfo = [];
	JSX.array.each(points, function(item){
		pointsInfo.push({
			'point' : item,
			'distance' : JSX.math.distance(centerPoint, item),
			'angleRad' : JSX.math.parametricCircleAngle(centerPoint, item)
		});
	});
	drawRotation(centerPoint, pointsInfo);
}

function drawRotation(centerPoint, pointsInfo){
	var arcRadLength = 2.0 / numRotations;
	for (var i = 1; i < numRotations; i++) {
		var pathPoints = [];
		var radiansFromOrigin = arcRadLength * i * Math.PI;
		JSX.array.each(pointsInfo, function(item){
			//can't remove the center point since would disrupt path, so instead test and simply add it without doing any calculations
			if(centerPoint.equals(item.point)){
				pathPoints.push(centerPoint.point);
			}
			else{
				//if angle is to the left of the centerPoint, it should be negative
				item.angleRad = item.angleRad > Math.PI ? item.angleRad - 2 * Math.PI : item.angleRad;
				pathPoints.push(JSX.math.parametricCirclePoint(centerPoint.point, item.distance, radiansFromOrigin + item.angleRad).point);	
			}
			
		});
		drawPath(pathPoints);
	}
}

function drawPath(pointsArray){
	var line = JSX.doc.pathItems.add();
	line.stroked = false;
	line.fillColor = color.getColor();
	line.closed = true;
	line.setEntirePath(pointsArray);
}
//used to get index of lowest point in array to serve as center point
function lowestPointIndex(points){
	var index = 0;
	var lowestPoint = points[0];
	JSX.array.each(points, function(item, i){
		if(item.y < lowestPoint.y){
			lowestPoint = item;
			index = i;
		}
	});
	return index;
}

//total number of rotated objects including the original, so that one less than number of numRotations is drawn
var numRotations = 5;
var color = new JSX.color.Palette();

var selectedItems = JSX.vector.selectedPathItems();
if(selectedItems.length > 0){
	JSX.array.each(selectedItems, function(item){
		rotateItem(item);
	});
}

