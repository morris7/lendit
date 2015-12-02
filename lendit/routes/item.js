var express = require('express');
var router = express.Router();

//var Item = require('./models/item');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./public/index.html');
});

/*router.get('/lend', function(req, res, next) {
  res.render('index', { title: 'Express About' });
});*/


module.exports = router;
