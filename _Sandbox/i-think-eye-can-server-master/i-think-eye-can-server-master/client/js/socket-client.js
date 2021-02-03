'use strict';
var socket = io('http://cardboardteacher.herokuapp.com/');
//var socket = io('http://localhost:3000');
socket.on('ADD_VIEW', (data) => {
    $("#current").html(data.type);
    $("#x").attr("placeholder","X position = " + data.x);
    $("#y").attr("placeholder","Y position = " + data.y)
    $("#z").attr("placeholder","Z position = " + data.z)
    $("#zoom").attr("placeholder","Zoom = " + data.zoom)
    $("#rotate").attr("placeholder","Rotate Degrees = " + data.rotate)
    if(data.type === "graph") {
        $("#equation").css("display","block");
        $("#equation").attr("placeholder", "Current Equation: " + data.equation);
    } else {
        $("#equation").css("display","none");
    }
});
/**
 * Serves an image
 */
function sendSelection(choice) {
  socket.emit('SEL', {choice: parseChoice(choice)});
}

function sendSelection(choice, eq) {
  socket.emit('SEL', {choice: parseChoice(choice), eq: eq});
}

function updateSelection(choice, x, y, z, zoom, rotate, equation) {
    socket.emit('UPD', {choice: parseChoice(choice), x: x, y:y, z:z, zoom:zoom, rotate:rotate, equation:equation});
}

function parseChoice(choice) {
  return choice - 1;
}     
