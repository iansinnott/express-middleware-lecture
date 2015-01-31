var express = require('express');

var app = express();

// Route
app.get('/', function(req, res) {
  res.send("hello express");
});

app.use(function(req, res, next) {
  res.status(404).send("Oh no, there was an error...");
});

app.listen(3000);
