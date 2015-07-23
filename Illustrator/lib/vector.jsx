/*
* Functions for creating vectors (lines, paths and points on line)
*/
var JSX = JSX || {};
JSX.vector = {};

/**
 * Tests if a point [x,y] is in an array of points
 */
JSX.vector.isPointInArray = function(point, pointsArray){
 	for (var i = 0; i < pointsArray.length; i++) {
 		if ((pointsArray[i][0] === point[0]) && (pointsArray[i][1] === point[1])) {
 			return true;
 		};
 	};
 	return false;
}