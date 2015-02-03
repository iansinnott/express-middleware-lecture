var express = require('express'),
    app     = express();


// Will get hit for /fun/thing as well as /fun/thing/stuff/boosh
app.use('/fun/:type', function(req, res, next) {
  console.log('hit fun/type middleware');
  next();
});

// Will get hit for /fun as well as /fun/something or /fun/something/else/etc
app.use('/fun', function(req, res, next) {
  console.log('hit fun middleware');
  next();
});

// Will only get hit for /fun
app.get('/fun', function(req, res) {
  console.log('hit /fun');
  res.send('hey there, you got to /fun');
});

app.get('/fun/:type', function(req, res) {
  console.log('GET /fun/:type');
  res.send('GET /fun/:type');
});

app.use(function(err, req, res, next) {
  console.log('Oh no, error happened', err);
});

app.listen(process.env.PORT || 3000, function() {
  console.log('Server listening...');
});

