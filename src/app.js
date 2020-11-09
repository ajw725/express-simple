const path = require('path');
const express = require('express');

const publicPath = path.join(__dirname, '../public');

const app = express();
app.set('view engine', 'hbs');
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index');
});

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