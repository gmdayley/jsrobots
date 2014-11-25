var Cylon = require("cylon");
var EventEmitter = require("events").EventEmitter;
var ee = new EventEmitter();

var robot = Cylon.robot({
  connection: { name: 'raspi', adaptor: 'raspi' },
  devices: [
    { name: 'button', driver: 'button', pin: 16},
    { name: 'led', driver: 'led', pin: 18 },
    { name: 'servo', driver: 'servo', pin: 12}
  ],

  work: function (my) {
    my.servo.angle(0);

    ee.emit('init', {
      degree: my.servo.currentAngle()
    });
  },

  rotate: function(degree) {
    this.servo.angle(degree);
    ee.emit('degree_changed', {
      degree: this.servo.currentAngle()
    });
  }
});

// start working
robot.start();

module.exports = robot;