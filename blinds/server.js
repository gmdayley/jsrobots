var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var SmartBlind = require('./smartblind');
server.listen(80);

app.get('/rotate/:degree', function (req, res) {
  console.log('Rotate servo: ' + req.params.degree);
  SmartBlind.rotate(parseInt(req.params.degree));
  res.send('ok');
});

io.on('connection', function (socket) {
  SmartBlind.on('degree_changed', function(data) {
    socket.emit('blind_degree_changed', data.degree);
  });
});