#include lib/index.jsx
/*
* Creates a random triangles that fit to artboard
* Sizing doesn't work correctly on new artboard for some reason
*/
//creates new document if not already open
var doc = app.documents.length > 0 ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB, 512, 512);
var triangleAmount = 100;
var color = new JSX.color.GreyscaleColor();

function createRandomTriangle(){
	var line = doc.pathItems.add();
	line.stroked = false;
	line.closed = true;
	line.setEntirePath([
						[doc.width * Math.random(), doc.height * Math.random() * -1], 
						[doc.width * Math.random(), doc.height * Math.random() * -1],
						[doc.width * Math.random(), doc.height * Math.random() * -1]
						]);

	line.fillColor = color.getColor();
}

for (var i = 0; i < triangleAmount; i++) {
	createRandomTriangle();
};
