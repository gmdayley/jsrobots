var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('www'));

var sensors = require('./sensors');

server.listen(4003);
console.log('Server listening on port ' + 4003);

sensors.on('data', function(data) {
  io.emit('sensors:data', data);
});

io.on('connection', function (socket) {
  socket.emit('hello');
});
