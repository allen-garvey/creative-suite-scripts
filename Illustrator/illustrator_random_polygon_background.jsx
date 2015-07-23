/*
* Creates a fill of random polygons inside artboard
* Sizing doesn't work correctly on new artboard for some reason
*/
//creates new document if not already open
var doc = app.documents.length > 0 ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB, 512, 512);

/*
* Color functions
*/
function randGreyScaleColor(){
	var value = Math.random() * 255;
	var randColor = new RGBColor();
	randColor.red = value;
	randColor.green = value;
	randColor.blue = value;
	return randColor;
}

function randColor(){
	var randColor = new RGBColor();
	randColor.red = Math.random() * 255;
	randColor.green = Math.random() * 255;
	randColor.blue = Math.random() * 255;
	return randColor;
}

/*
* Covers the artboard in squares like a grid based on the integer number specified
*/
function createGridSquares(numSquares){
	numSquares = numSquares ? numSquares : 4;
	var numCols;
	var numRows;
	if(isSquareOfInteger(numSquares)){
		var square = Math.sqrt(numSquares);
		numCols = square;
		numRows = square;
	}
	else{
		numRows = 2;
		numCols = numSquares / numRows;
	}
	var xOffset = doc.width / numCols;
	var yOffset = doc.height / numRows;
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
* Tests if a number is the square root of an integer
*/
function isSquareOfInteger(num){
	return Math.sqrt(num) % 1 === 0;
}

/*
* Creates a polygon based on array on points
* e.g. pointsArray = [[1, 2],[2,4 ],[5, 5]]; where [x, y]
*/
function createPolygon(pointsArray){
	var line = doc.pathItems.add();
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
	var sides = getRandInt(minLength, maxLength);
	var pointsArray = [];
	for (var i = 0; i < sides; i++) {
		pointsArray.push([doc.width * Math.random(), doc.height * Math.random() * -1]);
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
	var sides = getRandInt(minLength, maxLength);
	var pointsArray = [];
	for (var i = 0; i < sides; i++) {
		do{
			var point = randElementFromArray(gridPointsArray);
		}while(isPointInArray(point, pointsArray));
		pointsArray.push(point);
	};

	return pointsArray;
}

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * Courtesy of MDN
 */
function getRandInt(min, max) {
	//sets default min to 0 if not specified
	if(!max && max !== 0){
		max = min;
		min = 0;
	}
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Used to add points to grid points array to keep track of all the grid vertices(points) on artboard
 */
 function addPointsArrayToGridPointsArray(pointsArray){
 	for (var i = 0; i < pointsArray.length; i++) {
	 	gridPointsArray.push(pointsArray[i]);
 	};
 }

 function randElementFromArray(lvArray){
 	return lvArray[Math.floor(Math.random() * lvArray.length)];
 }

/**
 * Tests if a point [x,y] is in an array of points
 */
 function isPointInArray(point, pointsArray){
 	for (var i = 0; i < pointsArray.length; i++) {
 		if ((pointsArray[i][0] === point[0]) && (pointsArray[i][1] === point[1])) {
 			return true;
 		};
 	};
 	return false;
 }

/**
 * Application Main
 */
//used to hold all the points used in grid and random seed polygons
//so that random created polygons points will be touching the grid points
var gridPointsArray = [];
//used to set the fill color of all the polygons created in this script
//should return a color object
var colorFunc = function(){return randGreyScaleColor();};
var squaresInGrid = 16;
var numSeedPolygons = 16;
var numGridPolygons = 2000;

function main(){
	createGridSquares(squaresInGrid);
	//creates 'seed' random polygons so that the polygon background fill doesn't look too regular
	for (var i = 0; i < numSeedPolygons; i++) {
		var randPointsArray = createRandomPointsArray();
		addPointsArrayToGridPointsArray(randPointsArray);
		createPolygon(randPointsArray);
	};
	for (var i = 0; i < numGridPolygons; i++) {
		createPolygon(createRandomPointsArrayFromGrid());
	};
}

main();
