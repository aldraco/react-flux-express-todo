var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var TodoConstants = require('../constants/TodoAppConstants.js');
var http = require('http');
var request = require('request');

var baseUrl = 'http://localhost:3000';


var TodoStoreActions = {
  add_todo: function(new_todo) {
    // set up options
    var opts = {
      uri: '/api/todo',
      baseUrl: baseUrl,
      method: 'POST',
      json: true,
      body: new_todo,
      headers: {
        'Content-Type' : 'application/json'
      }
    };
    // make the API post request
    request.post(opts, function (err, response, body) {
        if (!err && response.statusCode == 201) {
          // upon success, fire the dispatcher to alert the stores
          // server sends back as json
          var todo = body;
          AppDispatcher.handleAction({
            actionType: TodoConstants.TODO_ADD,
            todo: todo
          });
        }
      }
    );
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

    http.get('/api/todo', function(res) {
      var todos = '';

      res.on('data', function(chunk) {
        todos += chunk;
      });

      res.on('end', function() {
        var t = JSON.parse(todos);
        console.log(t, typeof t);
        AppDispatcher.handleAction({
          actionType: TodoConstants.RECEIVE_TODO_DATA,
          todos: t
        });
      });

    });

  }
};

module.exports = TodoStoreActions;