/*
* Color functions
*/
var JSX = JSX || {};
JSX.color = {};

/*
* takes rgb object (adobe color not JSX.color.Color object)
* converts object {red: [0-255], blue: [0-255], green: [0-255]}
* returns object {hue: [0-360] (degrees), saturation: [0-1] (percent), brightness: [0-1](percent)}
* formula from: http://www.rapidtables.com/convert/color/rgb-to-hsl.htm
*/
JSX.color.rgbToHSL = function(rgbColor){
	return {
		'hue': JSX.color.hue(rgbColor),
		'saturation': JSX.color.saturation(rgbColor),
		'lightness': JSX.color.lightness(rgbColor)
	};
}
/*
* @param hslColor = object {hue: 0-360, saturation: 0-1, brightness: 0-1}
* @returns object {red: 0-255, blue: 0-255, green: 0-255}
* formula from: https://en.wikipedia.org/wiki/HSL_and_HSV#From_HSL
*/
JSX.color.hslToRGB = function(hslColor){
	var c = (1 - Math.abs(2 * hslColor.lightness - 1)) * hslColor.saturation;
	var x = c * (1 - Math.abs((hslColor.hue / 60) % 2 - 1));
	var m = hslColor.lightness - (c / 2);

	var cFactor;
	if(hslColor.hue < 60 || hslColor.hue === 360){
		cFactor = {'r': c, 'g': x, 'b': 0};
	}
	else if(hslColor.hue < 120){
		cFactor = {'r': x, 'g': c, 'b': 0};
	}
	else if(hslColor.hue < 180){
		cFactor = {'r': 0, 'g': c, 'b': x};
	}
	else if(hslColor.hue < 240){
		cFactor = {'r': 0, 'g': x, 'b': c};
	}
	else if(hslColor.hue < 300){
		cFactor = {'r': x, 'g': 0, 'b': c};
	}
	else{
		cFactor = {'r': c, 'g': 0, 'b': x};
	}
	//sometimes error about value being below the minimum allowed value
	var colors =  {'red': Math.round(255 * (cFactor.r + m)), 'green': Math.round(255 * (cFactor.g + m)), 'blue': Math.round(255 * (cFactor.b + m))};
	var color = new RGBColor();
	color.red = colors.red;
	color.green = colors.green;
	color.blue = colors.blue;	
	return color;
}


JSX.color.hue = function(rgbColor){
	var colorMinMax = JSX.array.minMax([rgbColor.red, rgbColor.green, rgbColor.blue]);
	var colorDelta = colorMinMax.max - colorMinMax.min;
	if(colorDelta <= 0){
		return 0;
	}
	if(colorMinMax.max === rgbColor.green){
		return 60 * (((rgbColor.blue - rgbColor.red) / colorDelta) + 2);
	}
	else if(colorMinMax.max === rgbColor.blue){
		return 60 * (((rgbColor.red - rgbColor.green) / colorDelta) + 4);
	}
	return 60 * (((rgbColor.green - rgbColor.blue) / colorDelta) % 6);
}
JSX.color.saturation = function(rgbColor){
	var colorMinMax = JSX.array.minMax([rgbColor.red, rgbColor.green, rgbColor.blue]);
	var colorDelta = colorMinMax.max - colorMinMax.min;
	if(colorDelta <= 0){
		return 0;
	}
	return colorDelta / ((1 - Math.abs(2 * JSX.color.lightness(rgbColor) - 1)) * 255);
}
JSX.color.lightness = function(rgbColor){
	var colorMinMax = JSX.array.minMax([rgbColor.red, rgbColor.green, rgbColor.blue]);
	return (colorMinMax.max + colorMinMax.min) / (2 * 255);
}

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