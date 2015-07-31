#include lib/index.jsx
/*
* Changes the fill color hue of each object in the document while maintaining saturation and brightness
* requires a document to be open and contain objects in it first for this to work properly
*/

var hue = JSX.color.rgbToHSL(new JSX.color.Color().getColor()).hue;

JSX.vector.foreachPathItem(function(item, i){
	var hsl = JSX.color.rgbToHSL(item.fillColor);
	hsl.hue = hue;
	item.fillColor = JSX.color.hslToRGB(hsl);
});
