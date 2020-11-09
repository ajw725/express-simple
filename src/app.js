const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.get('/help', (req, res) => {
  res.send('Help is on the way!');
});

app.get('/about', (req, res) => {
  res.send('About');
});

app.get('/weather', (req, res) => {
  res.send('Weather Forecast');
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});