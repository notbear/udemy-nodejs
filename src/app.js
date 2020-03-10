const express = require('express');
const { geocode } = require('./geocode');
const { forecast } = require('./forecast');
const path = require('path');
const hbs = require('hbs');

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialssPath = path.join(__dirname, '../templates/partials');
console.log('publicPath', publicPath);

const app = express();
app.set('view engine', 'hbs');
app.set('views', viewsPath);
app.use(express.static(publicPath));

hbs.registerPartials(partialssPath);

app.get('', (req, res) => {
  res.render('index', { title: 'weather app', name: 'Harry' });
});

app.get('/help', (req, res) => {
  res.send({
    title: 'aaa',
    body: 'body body',
  });
});

app.get('/about', (req, res) => {
  res.send('about');
});

app.get('/weather', (req, res) => {
  // const yargs = require('yargs');
  const locationString = req.query.address;

  if (!req.query.address) {
    console.log('No location provided');
    res.status(500).send('No location provided');
    return 0;
  }
  geocode(locationString, (error, data) => {
    if (error) {
      console.log(error);
      res.status(500).send(error);
      return;
    }

    forecast(data.lat, data.long, (error, forecastData) => {
      if (error) {
        console.log(error);
        res.status(500).send(error);
        return;
      }
      res.send({
        location: data.location,
        forecast: forecastData,
        addres: req.query.address,
      });
    });
  });
});

app.get('*', (req, res) => {
  res.status(404).render('404', {
    title: '404',
    errorMessage: 'Page not found',
  });
});

app.listen('3000', () => {
  console.log('Server is up on port 3000');
});
