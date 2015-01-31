var express = require('express');

var app = express();

// Route
app.get('/', function(req, res) {
  res.send("hello express");
});

// Logging middleware added after route
app.use(function(req, res, next) {
  var date = new Date();
  console.log(req.method + ' ' + req.url + ' ' + date);
  next();
});

app.listen(3000);
