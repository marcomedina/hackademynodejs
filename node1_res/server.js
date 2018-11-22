var http = require('http');

http.createServer(function(req, res) {
  res.write('My HTTP Server :)');
  res.end();
}).listen(3000);