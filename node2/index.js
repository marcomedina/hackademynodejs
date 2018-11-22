// JSON es un objeto Global
var express = require('express')
var fs = require('fs')
var app = express()
var users = []

fs.readFile('users.json', {encoding: 'utf8'}, function (err, data) {
  if (err) throw err

  JSON.parse(data).forEach(function (user) {
    user.name.full = user.name.first + ' ' + user.name.last
    users.push(user)
  })
})

var logger = function(req, res, next) {
  console.log('Visitando:')
  console.log(req.route.path)
  next()
}

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', function(req, res) {
  res.render('index', {
    users: users,
    title: 'Pug in ExpressJS'
  })
})

app.get('/adios', function(req, res) {
  res.send('Adios Mundo')
})

app.get('/:username', function(req, res) {
  var username = req.params.username
  var currentUser = users.find(function(user) {
    if (user.username === username) {
      return user;
    }
  })
  res.render('user', {user: currentUser})
})


var server = app.listen(3000, function() {
  console.log('Server started on http://localhost:' + server.address().port)
})