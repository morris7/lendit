/**
 * Created by sam morris on 20/11/2015.
 */

// load mongoose since we need it to define a model
var mongoose = require('mongoose');

module.exports = mongoose.model('item', {
    name : String,
    price: Number,
    path: [String]
});