const request = require('postman-request');
const { MAPBOX_API_KEY } = require('../../env.json');

const MAPBOX_URL = 'https://api.mapbox.com';

const geocode = (address, callback) => {
  const safeAddr = encodeURIComponent(address);
  const geocodingPath = `${MAPBOX_URL}/geocoding/v5/mapbox.places/${safeAddr}.json?access_token=${MAPBOX_API_KEY}&limit=1`;
  request(
    {
      url: geocodingPath,
      json: true,
    },
    (err, _resp, body) => {
      if (err) {
        console.error('Geocoding error!', err);
        callback(err);
      } else if (body.features.length === 0) {
        callback('Unable to find location!');
      } else {
        const placeData = body.features[0];
        const [lat, lng] = placeData.center;
        callback(undefined, { lat, lng, location: placeData.place_name });
      }
    }
  );
};

module.exports = geocode;
