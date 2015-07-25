/*
* Serves as an index to import all includes
* should be imported instead of includes individually
*/
var JSX = {};
//creates new document if not already open
//Sizing (width and height) doesn't work correctly on new document for some reason
JSX.doc = app.documents.length > 0 ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB, 512, 512);

#include math.jsx
#include color.jsx
#include vector.jsx