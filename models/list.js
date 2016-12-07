var mongoose = require('mongoose');

// Define our user and list schema

var ListSchema = new mongoose.Schema({
    listName: {type: String, required:true},
    itemIDs: [Number],
    prices: [Number],
    imgs: [String],
    itemNames: [String],
    quantities: [String]
});


module.exports = mongoose.model('List', ListSchema);
