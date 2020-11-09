const path = require('path');
const express = require('express');

const app = express();

const publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

app.get('/weather', (req, res) => {
  const weather = {
    temperature: 32,
    location: 'Boulder, CO, United States'
  };
  res.send(JSON.stringify(weather));
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});