var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var mongoose = require('mongoose');

var config = require('./config');
var User = require('./models/user');
var Todo = require('./models/todo');

var apiRoutes = require('./controllers/api');

var port = process.env.PORT || 3000;
mongoose.connect(config.database); // connect to database

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

app.get('/setup', function (req, res) {

  // create a sample user
  var newUser = new User({
    email: 'user@email.com',
    password: 'password',
  });
  newUser.save(function (err) {
    if (err) throw err;
    console.log('User saved successfully');

    var todos = [
      {userEmail: 'user@email.com', content: 'Buy Milk', done: false},
      {userEmail: 'user@email.com', content: 'Create a Todo\'s API', done: false},
    ];

    Todo.insertMany(todos).then(function() {
      res.json({
        success: true
      });
    })
  });
});

app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api');
});

app.use('/api', apiRoutes);

app.listen(port);
console.log('Magic happens at http://localhost:' + port);