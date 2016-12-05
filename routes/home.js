var secrets = require('../config/secrets');

module.exports = function(router) {

  var homeRoute = router.route('/');
  router.route('/').options(function(req, res) {
        res.send("GET,POST,OPTIONS,PUT,DELETE");  
        res.status(200);   
        res.end();

  })

  homeRoute.get(function(req, res) {

    connectionString = secrets.token;

    res.json({ message: 'My connection string is ' + connectionString });

  });


  return router;
}

