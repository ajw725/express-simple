const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// paths for express config
const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// set up handlebars engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static directory
app.use(express.static(publicPath));

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Weather App',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Help is on the way!',
  });
});

app.get('/weather', (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({ error: 'You must provide an address' });
  }

  geocode(address, (err1, data) => {
    if (err1) {
      return res.send({ error: err1 });
    }

    const { lat, lng, location } = data;
    forecast(lat, lng, (err2, info) => {
      if (err2) {
        return res.send({ error: err2 });
      }

      res.send({ address, location, forecast: info });
    });
  });
});

app.get('/help/*', (req, res) => {
  res.status(404).render('404', {
    title: 'Help Article Not Found',
    message:
      'The article you are looking for could not be found. Please check the url.',
  });
});

app.get('*', (req, res) => {
  res.status(404).render('404', {
    title: 'Page Not Found',
    message:
      'The page you are looking for could not be found, or the address was mistyped.',
  });
});

// start up server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});
