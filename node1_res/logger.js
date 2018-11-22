var serverUrl = 'http://mylogs.io/api';

function log(message) {
  // http request
  console.log(message);
}

module.exports.log = log;
// module.exports.url = serverUrl;