var mongoose = require('mongoose');

// Define our user and list schema

var ListSchema = new mongoose.Schema({
    listName: {type: String, required:true},
    itemIDs: [Number]
});


var UserSchema   = new mongoose.Schema({
    username: { type:String, required:true },
    email: { type:String, required:true },
    password: { type:String, required:true },
    lists: [ListSchema]
});


// Export the Mongoose model
module.exports = mongoose.model('List', ListSchema);
module.exports = mongoose.model('User', UserSchema);
