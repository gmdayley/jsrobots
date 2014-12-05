var five = require("johnny-five"),
  board, ping, piezo, alarmed;

board = new five.Board();

board.on("ready", function() {
  ping = new five.Ping(7);
  piezo = new five.Piezo(3);

  // Ping Event API

  // "data" get the current reading from the ping
  ping.on("data", function( err, value ) {
    //console.log( "data", value );
  });

  ping.on("change", function( err, value ) {

    //console.log( typeof this.inches );
    console.log( "Object is " + this.inches + "inches away" );

    if(this.inches < 36) {
        soundAlarm();
    }
  });
});


function soundAlarm() {
  alarmed = true;
  // Plays a song
  piezo.play({
    // song is composed by an array of pairs of notes and beats
    // The first argument is the note (null means "no note")
    // The second argument is the length of time (beat) of the note (or non-note)
    song: [
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["A4", 1 / 4],
      [null, 1 / 4],
      ["A4", 1],
      ["G4", 1],
      [null, 1 / 2],
      ["C4", 1 / 4],
      ["D4", 1 / 4],
      ["F4", 1 / 4],
      ["D4", 1 / 4],
      ["G4", 1 / 4],
      [null, 1 / 4],
      ["G4", 1],
      ["F4", 1],
      [null, 1 / 2]
    ],
    tempo: 100
  });

  setTimeout(function() {
    alarmed = false;
  },4000)
}

function soundAlarm() {
  var sound = [
    ["C4", 1 / 4],
    ["D4", 1 / 4],
    ["F4", 1 / 4],
    ["D4", 1 / 4],
    ["A4", 1 / 4],
    [null, 1 / 4],
    ["A4", 1],
    ["G4", 1],
    [null, 1 / 2],
    ["C4", 1 / 4],
    ["D4", 1 / 4],
    ["F4", 1 / 4],
    ["D4", 1 / 4],
    ["G4", 1 / 4],
    [null, 1 / 4],
    ["G4", 1],
    ["F4", 1],
    [null, 1 / 2]
  ];

  // Plays a song
  piezo.play({
    // song is composed by an array of pairs of notes and beats
    // The first argument is the note (null means "no note")
    // The second argument is the length of time (beat) of the note (or non-note)
    song: sound,
    tempo: 100
  });
}