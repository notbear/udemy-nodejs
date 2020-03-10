const request = require('request');

const forecast = (lat, long, callback) => {
  const url = `https://api.darksky.net/forecast/b9c473e7434b2d67a778ea7ae98d95b1/${lat},${long}?units=si`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(error);
      return;
    }
    if (response.body.error) {
      callback(response.body.code + ' ' + response.body.error);
      return;
    }
    callback(null, response.body.currently);
  });
};

exports.forecast = forecast;
