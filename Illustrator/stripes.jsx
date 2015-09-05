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
	var total_stripe_width = rect_width + gutter;
	var num_rect = Math.ceil(JSX.doc.width / total_stripe_width)

	for (var i = 0; i < num_rect; i++) {
		JSX.doc.pathItems.rectangle(0, i * total_stripe_width, rect_width, JSX.doc.height);	
	};
}
