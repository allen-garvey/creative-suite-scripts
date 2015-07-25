#include lib/index.jsx
/*
* Creates random circles
*/

function createRandomEllipse(maxRadius){
	maxRadius = maxRadius || 72;
	var r = JSX.math.random.powLawRandInt(3) * maxRadius;
	//units are in points- y, x, width, height
	//y is from top of document, x is from left
	var ellipse = JSX.doc.pathItems.ellipse(JSX.doc.height * Math.random() * -1, JSX.doc.width * Math.random(), r, r);
	ellipse.fillColor = color.getColor();
	ellipse.stroked = false;
}

var smallestDimen = JSX.doc.height < JSX.doc.width ? JSX.doc.height : JSX.doc.width;
var maxRadius = Math.floor(smallestDimen / 20);
var color = new JSX.color.Color();
for (var i = 0; i < 1000; i++) {
	createRandomEllipse(maxRadius);
};
