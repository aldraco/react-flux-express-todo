var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TodoSchema = new Schema({
  title: String,
  description: String,
  completed: Boolean,
  categories: [String]
});

module.exports = mongoose.model('Todo', TodoSchema);