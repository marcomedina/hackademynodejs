var jwt = require('jsonwebtoken');
var express = require('express');
var apiRoutes = express.Router();

var config = require('../config');
var User = require('../models/user');
var Todo = require('../models/todo');

apiRoutes.post('/authenticate', function (req, res) {

  // find the user
  User.findOne({
    email: req.body.email
  }, function (err, user) {

    if (err) throw err;

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.'
      });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.'
        });
      } else {

        // if user is found and password is right
        // create a token
        var payload = {
          email: user.email
        }
        var token = jwt.sign(payload, config.secret, {
          expiresIn: 86400 // expires in 24 hours
        });

        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});

apiRoutes.use(function (req, res, next) {

  // check header or url parameters or post parameters for token
  var token = req.body.token || req.params.token || req.headers['x-access-token'];

  // decode token
  if (token) {

    // verifies secret and checks exp
    jwt.verify(token, config.secret, function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.'
        });
      } else {
        // if everything is good, save to request for use in other routes
        req.user = decoded;
        next();
      }
    });

  } else {

    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });

  }

});

apiRoutes.get('/', function (req, res) {
  res.json({
    message: 'Welcome to the coolest API on earth!'
  });
});

apiRoutes.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users);
  });
});

apiRoutes.get('/todos', function (req, res) {
  Todo.find({userEmail: req.user.email, done: false}, function (err, todos) {
    res.json(todos);
  });
});

apiRoutes.get('/todos/:todoId', function (req, res) {
  Todo.findOne({_id: req.params.todoId, userEmail: req.user.email}, function (err, todo) {
    res.json(todo);
  });
});

apiRoutes.put('/todos/:todoId/done', function (req, res) {
  Todo.findOneAndUpdate({_id: req.params.todoId, userEmail: req.user.email}, {done: true}, function (err, todo) {
    res.json(todo);
  });
});

apiRoutes.post('/todos', function (req, res) {
  var newTodo = new Todo({
    userEmail: req.user.email,
    content: req.body.content,
    done: false
  });
  newTodo.save(function(err) {
    if (err) throw err;
    res.json(newTodo)
  });
});

apiRoutes.get('/check', function (req, res) {
  res.json(req.user);
});


module.exports = apiRoutes;