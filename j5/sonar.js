var five = require("johnny-five"),
  board, ping;

board = new five.Board();

board.on("ready", function() {
  ping = new five.Ping(7);

  // Ping Event API

  // "data" get the current reading from the ping
  ping.on("data", function( err, value ) {
    //console.log( "data", value );
  });

  ping.on("change", function( err, value ) {

    //console.log( typeof this.inches );
    console.log( "Object is " + this.inches + "inches away" );
  });
});