// Get an instance of the Dispatcher

var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

AppDispatcher.handleAction = function(action) {
  // dispatches the action with payload
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
}

AppDispatcher.handleAPIAction = function(action) {
  this.dispatch({
    source: 'API_ACTION', 
    action: action
  });
}

module.exports = AppDispatcher;