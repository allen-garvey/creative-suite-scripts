/*
* Functions for working on arrays and array-like collections
*/
var JSX = JSX || {};
JSX.array = {};

/*
* convenience function for performing an action on each item in an array or array-like collection,
* e.g.: document.pathItems, document.rasterItems, document.gradients, document.layers, 
* document.graphicStyles, document.paragraphs, document.textFonts, etc.
*
* takes array and function to be called on each item in the form of: function(item, index)
*/
JSX.array.each = function(lvArray, func){
	var len = lvArray.length;
	for (var i = 0; i < len; i++) {
		func(lvArray[i], i);
	};
}
/*
* Returns object with the min and maximum values in an array
*/
JSX.array.minMax = function(lvArray){
	lvArray = lvArray.sort(function(a, b){return a - b;});
	return {'min': lvArray[0], 'max' : lvArray[lvArray.length - 1]};
}

/*
* Adobe inexplicably removed the map function for some reason
*/
Array.prototype.map = Array.prototype.map || function(func) {
	var newArray = [];
	JSX.array.each(this, function(item, i){
		newArray.push(func(item, i));
	});
	return newArray;
};


