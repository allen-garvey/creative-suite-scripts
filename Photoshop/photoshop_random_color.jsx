/*
* Puts random color for each pixel
* will be very slow, recommended max document size is 256 < (w * h) / squareSize
*/
//to open file
//var doc = app.open(new File("~/Desktop/test1.bmp"));
//should have doc already open when script starts
var doc = app.activeDocument;

//int size of the square of random color in pixels, default is 1 so that each pixel will be changed
var squareSize = 16;

var sampler = doc.colorSamplers.add([0, 0]);

for (var x = 0; x < doc.width; x+=squareSize) {
    for (var y = 0; y < doc.height; y+=squareSize) {        

        sampler.move([x, y]);
        var color = sampler.color;

        var region = [
            [x, y],
            [x + squareSize, y],
            [x + squareSize, y + squareSize],
            [x, y + squareSize],
            [x, y]
        ];

        var newColor = new SolidColor();
        newColor.rgb.red = Math.random() * 255;
        newColor.rgb.green = Math.random() * 255;
        newColor.rgb.blue = Math.random() * 255;

        doc.selection.select(region);
        doc.selection.fill(newColor);

    }
}