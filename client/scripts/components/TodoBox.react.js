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
      <div>
        <div>
          <button>
            Add New
          </button>
        </div>
        <form id="new_todo_form" onSubmit={this.handleSubmit} className='collapse'>
          <div className="input-group">
            <input type="text" name="todo_title" ref="todo_title"/>
            <label>Title</label>
          </div>
          <button>Submit</button>
        </form>
      </div>
    )

  }
});

var Todo = React.createClass({
  handleClick: function() {
    // Clicking a Todo item results in changing the focus Todo
    TodoStoreActions.fetch_focused(this.props.data._id);
    console.log('clicked', this.props.data);
  },

  render: function() {
    var todo = this.props.data;
    
    return (
      <li onClick={this.handleClick}>
        <div className='todo-list-item container row'>
          <div className='col-xs-10'>
            <div className='row'>
              <span className='title'>
                {todo.title}
              </span>
            </div>
            <div className='row'>
              <p><strong>Snippet text...</strong></p>
            </div>         
            <div className='row'>
              <span className='label label-important'>badges</span>
            </div>
          </div>
          <div className='col-xs-2'>
            <div className='row'>
              <div className="checkbox pull-right">
                <label>
                  <input type="checkbox" />
                </label>
              </div>
            </div>
          </div>
          

        </div>
      </li>
    )
  }
});

var TodoList = React.createClass({
  render: function() {
    var todos = this.props.todos;
    console.log(this.props, todos, typeof todos);
    todos = todos.map(function(todo) {
      return <Todo key={todo._id} data={todo} />
    });

    return (
      // list TODOs
        <ul className="todo-list">
          {todos}
        </ul>
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
    var todos = this.props.todos;

    return (
      <div>
        <AddTodoForm onTodoSubmit={this.handleTodoSubmit} />
        <TodoList todos={todos} />

      </div>
    )
  }
});

module.exports = TodoBox;