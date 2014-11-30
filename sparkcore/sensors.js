var config = require('config');
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var request = require('request');

module.exports = (function (interval) { console.log('hello');
  var ee = new EventEmitter();
  interval = interval || 1000;

  var data = { temp: -1, light: -1};


  getTemperature();
  getLight();

  setInterval(function(){
    ee.emit('data', data);
  }, interval);

  function getTemperature() {
    request('https://api.spark.io/v1/devices/' + config.sparkcore.deviceId1 +
      '/temperature?access_token='+ config.sparkcore.access_token, function(err, res, body) {

      if(!!err) {
        console.log('Error: ', err);
        ee.emit('error', err);
      } else {
        data.temp = JSON.parse(body).result;
      }
      setTimeout(getTemperature, 1000);
    });
  }

  function getLight() {
    request('https://api.spark.io/v1/devices/' + config.sparkcore.deviceId1 +
    '/light?access_token='+ config.sparkcore.access_token, function(err, res, body) {

      if(!!err) {
        console.log('Error: ', err);
        ee.emit('error', err);
      } else {
        data.light = JSON.parse(body).result;
      }
      setTimeout(getLight, 1000);
    });
  }

  return ee;
})();