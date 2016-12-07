var secrets = require('../config/secrets');
// var User = require('../models/user');
// var List = require('../models/list');
var mongoose = require('mongoose');


var models = require('../models/user');



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
  	
  		  		//console.log(req.body.user.username);
	  		//console.log(req.body.username);

	  models.User.findOne({"username": req.query.username, "password":req.query.password}, function(err,user)
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
	  			//console.log("success");

	  			res.status(200).json({message:"Request completed",data:user});
	  		}
	  	});
	});

  userRoute.post(function(req,res){
  	var newUser = new models.User();
	console.log(req.query.username);
  	newUser.username = req.query.username;
  	newUser.email = req.query.email;
  	newUser.password = req.query.password;
  	newUser.lists = [];
    //add a dateCreated?
  	newUser.save(function(err)
  	{
  		if (err)
  		{

  			res.status(500).send({message:"Failed to create new user",data:err});
  		}
  		else
  		{
  			console.log(req.query.username);
  			console.log("sucess");
  			res.status(201).json({message:"Created new user",data:newUser});
  		}
  	});
  });


    userRoute.put(function(req,res){
  	models.User.findOne({"username": req.body.user.data.username}, function(err,user)
  	{
      //console.log(req.body.list);
      //console.log(req.body.user.data.username);

  		if (err)
  		{
  			res.status(500).send({message:"Failed to complete request",data:err});
  		}
  		if(req.body.list.itemIDs.length>0)
  		{
        console.log(req.body.list);
        console.log("passed");
		  	var newList = new models.List();

		  	newList.itemIDs = req.body.list.itemIDs;
        newList.prices = req.body.list.prices;
        newList.imgs = req.body.list.imgs;
        newList.itemNames = req.body.list.itemNames
        newList.quantities = req.body.list.quantities
        newList.listName = req.body.list.listName;
        console.log(req.body.user.data);
		  	req.body.user.data.lists.push(newList);
  			user.save(function(err,user){
  				if (err)
  				{
  					res.status(500).send({message:"Failed to save list",data:err});
  				}
  				else
  				{
            console.log("");
  					res.status(200).json({message:"Saved list",data:user});
  				}
  			});
  		}
  		else
  		{
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

