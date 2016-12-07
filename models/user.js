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


var UserSchema   = new mongoose.Schema({
    username: { type:String, required:true },
    email: { type:String, required:true },
    password: { type:String, required:true },
    lists: [String]
});

var List = mongoose.model('List', ListSchema);
var User = mongoose.model('User', UserSchema);


module.exports = {
    List: List,
    User: User,
};

// Export the Mongoose model
// module.exports = mongoose.model('List', ListSchema);
// module.exports = mongoose.model('User', UserSchema);