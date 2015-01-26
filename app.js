var http    = require('http'),
    logger  = require('morgan'),
    express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.send('hello express');
});

// Catchall. If no routes handle the request and no errors have been generated
// then we land here, where we set the status to 404 and forward on to the
// primary error handler
app.use(function(req, res, next) {
  var err = new Error("Page not found!");
  err.status = 404;
  next(err); // Calling next with an argument will trigger error handlers
});

// Error handler. This middleware will get hit immediately if any other
// middleware call next with an argument.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("Oh no, there was an error...");
});

module.exports = app;

var server = http.createServer(app);

server.listen(3000);

server.on('listening', function() {
  console.log("Server listening on port " + server.address().port);
});
