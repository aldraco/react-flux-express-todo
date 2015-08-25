var _ = require('lodash');
var Todo = require('../models/todo.Model');

// Get all Todos
exports.index = function(req, res) {
  Todo.find({}, function(err, todos) {
    if (err) {
      return handleError(res, err);
    } else {
      return res.status(200).json(todos);
    }
  });
};

// Get one Todo

exports.show = function(req, res) {
  Todo.findById(req.params.todo_id, function(err, todo) {
    if (err) {
      return handleError(res, err);
    } else if (!todo) {
      return res.send(404);
    } else {
      return res.status(200).json(todo);
    }
  });
}


// Create a new Todo
exports.create = function(req, res) {
  Todo.create(req.body, function(err, todo) {
    if (err) {
      return handleError(res, err);
    } else {
      return res.status(201).json(todo);
    }
  });
}


// Update a Todo


// Delete Todo from Database
exports.destroy = function(req, res) {
  Todo.findById(req.params.todo_id, function(err, todo) {
    if (err) {
      return handleError(res, err);
    }
    if (!todo) {
      return res.send(404);
    } 
    todo.remove(function(err) {
      if (err) { 
        return handleError(res, err);
      }
      return res.send(204);
    });
  });
}


// TODO more creative error handling?

function handleError(res, err) {
  return res.send(500, err);
}