/*
* Init JSX functions
*/
var JSX = {};
//creates new document if not already open
//Sizing (width and height) doesn't work correctly on new document for some reason
JSX.doc = app.documents.length > 0 ? app.activeDocument : app.documents.add(DocumentColorSpace.RGB, 512, 512);