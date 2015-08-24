var _ = require('lodash');
var Todo = require('../models/todo.Model');

// Get all Todos
exports.index = function(req, res) {
  Todo.find({}, function(err, todos) {
    if (err) {
      return handleError(res, err);
    } else {
      return res.json(200, todos);
    }
  });
};

// Get one Todo

exports.show = function(req, res) {
  Todo.find(req.params.id, function(err, todo) {
    if (err) {
      return handleError(res, err);
    } else if (!todo) {
      return res.send(404);
    } else {
      return res.json(todo);
    }
  });
}


// Create a new Todo
exports.create = function(req, res) {
  console.log('new todo', req.body);
  Todo.create(req.body, function(err, todo) {
    if (err) {
      return handleError(res, err);
    } else {
      console.log("new todo created successfully", todo);
      return res.status(201).json(todo);
    }
  });
}


// Update a Todo


// Delete Todo from Database



// TODO more creative error handling?

function handleError(res, err) {
  return res.send(500, err);
}