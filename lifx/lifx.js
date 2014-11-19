var lifx = require('lifx');
var lx = lifx.init();

var EventEmitter = require('events').EventEmitter;

module.exports = (function() {
  var ee = new EventEmitter();

  lx.on('bulb', function(bulb) {
    ee.emit('bulb', bulb);
  });

  function lightsOn(bulb) {
    lx.lightsOn(bulb);
  }

  function lightsOff(bulb) {
    lx.lightsOff(bulb);
  }

  function lightsColor(hue, saturation, luminance, whiteColor, fadeTime, bulb) {
    lx.lightsColour(hue, saturation, luminance,  whiteColor, fadeTime, bulb);
  }

  function listBulbs() {
    return lx.bulbs;
  }

  return {
    on: ee.on,
    listBulbs: listBulbs,
    lightsOn: lightsOn,
    lightsOff: lightsOff,
    lightsColor: lightsColor
  }
})();