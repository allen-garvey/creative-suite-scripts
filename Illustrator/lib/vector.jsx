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

/**
 * Returns point in the center of the document passed as an argument
 * or the current doc if no arguments are supplied
 */
JSX.vector.centerPoint = function(doc){
	doc = doc || JSX.doc;
	var x = doc.width / 2;
	var y = doc.height / 2 * -1;
	return new JSX.vector.Point(x, y);
}

/**
 * convenience function to perform function on each unlocked pathItem in document
 * options {'doc' : doc} - the document the pathItems are coming from, the default is JSX.doc
 */
JSX.vector.foreachPathItem = function(func, options){
	var doc = options && options.doc ? options.doc : JSX.doc;

	JSX.array.each(doc.pathItems, function(item, i){
		if(!JSX.isItemLocked(item)){
			func(item, i);
		}
	});
};

/*
* Point class
* Acts as container for point information
* x and y are floats for the x and y coordinates respectively
*/
JSX.vector.Point = function(x, y){
	this.x = x;
	this.y = y;
	this.point = [x, y];
}


