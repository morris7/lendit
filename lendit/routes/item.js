var Item = require('../models/item');


module.exports = function(app) {

  /* GET home page. */
  app.get('/', function (req, res, next) {
    res.sendfile('./public/index.html');
  });

  // create lendit item and send back all items after creation
  app.post('/api/item', function (req, res) {

    // create a new item - information comes from AJAX request from Angular
    Item.create({
      name: req.body.name,
      price: req.body.price
    }, function (err, item) {
      if (err)
        res.send(err);
      // get and return all the items after you create another
      Item.find(function (err, items) {
        if (err)
          res.send(err)
        res.json(items);
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

}
