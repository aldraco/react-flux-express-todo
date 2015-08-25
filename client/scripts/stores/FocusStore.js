var AppDispatcher = require('../dispatcher/AppDispatcher');
var TodoAppConstants = require('../constants/TodoAppConstants');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

// private vars
var _focused = {};


// private getter/setter functions

function setFocused(new_Focus) {
  _focused = new_Focus;
}

// TODO edit?

// Extend the store with the node Event Emitter

var FocusStore = _.extend({}, EventEmitter.prototype, {

  getFocused: function() {
    return _focused;
  },

  emitChange: function() {
    this.emit('change');
  },

  addChangeListener: function(cb) {
    this.on('change', cb);
  },

  removeChangeListener: function(cb) {
    this.removeListener('change', cb);
  }
});

// now register callbacks with the Dispatcher

AppDispatcher.register(function(payload) {
  var action = payload.action;

  switch (action.actionType) {
    case TodoAppConstants.RECEIVE_FOCUSED:
      // receiving data from API
      setFocused(action.focus);
      break;
    default:
    return true;
  }

  FocusStore.emitChange();

  return true;

});

module.exports = FocusStore;