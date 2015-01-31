var express = require('express');
var app = express();

app.use(function(req, res, next) {
  console.log('Hey nice middleware');
  next();
});

app.get('/', function(req, res) {
  res.send('Oh hai');
});

app.listen(3000);
