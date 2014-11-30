var config = require('config');
var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var ioClient = require('socket.io-client');
server.listen(4000);
console.log('Server listening on port ' + 4000);


// Connect to Leap
var leapIo = ioClient.connect(config.leap);

leapIo.on('connect', function(d){
  console.log('Connected to leap');

  leapIo.on('leap:gesture', function(data) {
    console.log('Leap', data);
  });
});

// Connect to sensors
var sensorsIo = ioClient.connect(config.sensors);
sensorsIo.on('connect', function(d) {
  console.log('Connected to sensors');

  sensorsIo.on('sensors:data', function(data) {
    console.log('Sensors', data);
  });
});
