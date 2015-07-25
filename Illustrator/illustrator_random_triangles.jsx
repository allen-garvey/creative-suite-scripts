#include lib/index.jsx
/*
* Creates a random triangles that fit to artboard
*/
var triangleAmount = 100;
var color = new JSX.color.GreyscaleColor();

function createRandomTriangle(){
	var line = JSX.doc.pathItems.add();
	line.stroked = false;
	line.closed = true;
	line.setEntirePath([
						[JSX.doc.width * Math.random(), JSX.doc.height * Math.random() * -1], 
						[JSX.doc.width * Math.random(), JSX.doc.height * Math.random() * -1],
						[JSX.doc.width * Math.random(), JSX.doc.height * Math.random() * -1]
						]);

	line.fillColor = color.getColor();
}

for (var i = 0; i < triangleAmount; i++) {
	createRandomTriangle();
};
