#include lib/index.jsx
/*
* Creates a fill of random polygons inside artboard
*/

/*
* Covers the artboard in squares like a grid based on the integer number specified
*/
function createGridSquares(numSquares){
	numSquares = numSquares ? numSquares : 4;
	var numCols;
	var numRows;
	if(JSX.math.isSquareOfInteger(numSquares)){
		var square = Math.sqrt(numSquares);
		numCols = square;
		numRows = square;
	}
	else{
		numRows = 2;
		numCols = numSquares / numRows;
	}
	var xOffset = JSX.doc.width / numCols;
	var yOffset = JSX.doc.height / numRows;
	for (var i = 0; i < numRows; i++) {
		var yStart = yOffset * i * -1;
		for (var j = 0; j < numCols; j++) {
			var xStart = xOffset * j;
			var pointsArray = [[xStart, yStart], [xStart + xOffset, yStart], [xStart + xOffset, yStart - yOffset], [xStart, yStart - yOffset]];
			createPolygon(pointsArray);
			//save points to be used later by random polygons
			addPointsArrayToGridPointsArray(pointsArray);
		};
	};
}

/*
* Creates a polygon based on array on points
* e.g. pointsArray = [[1, 2],[2,4 ],[5, 5]]; where [x, y]
*/
function createPolygon(pointsArray){
	var line = JSX.doc.pathItems.add();
	line.stroked = false;
	line.closed = true;
	line.setEntirePath(pointsArray);
	line.fillColor = colorFunc();
}

/*
* Creates random array of points
* minLength should be the  minimum side amount of the created polygon
* maxLength should be the  maximum side amount of the created polygon
*/
function createRandomPointsArray(minLength, maxLength){
	minLength = minLength ? minLength : 3;
	maxLength = maxLength ? maxLength : 5;
	var sides = JSX.math.random.randInt(minLength, maxLength);
	var pointsArray = [];
	for (var i = 0; i < sides; i++) {
		pointsArray.push([JSX.doc.width * Math.random(), JSX.doc.height * Math.random() * -1]);
	};

	return pointsArray;
}

/*
* Creates random array of points based on points on grid as well as seed polygons
* minLength should be the  minimum side amount of the created polygon
* maxLength should be the  maximum side amount of the created polygon
*/
function createRandomPointsArrayFromGrid(minLength, maxLength){
	minLength = minLength ? minLength : 3;
	maxLength = maxLength ? maxLength : 5;
	var sides = JSX.math.random.randInt(minLength, maxLength);
	var pointsArray = [];
	for (var i = 0; i < sides; i++) {
		do{
			var point = JSX.math.random.randElement(gridPointsArray);
		}while(JSX.vector.isPointInArray(point, pointsArray));
		pointsArray.push(point);
	};

	return pointsArray;
}

/**
 * Used to add points to grid points array to keep track of all the grid vertices(points) on artboard
 */
 function addPointsArrayToGridPointsArray(pointsArray){
 	for (var i = 0; i < pointsArray.length; i++) {
	 	gridPointsArray.push(pointsArray[i]);
 	};
 }

/**
 * Application Main
 */
//used to hold all the points used in grid and random seed polygons
//so that random created polygons points will be touching the grid points
var gridPointsArray = [];
//used to set the fill color of all the polygons created in this script
//should return a color object
var masterColor = new JSX.color.Palette();
var colorFunc = function(){return masterColor.getColor();};
var squaresInGrid = 16;
var numSeedPolygons = 16;
var numGridPolygons = Math.ceil(Math.sqrt(JSX.doc.height * JSX.doc.width) / 4);

function main(){
	createGridSquares(squaresInGrid);
	//creates 'seed' random polygons so that the polygon background fill doesn't look too regular
	for (var i = 0; i < numSeedPolygons; i++) {
		var randPointsArray = createRandomPointsArray(3, 6);
		addPointsArrayToGridPointsArray(randPointsArray);
		createPolygon(randPointsArray);
	};
	for (var i = 0; i < numGridPolygons; i++) {
		createPolygon(createRandomPointsArrayFromGrid(3, 6));
	};
}

main();
