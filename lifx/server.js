var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('www'));

var lifx = require('./lifx');
server.listen(4000);
console.log('Server listening on port ' + 4000);

io.on('connection', function (socket) {
  socket.emit('hello');

  lifx.on('lifx:bulb', function(bulb) {
    console.log('Lifx bulb: ', bulb);
  });
});

app.get('/lights', function(req, res) {
  var bulbs = lifx.listBulbs();
  res.json(bulbs);
});

app.get('/lights/on', function(req, res) {
  lifx.lightsOn();
  res.status(200).send();
});


app.get('/lights/off', function(req, res) {
  lifx.lightsOff();
  res.status(200).send();
});

app.get('/lights/color/:r/:g/:b', function(req, res) {
  // TODO - add query params for hsl
  lifx.lightsColor(req.params.r, req.params.g, req.params.b);
  res.status(200).send();
});