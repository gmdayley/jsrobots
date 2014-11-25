var lifx = require('lifx');
var lx = lifx.init();
//lifx.setDebug(true);
var colors = require('./colors');

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

  function lightsColor(r, g, b) {
    console.log(r, g, b);
    var hsl = colors.rgbToHsl(r, g, b);
    console.log(hsl);
    var h = hsl.h,
        s = hsl.s,
        l = hsl.l,
        w = 0x0dac,
        f = 300;

    lx.lightsColour(h,s,l,w,f);
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