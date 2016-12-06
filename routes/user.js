var secrets = require('../config/secrets');
var User = require('../models/user');
var mongoose = require('mongoose');

//mongo connection
mongoose.connect(secrets.mongo_connection);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

module.exports = function(router) {

  var userRoute = router.route('/users');
  
  // userRoute.get(function(req, res) {
  //   res.json([{ "username": "alice", "password": "alice" , "email" : "jane"}, { "username": "jane", "password": "jane" , "email" : "jane"}]);
  // });

  userRoute.get(function(req, res) {
	  User.findOne({"username": req.params.username, "password":req.params.password}, function(err,user)
	  	{
	  		if(err)
	  		{
	  			res.status(500).send({message:"Failed to complete request",data:err});
	  		}
	  		else if(!user)
	  		{
	  			res.status(404).send({message:"User not found",data:user});
	  		}
	  		else
	  		{
	  			res.status(200).json({message:"Request completed",data:user});
	  		}
	  	});
	});

  userRoute.post(function(req,res){
  	var newUser = new User();

  	newUser.username = req.body.username;
  	newUser.email = req.body.email;
  	newUser.password = req.body.password;
  	newUser.items = [];
    //add a dateCreated?
  	newUser.save(function(err)
  	{
  		if (err)
  		{
  			res.status(500).send({message:"Failed to create new user",data:err});
  		}
  		else
  		{
  			res.status(201).json({message:"Created new user",data:newUser});
  		}
  	});
  });


    userRoute.put(function(req,res){
  	User.findOne({"username": req.params.username}, function(err,user)
  	{
  		if (err)
  		{
  			res.status(500).send({message:"Failed to complete request",data:err});
  		}
  		if(req.body.items)
  		{

  			user.items = req.body.items;
  			user.save(function(err,user){
  				if (err)
  				{
  					res.status(500).send({message:"Failed to save list",data:err});
  				}
  				else
  				{
  					res.status(200).json({message:"Saved list",data:user});
  				}
  			});
  		}
  		else
  		{
  			user.items = [];
  			user.save(function(err,user){
  				if (err)
  				{
  					res.status(500).send({message:"Failed to save list",data:err});
  				}
  				else
  				{
  					res.status(200).json({message:"Saved list",data:user});
  				}
  			});
  		}
  	});
  });






  return router;
}

