# Express Middleware

So good.

--- 

# What we'll try to cover

* What is middleware?
* The relationship between Express and middleware
* Important points about middleware
* Routes are also middleware
* Handling errors
* Wrap Up

--- 

# Simplify All The Things

---

### Standard Express App

```js
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

module.exports = app;
```

---

## A Simpler Approach

```js
var express = require('express'),
var app     = express();

app.get('/', function(req, res) {
  res.send("hello express");
});

app.listen(3000);
```

---

# Middleware

---

![Req res cycle](http://dropsinn.s3.amazonaws.com/req-res-cycle.jpg)

---

### Middleware

```js
// Define your middleware
function uselessMiddleware(req, res, next) {
  // Do some stuff...
  next();
}

// "Use" your middlware
app.use(uselessMiddleware);
```

---

Now let's make our middleware do something.

```js
app.use(function(req, res, next) {
  console.log('hey nice middleware');
  next();
});
```

---

# Express and middleware

---

> "An Express application is essentially a series of middleware calls."

-- The docs

Let's look at a standard Express route:

```js
app.get('/hello', function(req, res) {
  res.send('Hello route');
});
```

---

# What if we want all routes?

* Logging
* User authentication
* Custom request parsing
* etc...

---

**Middleware will run on all routes by default**

* `app.use(someFunc)`: Call `someFunc` for every request, regardless of path/method

**But can also be specific to a route**

* `app.use('/hello', someFunc)`: Call `someFunc` for every request at the path `/hello`

---

# Hands-on example

---

## Building a simple logger

**The Goal:** Log request information of the form of:

```
[METHOD] [ROUTE] [DATE]
```

Example output:

```
GET / Sun Jan 25 2015 22:27:07 GMT-0800 (PST)
GET /some-route Sun Jan 25 2015 22:27:07 GMT-0800 (PST)
POST /contact Sun Jan 25 2015 22:27:07 GMT-0800 (PST)
```

---

## Using express middleware, we can accomplish this pretty easily:

```js
app.use(function(req, res, next) {
  var date = new Date();
  console.log(req.method + ' ' + req.url + ' ' + date);
  next();
});
```

---

# Important points

---

# Always call `next`

Logger example without calling `next`:

```js
var express = require('express');
var app = express();

app.use(function(req, res, next) {
  var date = new Date();
  console.log(req.method + ' ' + req.url + ' ' + date);
  // WE DIDN'T CALL `next` HERE!!
});

app.get('/', function(req, res) {
  res.send("hello express");
});

app.listen(3000);
```

---

# Order Matters

> “Middleware functions are executed **_sequentially_**, therefore the order of middleware inclusion is important.”

-- The Docs

---

# Order Matters

```js
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
```

---

# Order Matters

```js
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
```

---

# Localize to specific routes

Protect admin pages from anonymous users

```js
app.use('/admin', function(req, res, next) {
  if (!req.user)
    res.redirect('/login');
  else
    next();
});
```

---

# Routes === Middleware

```js
app.get('/', function(req, res) {
  res.send('hello express');
});
```

```js
app.use('/', function(req, res, next) {
  if (req.method === 'GET')
    res.send('hello express');
  else
    next();
});
```

---

# Reiterate

> “An Express application is essentially a series of middleware calls.”

-- The Docs

---

# Handling Errors

---

# Keep the “Stack of middleware” concept in mind

```js
// The rest of the app...

app.use(function(req, res, next) {
  res.status(404).send("Oh no, there was an error...");
});

app.listen(3000);
```

---

# Other Errors

Special error-handling middleware.

```js
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("Oh no, there was an error...");
});
```

---

# A better solution

```js
app.use(function(req, res, next) {
  var err = new Error("Page not found!");
  err.status = 404;
  next(err); // Call `next` with an argument
});

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.send("Oh no, there was an error...");
});
```

---

# Conclusion

---

# Conclusion

Never forget:

An Express application is essentially a series of middleware calls!!

An Express “app” is just a stack of middleware.

---

# Commonly Used Middleware

* **[Body Parser](https://github.com/expressjs/body-parser)** (Parse those bodies)
* **[Serve Static](https://github.com/expressjs/body-parser)** (Statically serve stuff)

    ```js
    app.use(express.static(__dirname + '/public')));
    ```
* **[Morgan](https://github.com/expressjs/morgan)** (Logging)

---

# Conclusion

This is on GitHub, with _much_ more in-depth explanations:

http://git.io/F9Kb

More questions: **ian@iansinnott.com**

---

# Learn you some emoji!

:sunglasses: :dolphin: :beers: :blush: :smile_cat: :sparkles:

http://www.emoji-cheat-sheet.com/

