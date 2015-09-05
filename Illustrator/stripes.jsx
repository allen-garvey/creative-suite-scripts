#include lib/index.jsx
/*
* Covers document in rectangular stripes
*/

/*
* Sets default fill and stroke colors
*/
// var color = new RGBColor();
// color.red = 0;
// color.green = 0;
// color.blue = 0;
// JSX.doc.defaultStroked = false;
// JSX.doc.defaultFilled = true;
// JSX.doc.defaultFillColor = color;

var rect_width = 20;
var gutter = 40;

// stripe(rect_width, gutter);
// fibStripe(1,1);
fibStripe3(1, 10);


function stripe(rect_width, gutter){
	//so stripes can be rotated vertically and still cover height
	var maxDimension = JSX.doc.width >= JSX.doc.height ? JSX.doc.width : JSX.doc.height;
	//so that the stripes can be rotated diagonally and still cover area
	var diagonalMax = maxDimension * 1.5;
	var total_stripe_width = rect_width + gutter;
	var num_rect = Math.ceil(diagonalMax / total_stripe_width);
	var startingPoint = maxDimension * 0.25;

	for (var i = 0; i < num_rect; i++) {
		JSX.doc.pathItems.rectangle(startingPoint, (i * total_stripe_width) - startingPoint, rect_width, diagonalMax);	
	};
}

/*
* Calculates the length of fibonacci sequence needed to cover width
*/
function fibSequenceLength(rect_width, gutter, totalWidth){
	var total_stripe_width = rect_width + gutter;
	var seqLength = 1;
	var currentFibNum = 1;
	var prevFibNum = 1;
	while(currentFibNum * total_stripe_width <= totalWidth){
		temp = currentFibNum;
		currentFibNum = currentFibNum + prevFibNum;
		prevFibNum = temp;
		seqLength++;
	}
	//sum of fibaanacci numbers is 2 greater than sequence length
	if(seqLength > 2){
		seqLength -= 2;
	}

	return seqLength;
}

/*
* Used by fibStripe 3. Calculates the length of fibonacci sequence needed to cover width with increasing stripe width but fixed gutter
*/
function fibSequenceLength2(rect_width, gutter, totalWidth){
	var seqLength = 1;
	var currentFibNum = 1;
	var prevFibNum = 1;
	while((currentFibNum * rect_width) + gutter <= totalWidth){
		temp = currentFibNum;
		currentFibNum = currentFibNum + prevFibNum;
		prevFibNum = temp;
		seqLength++;
	}
	//sum of fibaanacci numbers is 2 greater than sequence length
	if(seqLength > 2){
		seqLength -= 2;
	}

	return seqLength;
}

/*
* Covers document in stripes which increase in width based on fibonacci sequence
*/
function fibStripe(rect_width, gutter){
	//so stripes can be rotated vertically and still cover height
	var maxDimension = JSX.doc.width >= JSX.doc.height ? JSX.doc.width : JSX.doc.height;
	//so that the stripes can be rotated diagonally and still cover area
	var diagonalMax = maxDimension * 1.5;
	var total_stripe_width = rect_width + gutter;
	var num_rect = fibSequenceLength(rect_width, gutter, diagonalMax);
	var startingPoint = maxDimension * 0.25;

	var fibNumbers = JSX.math.fibArray(num_rect);
	fibNumbers.unshift(0);

	for (var i = 0; i < fibNumbers.length; i++) {
		JSX.doc.pathItems.rectangle(startingPoint, (fibNumbers[i] * total_stripe_width) - startingPoint, fibNumbers[i] * rect_width, diagonalMax);	
	};
}

/*
* Covers document in stripes which stay the same width while the gutters increase in width based on fibonacci sequence
*/
function fibStripe2(rect_width, gutter){
	//so stripes can be rotated vertically and still cover height
	var maxDimension = JSX.doc.width >= JSX.doc.height ? JSX.doc.width : JSX.doc.height;
	//so that the stripes can be rotated diagonally and still cover area
	var diagonalMax = maxDimension * 1.5;
	var total_stripe_width = rect_width + gutter;
	var num_rect = fibSequenceLength(rect_width, gutter, diagonalMax) + 2;
	var startingPoint = maxDimension * 0.25;

	var fibNumbers = JSX.math.fibArray(num_rect);
	fibNumbers.unshift(0);

	for (var i = 0; i < fibNumbers.length; i++) {
		JSX.doc.pathItems.rectangle(startingPoint, Math.ceil(fibNumbers[i] * total_stripe_width * 0.5) - startingPoint, rect_width, diagonalMax);	
	};
}


/*
* Covers document in stripes which increase in width based on fibonacci sequence while gutters remain fixed width
*/
function fibStripe3(rect_width, gutter){
	//so stripes can be rotated vertically and still cover height
	var maxDimension = JSX.doc.width >= JSX.doc.height ? JSX.doc.width : JSX.doc.height;
	//so that the stripes can be rotated diagonally and still cover area
	var diagonalMax = maxDimension * 1.5;
	var total_stripe_width = rect_width + gutter;
	var num_rect = fibSequenceLength2(rect_width, gutter, diagonalMax) * 1.5;
	var startingPoint = maxDimension * 0.25;

	var fibNumbers = JSX.math.fibArray(num_rect);
	fibNumbers.unshift(0);
	var horizontalStartingPoint = 1 - startingPoint;
	for (var i = 0; i < fibNumbers.length; i++) {
		if(i > 0){
			horizontalStartingPoint = horizontalStartingPoint + Math.ceil(Math.sqrt(fibNumbers[i-1] * rect_width)) + gutter;
		}
		JSX.doc.pathItems.rectangle(startingPoint, horizontalStartingPoint, Math.ceil(Math.sqrt(fibNumbers[i] * rect_width)), diagonalMax);	
	};
}






