#include lib/index.jsx
/*
* Creates random circles
*/
//creates new document if not already open
var doc = app.documents.length > 0 ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB, 512, 512);
var artLayer = doc.activeLayer;

function createRandomEllipse(maxRadius){
	maxRadius = maxRadius || 72;
	var r = JSX.math.random.powLawRandInt(3) * maxRadius;
	//units are in points- y, x, width, height
	//y is from top of document, x is from left
	var ellipse = doc.pathItems.ellipse(doc.height * Math.random() * -1, doc.width * Math.random(), r, r);
	ellipse.fillColor = color.getColor();
	ellipse.stroked = false;
}

var smallestDimen = doc.height < doc.width ? doc.height : doc.width;
var maxRadius = Math.floor(smallestDimen / 20);
var color = new JSX.color.Color();
for (var i = 0; i < 1000; i++) {
	createRandomEllipse(maxRadius);
};
