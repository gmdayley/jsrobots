var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('www'));

var sensors = require('./sensors');
console.log(sensors);

server.listen(4000);
console.log('Server listening on port ' + 4000);

sensors.on('temp', function(temp) {
  console.log('Temp: ', temp);
  io.emit('sensors:temp', temp);
});

sensors.on('light', function(light) {
  console.log('Light: ', light);
  io.emit('sensors:light', light);
});

io.on('connection', function (socket) {
  socket.emit('hello');
});
