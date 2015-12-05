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
        return res.render("register", {info: "Sorry. That username already exists. Try again."});
      }

      passport.authenticate('local')(req, res, function () {
        res.redirect('/success');
      });
    });
  });

  app.get('/login', function (req, res) {
    res.render('login.html', {user: req.user});
  });

  app.post('/login',
      passport.authenticate('local', { successRedirect: '/',
        failureRedirect: '/login' }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

  app.get('/ping', function (req, res) {
    res.status(200).send("pong!");
  });
};