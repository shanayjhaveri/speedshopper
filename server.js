//Users(database and passport)
//Calls to walmart API


var express = require('express');
var mongoose = require('mongoose');
//var Llama = require('./models/llama');
var User = require('./models/user');
var Task = require('./models/task');
var bodyParser = require('body-parser');
var router = express.Router();


// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

//mongo connection
mongoose.connect("mongodb://speed:shoppers@ds119588.mlab.com:19588/speedshopperusers");

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
console.log('Server running on port ' + port);