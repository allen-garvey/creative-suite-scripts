#include lib/index.jsx
/*
* Rotates selected pathItem to create pinwheel like effect
* rotates around lowest point
* only works with straight line objects for now - does not replicate curves
*/

function rotateItem(pathItem){
	var points = [];
	JSX.array.each(pathItem.pathPoints, function(item){
		var point = new JSX.vector.Point(item.anchor);
		point.leftDirection = item.leftDirection;
		point.rightDirection = item.rightDirection;
		points.push(point);
	});
	var lowestIndex = lowestPointIndex(points);
	var centerPoint = points[lowestIndex];
	var pointsInfo = [];
	JSX.array.each(points, function(item){
		pointsInfo.push({
			'point' : item,
			'distance' : JSX.math.distance(centerPoint, item),
			'angleRad' : JSX.math.parametricCircleAngle(centerPoint, item),
			'rightDirection' : item.rightDirection,
			'leftDirection' : item.leftDirection
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
			var point;
			if(centerPoint.equals(item.point)){
				point = centerPoint;
			}
			else{
				//if angle is to the left of the centerPoint, it should be negative
				item.angleRad = item.angleRad > Math.PI ? item.angleRad - 2 * Math.PI : item.angleRad;
				point = JSX.math.parametricCirclePoint(centerPoint.point, item.distance, radiansFromOrigin + item.angleRad);
				point.leftDirection = item.leftDirection;
				point.rightDirection = item.rightDirection;
			}
			pathPoints.push(point);	
			
		});
		drawPath(pathPoints);
	}
}

function drawPath(pointsArray){
	var pathItem = currentLayer.pathItems.add();
	pathItem.stroked = false;
	pathItem.fillColor = color.getColor();
	pathItem.closed = true;
	// JSX.array.each(pointsArray, function(item){
	// 	var pathPoint = pathItem.pathPoints.add();
	// 	pathPoint.anchor = item.point;
	// 	pathPoint.leftDirection = item.leftDirection;
	// 	pathPoint.rightDirection = item.rightDirection;
	// });
	pathItem.setEntirePath(pointsArray.map(function(item){return item.point;}));
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
var currentLayer; //required to draw on same layer in case top layer is hidden or locked
var selectedItems = JSX.vector.selectedPathItems();
if(selectedItems.length > 0){
	JSX.array.each(selectedItems, function(item){
		currentLayer = item.layer;
		rotateItem(item);
	});
}

