#include lib/index.jsx
/*
* Changes the fill color of each object in the document
* requires a document to be open and contain objects in it first for this to work properly
*/

var color = new JSX.color.Palette();
JSX.array.each(JSX.doc.pathItems, function(item, i){
	item.fillColor = color.getColor();
});