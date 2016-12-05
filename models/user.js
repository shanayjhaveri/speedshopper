var mongoose = require('mongoose');

// Define our beer schema
var UserSchema   = new mongoose.Schema({
    name: { type:String, required:true },
    email: { type:String, required:true },
    password: { type:String, required:true }
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);