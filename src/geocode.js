const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoibm90YmVhciIsImEiOiJjazdkZTRsdm0wOHZ1M2xueTVueTQ2eTBnIn0.2AQlRQ-8dW3VfjUVHXnyug`;
  request({ url, json: true }, (error, response) => {
    if (error) {
      callback(error);
      return;
    }
    if (!response.body.features || !response.body.features.length) {
      callback('Not found');
      return;
    }
    const lat = response.body.features[0].center[1];
    const long = response.body.features[0].center[0];
    const location = response.body.features[0].place_name;
    callback(null, { lat, long, location });
  });
};

exports.geocode = geocode;
