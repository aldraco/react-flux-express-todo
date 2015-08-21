var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var TodoConstants = require('../constants/TodoAppConstants.js');
var http = require('http');


var TodoStoreActions = {
  add_todo: function(todo) {
    // ADD API call here
    
    AppDispatcher.handleAction({
      actionType: TodoConstants.TODO_ADD,
      todo: todo
    });
  },
  edit_todo: function(todo) {
    AppDispatcher.handleAction({
      actionType: TodoConstants.TODO_EDIT,
      todo: todo
    });
  },
  complete_todo: function(index) {
    
    // add API call here

    AppDispatcher.handleAction({
      actionType: TodoConstants.TODO_COMPLETE,
      index: index
    });
  },
  delete_todo: function(index) {
    AppDispatcher.handleAction({
      actionType: TodoConstants.TODO_DELETE,
      index: index
    });
  },
  focus_todo: function(index) {
    AppDispatcher.handleAction({
      actionType: TodoConstants.TODO_FOCUS,
      index: index
    });
  },
  fetch_todos: function() {
    // make the API call

    http.get('/api/todos', function(res) {
      console.log('res', res.data);

      AppDispatcher.handleAction({
        actionType: TodoConstants.RECEIVE_TODO_DATA,
        todos: data
      });
    });

  }
};