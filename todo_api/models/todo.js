var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Todo', new Schema({
  userEmail: String,
  content: String,
  done: Boolean
}));