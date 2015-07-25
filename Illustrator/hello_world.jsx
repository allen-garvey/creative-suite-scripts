#include lib/index.jsx
/*
* Writes hello world in a text box in the middle of the document
*/

//Creates new text frame
var textFrame = JSX.doc.textFrames.add();
// Set the contents and position of the text frame 
textFrame.position = [JSX.doc.width / 2,JSX.doc.height / 2 * -1];
textFrame.contents = "Hello World!";