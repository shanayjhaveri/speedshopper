var secrets = require('../config/secrets');
var User = require('../models/user');

module.exports = function(router) {

  var userRoute = router.route('/users');
  
  userRoute.get(function(req, res) {
    res.json([{ "name": "alice", "height": 12 }, { "name": "jane", "height": 13 }]);
  });

  return router;
}

