const path = require('path');
const express = require('express');

const app = express();

// paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

// set up handlebars engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);

// set up static directory
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App'
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Andrew'
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    message: 'Help is on the way!'
  });
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