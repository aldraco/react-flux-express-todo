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
  toggle_complete: function(id, status) {

    var body = {
      'completed': !status
    };

    var opts = {
      uri: '/api/todo/' + id,
      baseUrl: baseUrl,
      method: 'PUT', 
      json: true,
      body: body,
      headers: {
        'Content-Type' : 'application/json'
      }
    };

    request(opts, function (err, response, body) {
      if (!err && response.statusCode === 200) {
        AppDispatcher.handleAction({
          actionType: TodoConstants.TODO_TOGGLE_COMPLETE,
          id: id
        });
      }
    });

    
  },

  delete_todo: function(id) {
    var opts = {
      uri: '/api/todo/' + id,
      baseUrl: baseUrl,
      method: 'DELETE',
      json: true,
      headers: {
        'Content-Type' : 'application/json'
      }
    };

    request.del(opts, function (err, response, body) {
      if (!err && response.statusCode === 204) {
        AppDispatcher.handleAction({
          actionType: TodoConstants.TODO_DELETE,
          id: id
        });
      }
    });
  },
  focus_todo: function(id) {
    // changes the focus ID

    AppDispatcher.handleAction({
      actionType: TodoConstants.TODO_FOCUS,
      focus: id
    });
  },
  fetch_focused: function(id) {
    // fetches the focused todo
    if (!id) {
      return;
    }
    http.get('/api/todo/'+id, function(res) {
      var todo = '';

      res.on('data', function(chunk) {
        todo += chunk;
      });
      res.on('end', function() {
        var t = JSON.parse(todo);
        AppDispatcher.handleAction({
          actionType: TodoConstants.RECEIVE_FOCUSED,
          focus: t
        });
      });
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
        AppDispatcher.handleAction({
          actionType: TodoConstants.RECEIVE_TODO_DATA,
          todos: t
        });
      });

    });

  }
};

module.exports = TodoStoreActions;