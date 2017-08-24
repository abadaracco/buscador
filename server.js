const express = require('express');
const react = require('react');
const path = require('path');

const app = express();
const result = {
  name: 'hello world'
};

// Serve static assets
app.use(express.static(__dirname + '/public'));

// Always return the main index.html, so react-router render the route in the client
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/results', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.get('/details', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

app.listen(3000, function () {
  console.log('Server on port 3000');
});

require('./api/search')(app);
