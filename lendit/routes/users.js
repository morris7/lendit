var express = require('express');
var passport = require('passport');
var Account = require('../models/account');


module.exports = function(app) {

  app.get('/', function (req, res) {
    res.render('index', {user: req.user});
  });

  app.get('/register', function (req, res) {
    res.render('register', {});
  });

  app.post('/register', function (req, res) {
    Account.register(new Account({username: req.body.username}), req.body.password, function (err, account) {
      if (err) {
        return res.status(500).json({err: err});
      }

      passport.authenticate('local')(req, res, function () {
        return res.status(200).json({status: 'Registration successful!'});
      });
    });
  });

  app.get('/login', function (req, res) {
    res.render('login.html', {user: req.user});
  });

  app.post('/login', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return res.status(500).json({err: err});
      }
      if (!user) {
        return res.status(401).json({err: info});
      }
      req.logIn(user, function(err) {
        if (err) {
          return res.status(500).json({err: 'Could not log in user'});
        }
        res.status(200).json({status: 'Login successful!', username: user.username});
      });
    })(req, res, next);
  });

  app.get('/hello', function(req, res) {
    if(req.user) {
      res.status(200).json({username: req.user.username});
    }else{
      return res.status(500).json({err: err});
    }
  });


  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/ping', function (req, res) {
    res.status(200).send("pong!");
  });
};