var AppDispatcher = require('../dispatcher/AppDispatcher.js');
var TodoConstants = require('../constants/TodoAppConstants.js');
var http = require('http');
var request = require('request');

var baseUrl = 'http://localhost:3000';


var TodoStoreActions = {
  add_todo: function(new_todo) {
    // ADD API call here
    console.log("You want to add a new todo?", new_todo);
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

    request.post(opts, function (err, response, body) {
        console.log('request returned with: ', body);
        if (!err && response.statusCode == 201) {
          var todo = body;
          console.log("posted new todo and made the server round trip!");
          AppDispatcher.handleAction({
            actionType: TodoConstants.TODO_ADD,
            todo: todo
          });
        }
      }
    );

    // make a request
    /*var opts = {
      hostname: 'localhost',
      port: 3000,
      path: '/api/todo',
      method: 'POST',
      json: true,
      headers: {
        'Content-Type' : 'application/json'
      }
    };

    var _data = '';

    var req = http.request(opts, function(res) {
      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        _data += chunk;
      });

      res.on('end', function() {
        // process the response
        console.log('response received: ', _data);

      });
    });

    req.on('error', function(e) {
      console.error("There was a problem with your request:", e.message);
    });

    // make the request
    // new_todo is already JSON
    req.write(new_todo);
    req.end();*/


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

module.exports = TodoStoreActions;