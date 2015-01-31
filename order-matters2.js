var express = require('express');

var app = express();

app.use(function(req, res, next) {
  console.log('first');
  next();
});

app.use(function(req, res, next) {
  console.log('second');
  next();
});

app.use(function(req, res, next) {
  console.log('third');
  next();
});

// Route
app.get('/', function(req, res) {
  res.send("hello express");
});

app.listen(3000);
