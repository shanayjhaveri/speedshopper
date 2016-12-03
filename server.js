var express = require('express');
var mongoose = require('mongoose');
//var Llama = require('./models/llama');
var User = require('./models/user');
var Task = require('./models/task');
var bodyParser = require('body-parser');
var router = express.Router();


mongoose.connect('mongodb://sjhaver2:33.Shanay@ds159237.mlab.com:59237/cs_498_rk_mp4');

// Create our Express application
var app = express();

// Use environment defined port or 3000
var port = process.env.PORT || 3000;


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


app.use('/api', router);

var userRoute = router.route('/users/:id');
var usersRoute = router.route('/users');
var taskRoute = router.route('/tasks/:id');
var tasksRoute = router.route('/tasks');

userRoute.get(function (req, res) {
    User.findById(req.params.id, function(err, user){
        if(err)
            res.status(404).send({ message: 'Could not complete request', data: err });

        else if(!user)
            res.status(404).send({ message: 'Could not complete request', data: user });
        else
            res.status(200).json({ message: 'Completed Request', data: user });
    });
});


userRoute.put(function(req, res) {

    User.findById(req.params.id, function(err, user) {

        if (err)
            res.status(404).send({ message: 'Could not complete request', data: err });
        
        if(!req.body.pendingTasks)
            user.pendingTasks = [];
        else 
            user.pendingTasks = req.body.pendingTasks;

        user.save(function(err, user) {
            if (err)
                res.status(500).send({ message: 'Could not save user, invalid!', data: err });

            else
                res.status(200).json({ message: 'User updated!', data: user });
        });

    });
});


userRoute.delete(function(req, res) {
    User.findById(req.params.id, function(err, user){
        if(err)
            res.status(404).send({ message: 'Could not complete request', data: err });

        else if(!user)
            res.status(404).send({ message: 'Could not complete request', data: user });
        else{
            User.findByIdAndRemove(req.params.id, function(err) {
                if (err)
                    res.status(404).send({ message: 'Could not delete user', data: err });

                else
                    res.status(200).json({ message: 'Successfully deleted user', data:{} });
            });
        }
    });
});

usersRoute.get(function(req, res) {

    function checkNull(que){
        if (que) {
            return que;
        }
        else
            return "{}";
    }


    var query = req.query;
    var users = User
                    .find()
                    .where(JSON.parse(checkNull(query.where)))
                    .sort(JSON.parse(checkNull(query.sort)))
                    .select(JSON.parse(checkNull(query.select)))
                    .skip(JSON.parse(checkNull(query.skip)))
                    .limit(JSON.parse(checkNull(query.limit)));

    if(query.count){
        users
            .count(JSON.parse(query.count))
            .exec(function (err, users) {
                if (err)
                    res.status(404).send({ message: 'Could not complete request', data: err });

                else
                    res.status(200).json({ message: 'Completed Request', data: users });
            })
    }
    else {
        users.exec(function (err, users) {
                if (err)
                    res.status(404).send({ message: 'Could not complete request', data: err });

                else
                    res.status(200).json({ message: 'Completed Request', data: users });
            })
    }

});


usersRoute.post(function(req, res) {

    var user = new User();

    user.name = req.body.name;
    user.email = req.body.email;
    user.pendingTasks = [];
    user.dateCreated = Date.now();

    user.save(function(err) {
        if (err)
            res.status(500).send({ message: 'Could not create user, invalid!', data: err });

        else
            res.status(201).json({ message: 'User added to database!', data: user });
    });
});



taskRoute.get(function (req, res) {

    Task.findById(req.params.id, function(err, task){
        if(err)
            res.status(404).send({ message: 'Could not complete request', data: err });

        else
            res.status(200).json({ message: 'Completed Request', data: task });
    });
});


taskRoute.put(function(req, res) {

    Task.findById(req.params.id, function(err, task) {

        if (err)
            res.status(404).send({ message: 'Could not complete request', data: err });

        task.name= req.body.name;
        task.description= req.body.description || "";
        task.deadline= req.body.deadline;
        task.completed= req.body.completed  || false;
        task.assignedUser= req.body.assignedUser  || "";
        task.assignedUserName= req.body.assignedUserName  || "unassigned";


        task.save(function(err) {
            if (err)
                res.status(500).send({ message: 'Could not update task, invalid!', data: err });

            else
                res.status(200).json({ message: 'Task updated!', data: task });
        });

    });
});


taskRoute.delete(function(req, res) {
    Task.findByIdAndRemove(req.params.id, function(err) {
        if (err)
            res.status(404).send({ message: 'Could not complete request', data: err });

        else
            res.status(200).json({ message: 'Successfully deleted task', data:{} });
    });
});


tasksRoute.get(function(req, res) {
    function checkNull(que){
        if (que) {
            return que;
        }
        else
            return "{}";
    }


    var query = req.query;
    var tasks = Task
                    .find()
                    .where(JSON.parse(checkNull(query.where)))
                    .sort(JSON.parse(checkNull(query.sort)))
                    .select(JSON.parse(checkNull(query.select)))
                    .skip(JSON.parse(checkNull(query.skip)))
                    .limit(JSON.parse(checkNull(query.limit)));

    if(query.count){
        tasks
            .count(JSON.parse(query.count))
            .exec(function (err, tasks) {
                if (err)
                    res.status(404).send({ message: 'Could not complete request', data: err });

                else
                    res.status(200).json({ message: 'Completed Request', data: tasks });
            })
    }
    else {
        tasks.exec(function (err, tasks) {
            if (err)
                res.status(404).send({ message: 'Could not complete request', data: err });
            else
                res.status(200).json({ message: 'Completed Request', data: tasks });
        })
    }
});


tasksRoute.post(function(req, res) {

    var task = new Task();

    task.name= req.body.name;
    task.description= (req.body.description ? req.body.description : "");
    task.deadline= req.body.deadline;
    task.completed= (req.body.completed ? req.body.completed : false);
    task.assignedUser= (req.body.assignedUser ? req.body.assignedUser : "");
    task.assignedUserName= (req.body.assignedUserName ? req.body.assignedUserName : "unassigned");
    task.dateCreated= Date.now();


    task.save(function(err) {
        if (err)
            res.status(500).send({ message: 'Could not add task, invalid!', data: err });
        else
            res.status(201).json({ message: 'Task added!', data: task });
    });
});



// Start the server
app.listen(port);
console.log('Server running on port ' + port);