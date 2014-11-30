var util = require('util');
var EventEmitter = require('events').EventEmitter;
var Leap = require('leapjs');

module.exports = (function () {
  var ee = new EventEmitter();
  var leapController = new Leap.Controller({enableGestures: true});
  var lastGesture = 0;
  var gestureDelay = 500;

  leapController.on('frame', function (frame) {
    var now = new Date().getTime();

    if (frame.gestures.length > 0 && (now - lastGesture) > gestureDelay) {
      var gesture = frame.gestures[0];

      if (frame.hands.length === 1) {
        if (frame.fingers.length > 1 && gesture.type === 'swipe') {
          var x = gesture.direction[0];
          var y = gesture.direction[1];

          if (Math.abs(x) > Math.abs(y)) {
            // Horizontal, Left/Right gesture

            if (x > 0) {
              ee.emit('leap:gesture', { dir: 'right' } );
            } else {
              ee.emit('leap:gesture', { dir: 'left' } );
            }
          } else {
            // Vertical, Up/Down gesture
            if (y > 0) {
              ee.emit('leap:gesture', { dir: 'up' } );
            } else {
              ee.emit('leap:gesture', { dir: 'down' } );
            }
          }

          lastGesture = now;
        }
      }
    }
  });

  leapController.connect();
  return ee;
})();

