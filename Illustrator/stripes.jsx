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

stripe(rect_width, gutter);


function stripe(rect_width, gutter){
	//so stripes can be rotated vertically and still cover height
	var maxDimension = JSX.doc.width >= JSX.doc.height ? JSX.doc.width : JSX.doc.height;
	//so that the stripes can be rotated diagonally and still cover area
	var diagonalMax = maxDimension * 1.5;
	var total_stripe_width = rect_width + gutter;
	var num_rect = Math.ceil(diagonalMax / total_stripe_width)
	var startingPoint = maxDimension * 0.25;

	for (var i = 0; i < num_rect; i++) {
		JSX.doc.pathItems.rectangle(startingPoint, (i * total_stripe_width) - startingPoint, rect_width, diagonalMax);	
	};
}
