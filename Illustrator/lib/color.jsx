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

/**
* Class for monochromatic color
* hueName is string 'red', 'green', or 'blue'
* hueValue is int 0-255
* if either of the values are not provided they will be assigned randomly
*/
function MonochromaticColor(hueName, hueValue){
	this.hueName = hueName ? hueName : randElementFromArray(this.hueNames);
	this.hueValue = (hueValue || hueValue===0 ) ? hueValue : getRandInt(0, 255);
}
MonochromaticColor.prototype.hueNames = ['red', 'green', 'blue'];

/**
* Returns monochromatic color based on base hue color picked on class construction
* brightness is int 0-255
*/
MonochromaticColor.prototype.colorFromBrightness = function(brightness) {
	var color = new RGBColor();
	for (var i = 0; i < this.hueNames.length; i++) {
		if(this.hueNames[i] === this.hueName){
			color[this.hueNames[i]] = this.hueValue;
		}
		else{
			color[this.hueNames[i]] = brightness;	
		}
	};
	return color;
};
MonochromaticColor.prototype.randMonochromaticColor = function() {
	return this.colorFromBrightness(getRandInt(0, 255));
};

/**
* Class for palette
* gets a random color based on array of monochromatic colors used as palette
* palette is either array of monochromatic colors [MonchromaticColor]
* or an int of the length of the array of monochromatic colors that should be generated randomly
* with no palette give a palette of 3 random monochromatic colors will be created
*/
function Palette(palette){
	if(Object.prototype.toString.call(palette) === '[object Array]'){
		this.palette = palette;
	}
	else{
		var paletteLen = palette ? palette : 3;
		this.palette = [];
		for (var i = 0; i < paletteLen; i++) {
			this.palette.push(new MonochromaticColor());
		};
	}
}
Palette.prototype.randPaletteColor = function() {
	return randElementFromArray(this.palette).randMonochromaticColor();
};