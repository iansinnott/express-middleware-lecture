var http    = require('http'),
    logger  = require('morgan'),
    express = require('express');

var app = express();

// app.use(function(req, res, next) {
//   var date = new Date();
//   console.log(req.method + ' ' + req.url + ' ' + date);
//   next();
// });
//
app.use('/admin', function(req, res, next) {
  if (!req.user) console.log('HEY! No user present');
  next();
});

app.get('/', function(req, res) {
  res.send('hello express');
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handlers
// if (app.get('env') === 'development') {
//   app.use(function(err, req, res, next) {
//     res.status(err.status || 500);
//     res.render('error', {
//       message: err.message,
//       error: err
//     });
//   });
// }
//
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });

// Catchall. If no routes handle the request and no errors have been generated
// then we land here, where we set the status to 404 and forward on to the
// primary error handler

app.use(function(req, res, next) {
  var err = new Error("Page not found!");
  err.status = 404;
  next(err); // Calling next with an argument will trigger error handlers
});

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
