var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendfile('./public/index.html')
  //res.render('index', { title: 'Express' });
});

router.get('/about', function(req, res, next) {
  res.render('index', { title: 'Express About' });
});

module.exports = router;
