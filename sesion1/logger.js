var serverUrl = 'http://mylogger.io/api';

var log = function(message) {
  // Call to serverUrl
  console.log('[' + Date.now() + ']' + ' ' + message);
}

module.exports = log;
