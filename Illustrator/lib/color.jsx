/*
* Color functions
*/
var JSX = JSX || {};
JSX.color = {};

JSX.color.GreyscaleColor = function(){};
JSX.color.GreyscaleColor.prototype.getColor = function() {
	var value = Math.random() * 255;
	var randColor = new RGBColor();
	randColor.red = value;
	randColor.green = value;
	randColor.blue = value;
	return randColor;
};

JSX.color.Color = function(){};
JSX.color.Color.prototype.getColor = function(){
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
JSX.color.MonochromaticColor = function(hueName, hueValue){
	this.hueName = hueName ? hueName : JSX.math.random.randElement(this.hueNames);
	this.hueValue = (hueValue || hueValue===0 ) ? hueValue : JSX.math.random.randInt(0, 255);
};
JSX.color.MonochromaticColor.prototype.hueNames = ['red', 'green', 'blue'];

/**
* Returns monochromatic color based on base hue color picked on class construction
* brightness is int 0-255
*/
JSX.color.MonochromaticColor.prototype.colorFromBrightness = function(brightness) {
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
JSX.color.MonochromaticColor.prototype.getColor = function() {
	return this.colorFromBrightness(JSX.math.random.randInt(0, 255));
};

/**
* Class for palette
* gets a random color based on array of monochromatic colors used as palette
* palette is either array of monochromatic colors [MonchromaticColor]
* or an int of the length of the array of monochromatic colors that should be generated randomly
* with no palette give a palette of 3 random monochromatic colors will be created
*/
JSX.color.Palette = function(palette){
	if(Object.prototype.toString.call(palette) === '[object Array]'){
		this.palette = palette;
	}
	else{
		var paletteLen = palette ? palette : 3;
		this.palette = [];
		for (var i = 0; i < paletteLen; i++) {
			this.palette.push(new JSX.color.MonochromaticColor());
		};
	}
}
JSX.color.Palette.prototype.getColor = function() {
	return JSX.math.random.randElement(this.palette).getColor();
};