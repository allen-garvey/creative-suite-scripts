/*
* Creates random circles
*/
//creates new document if not already open
var doc = app.documents.length > 0 ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB, 512, 512);
var artLayer = doc.activeLayer;

function createRandomEllipse(maxRadius){
	maxRadius = maxRadius || 72;
	var r = powLawRandomNumber() * maxRadius;
	//units are in points- y, x, f1, f2
	//y is from top of document, x is from left
	var ellipse = doc.pathItems.ellipse(doc.height * Math.random() * -1, doc.width * Math.random(), r, r);

	var newColor = new RGBColor();
	newColor.red = Math.random() * 255;
	newColor.green = Math.random() * 255;
	newColor.blue = Math.random() * 255;

	ellipse.fillColor = newColor;
	ellipse.stroked = false;	
}

/*
* Creates random number between 0 and 1 following 'power law distribution
* the higher the power, the more the distribution is skewed towards 0
*/
function powLawRandomNumber(){
	return Math.pow(Math.random(), 4);
}

for (var i = 0; i < 1000; i++) {
	createRandomEllipse(72);
};
