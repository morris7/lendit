var Item = require('../models/item'),
    uuid = require('node-uuid'),
    multiparty = require('multiparty'),
    fs = require('fs'),
    path = require('path'),
    appRoute = path.resolve(__dirname);

module.exports = function(app) {

  /* GET home page. */
  app.get('/', function (req, res, next) {
    res.sendfile('./public/index.html');
  });

  app.get('/api/item/:id', function (req, res) {

    Item.find({_id: req.params.id},
        function (err, item) {

          // if there is an error retrieving, send the error. nothing after res.send(err) will execute
          if (err)
            res.send(err)

          res.json(item); // return all todos in JSON format
    });
  });

  // create lendit item and send back all items after creation
  app.post('/api/item', function (req, res) {

    // create a new item - information comes from AJAX request from Angular
    Item.create({
      name: req.body.name,
      price: req.body.price,
      path: req.body.path
    }, function (err, item) {
      //console.log(req.body)
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

  app.post('/upload/image',  function(req, res) {
    var form = new multiparty.Form();
    form.parse(req, function(err, fields, files) {
      var file = files.file[0];
      var contentType = file.headers['content-type'];
      var tmpPath = file.path;
      var extIndex = tmpPath.lastIndexOf('.');
      var extension = (extIndex < 0) ? '' : tmpPath.substr(extIndex);
      // uuid is for generating unique filenames.
      var fileName = uuid.v4() + extension;
      var destPath =  appRoute + '/../public_uploads/' + fileName;

      // Server side file type checker.
      if (contentType !== 'image/png' && contentType !== 'image/jpeg') {
        fs.unlink(tmpPath);
        return res.status(400).send('Unsupported file type.');
      }

      var is = fs.createReadStream(tmpPath);
      var os = fs.createWriteStream(destPath);

      if(is.pipe(os)) {
        fs.unlink(tmpPath, function (err) { //To unlink the file from temp path after copy
          if (err) {
            console.log(err);
          }
        });
        return res.json(destPath);
      }else
        return res.json('File not uploaded');
    });


  });

}
