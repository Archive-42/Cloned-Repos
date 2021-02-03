var infoColor = '#888888';
var errorColor = 'red';
var messageColor = '#000000';
var nameColor = 'blue';

var formatMessage = function(user, message) {
  return '<span style="color: ' + nameColor + '">' + user + '</span>' +
    ': ' + message;
};

var postMessage = function (color, contents) {
  console.log('Error: jQuery not ready yet');
};

$(function() {
  postMessage = function(color, contents) {
    $('<li><span style="color: ' + color + '">' 
      + contents + '</span></li>').hide().appendTo('#messages').fadeIn(200);
  };

  $('#message-form').submit(function (event) {
    event.preventDefault();
    sendMessage($('#message').val()); // server messaging
    
    //client side messaging only
    //postMessage('black', formatMessage('Me', $('#message').val()));
    $('#message').val('');
  });
});
