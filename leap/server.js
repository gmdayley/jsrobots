var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('www'));

var leap = require('./leap');
server.listen(4000);
console.log('Server listening on port ' + 4000);

io.on('connection', function (socket) {
  socket.emit('hello');

  leap.on('leap:gesture', function(gesture) {
    console.log('Leap gesture: ', gesture);
    socket.emit('leap:gesture', gesture);
  });
});
