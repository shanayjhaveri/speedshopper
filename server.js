//Users(database and passport)
//Calls to walmart API


var secrets = require('./config/secrets');
var express = require('express');

var bodyParser = require('body-parser');
var router = express.Router();


// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

console.log('Server running on port ' + port);



//Allow CORS so that backend and frontend could be put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
  next();
}
app.use(allowCrossDomain);



// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(bodyParser.json());

// Use routes as a module (see index.js)
require('./routes')(app, router);



// Start the server
app.listen(port);
