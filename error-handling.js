var express = require('express');

var app = express();

// Route
app.get('/', function(req, res) {
  res.send("hello express");
});

app.use(function(req, res, next) {
  var err = new Error("Page not found!");
  err.status = 404;
  next(err); // Call `next` with an argument
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("Oh no, there was an error...");
});

app.listen(3000);
