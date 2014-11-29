var config = require('config');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var request = require('request');

module.exports = (function (interval) { console.log('hello');
  var ee = new EventEmitter();
  interval = interval || 1000;


  getTemperature();
  getLight();

  function getTemperature() {
    request('https://api.spark.io/v1/devices/' + config.sparkcore.deviceId1 +
      '/temperature?access_token='+ config.sparkcore.access_token, function(err, res, body) {

      if(!!err) {
        console.log('Error: ', err);
        ee.emit('error', err);
      } else {
        var temp = JSON.parse(body).result;
        ee.emit('temp', temp);
      }
      setTimeout(getTemperature, interval);
    });
  }

  function getLight() {
    request('https://api.spark.io/v1/devices/' + config.sparkcore.deviceId1 +
    '/light?access_token='+ config.sparkcore.access_token, function(err, res, body) {

      if(!!err) {
        console.log('Error: ', err);
        ee.emit('error', err);
      } else {
        var light = JSON.parse(body).result;
        ee.emit('light', light);
      }
      setTimeout(getLight, interval);
    });
  }

  return ee;
})();