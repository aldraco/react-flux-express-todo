var React = require('react');
var TodoStoreActions = require('../actions/todoActions.js');
var TodoStore = require('../stores/TodoStore.js');

var AddTodoForm = React.createClass({
  handleSubmit: function(e) {
    // prevent default event action
    e.preventDefault();
    var title = React.findDOMNode(this.refs.todo_title).value.trim();
    // pass the data off to the parent component
    this.props.onTodoSubmit({title: title});
    // reset the view
    React.findDOMNode(this.refs.todo_title).value = '';

  },

  render: function() {
    return (
      <form id="new_todo_form" onSubmit={this.handleSubmit}>
        <div className="input-group">
          <input type="text" name="todo_title" ref="todo_title"/>
          <label>Title</label>
        </div>
        <button>Submit</button>
      </form>
    )

  }
});

var Todo = React.createClass({
  render: function() {
    var title = this.props.title;
    return (
      <li className='todo-list-item'>{title}</li>
    )
  }
});

var TodoList = React.createClass({
  render: function() {
    var todos = this.props.todos.map(function(todo) {
      return <Todo title={todo.title} />
    });

    return (
      // list TODOs
      <div>
        <h1>Todo List</h1>
        <ul>
          {todos}
        </ul>
      </div>
    )
  }
});

var TodoBox = React.createClass({
  handleTodoSubmit: function(new_todo) {
    // make the database call, via actions
    TodoStoreActions.add_todo(new_todo);
    // dispatcher should update the store for us
    // updating the store should update the view
    // via the _onChange method
  },

  render: function() {
    return (
      <div>
        <AddTodoForm onTodoSubmit={this.handleTodoSubmit}/>
        <TodoList todos={this.props.todos} />

      </div>
    )
  }
});

module.exports = TodoBox;