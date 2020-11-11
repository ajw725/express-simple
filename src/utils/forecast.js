const request = require('postman-request');
const { WEATHERSTACK_API_KEY } = require('../../env.json');

const WEATHERSTACK_URL = 'http://api.weatherstack.com';

const forecast = (lat, lng, callback) => {
  const query = encodeURIComponent(`${lng},${lat}`);
  const weatherUrl = `${WEATHERSTACK_URL}/current?access_key=${WEATHERSTACK_API_KEY}&query=${query}&units=f`;
  request(
    {
      url: weatherUrl,
      json: true,
    },
    (err, _resp, body) => {
      if (err) {
        console.error('Weather retrieval error!', err);
        callback(err);
      } else if (body.error) {
        console.error('Weather retrieval error!', body.error);
        callback('Error retrieving weather data!');
      } else {
        const currentData = body.current;
        const info = `It is currently ${currentData.temperature} degrees, but it feels like ${currentData.feelslike} degrees.`;
        callback(undefined, info);
      }
    }
  );
};

module.exports = forecast;
