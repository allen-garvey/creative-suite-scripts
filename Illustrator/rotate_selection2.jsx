#include lib/index.jsx
/*
* Rotates selected pathItem to create kaleidoscope-like effect
* rotates around center
* works on curved objects as well as those with straight lines
*/

/*
*Duplicates and rotates item
*/
function rotateItem(pathItem){
	var angleOffset = 360.0 / numRotations;
	for(var i=1;i<numRotations;i++){
		var rotatedPathItem = pathItem.duplicate();
		//uncomment to change the color of rotations
		// rotatedPathItem.fillColor = color.getColor();
		rotatedPathItem.rotate(angleOffset * i, true, false, false, false, transformationOrigin);
	}
	
}


//total number of rotated objects including the original, so that one less than number of numRotations is drawn
var numRotations = 5;
var color = new JSX.color.Palette();
//adobe transformation class enum
//values are BOTTOM, CENTER, TOP, BOTTOMLEFT,BOTTOMRIGHT, DOCUMENTORIGIN, LEFT,RIGHT,TOPLEFT, TOPRIGHT
var transformationOrigin = Transformation.BOTTOMRIGHT;
var currentLayer; //required to draw on same layer in case top layer is hidden or locked
var selectedItems = JSX.vector.selectedPathItems();
if(selectedItems.length > 0){
	JSX.array.each(selectedItems, function(item){
		currentLayer = item.layer;
		rotateItem(item);
	});
}

