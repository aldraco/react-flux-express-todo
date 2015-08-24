var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoAppConstants = require('../constants/TodoAppConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

// private variables
// initial data points
var _todos = [];

var _focus = null;


function load_todos(todos) {
  _todos = todos;
}

function setFocus(index) {
  _focus = index;
}

function add_new_Todo(todo) {
  _todos.push(todo);
}

function mark_complete(index) {
  _todos[index].completed = true;
}

// extend Todo store with Event Emitter!
var TodoStore = _.extend({}, EventEmitter.prototype, {

  // return the todos
  getTodos: function() {
    return _todos;
  },

  // return the focus item
  getFocus: function() {
    return _focus;
  },

  // emit changes
  emitChange: function() {
    this.emit('change');
  },

  // add change listener
  addChangeListener: function(cb) {
    this.on('change', cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener('change', cb);
  }
});

// now register the callbacks with the Dispatcher
// what do you want the Store to do with certain events?

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch(action.actionType) {
    case TodoAppConstants.RECEIVE_TODO_DATA:
      // when we receive data, we have fetched from the API
      // let's set it as the _todo variable
      load_todos(action.todos);
      break;

    case TodoAppConstants.TODO_FOCUS:
      // we need to change the focus todo
      setFocus(action.index);
      break;
    case TodoAppConstants.TODO_ADD:
      // a new TODO has been added
      // it's in the database as well
      // the payload is just the new todo
      add_new_Todo(action.todo);
      break;
    case TodoAppConstants.TODO_COMPLETE:
      mark_complete(index);
      break;
    default:
      return true;
  }

  // broadcast that there has been a change
  // this gets broadcasted to the view controller so it knows to respond
  TodoStore.emitChange();

  return true;

});

module.exports = TodoStore;