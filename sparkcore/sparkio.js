var config = require('config');
var Spark = require("spark-io");
var board = new Spark({
  token: config.sparkcore.access_token,
  deviceId: config.sparkcore.deviceId1
});

board.on("ready", function () {
  console.log("CONNECTED");
  this.pinMode("A0", this.MODES.ANALOG);
  this.pinMode("A7", this.MODES.ANALOG);

  this.analogRead("A0", function (data) {
    console.log('light:', data);
  });

  this.analogRead("A7", function (data) {
    console.log('tmp:', data);
  });
});