var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var mongoose = require('mongoose');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var database = require('./config/database');

var routes = require('./routes/item');
var users = require('./routes/users');

var Item = require('./models/item');

var app = express();

//connect to mongodb
mongoose.connect(database.url);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/partials/:filename', function(req, res){
  var filename = req.params.filename;
  if(!filename) return;  // might want to change this
  res.render("partials/" + filename );
});

// create lendit item and send back all items after creation
app.post('/api/item', function (req, res) {

  // create a new item - information comes from AJAX request from Angular
  Item.create({
    name: req.body.name,
    price: req.body.price
  }, function (err, todo) {
    if (err)
      res.send(err);
    // get and return all the items after you create another
    Item.find(function (err, todos) {
      if (err)
        res.send(err)
      res.json(todos);
    });
  });

});

app.get('/api/item', function (req, res) {

  // use mongoose to get all items in the database
  Item.find(function (err, items) {

    // if there is an error retrieving, send the error. nothing after res.send(err) will execute
    if (err)
      res.send(err)

    res.json(items); // return all items in JSON format
  });
});

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
