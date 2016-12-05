var secrets = require('../config/secrets');
var User = require('../models/user');
var mongoose = require('mongoose');

//mongo connection
mongoose.connect(secrets.mongo_connection);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = function(router) {

  var userRoute = router.route('/users');
  
  userRoute.get(function(req, res) {
    res.json([{ "name": "alice", "password": "alice" , "email" : "jane"}, { "name": "jane", "password": "jane" , "email" : "jane"}]);
  });

  return router;
}

