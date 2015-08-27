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
    var isVisible = this.props.formVisible;

    return (
      <div className='text-center'>
        <div onClick={this.props.toggleFormVisible} id='expand-todo-form'>
          <span className='title'>+ Add New</span>
        </div>
        <div className={isVisible ? 'add-todo-form' : 'collapse'}>
          <form id="new_todo_form" onSubmit={this.handleSubmit} className='form-inline'>
            <div className='form-group'>
              <div className="input-group">
                <input type="text" className='form-control' name="todo_title" ref="todo_title"/>
              </div>
            </div>
            <button type='submit' className='btn btn-primary'>Submit</button>
          </form>
        </div>
      </div>
    )

  }
});

var Todo = React.createClass({
  handleClick: function() {
    // Clicking a Todo item results in changing the focus Todo
    TodoStoreActions.fetch_focused(this.props.data._id);
  },

  handleDelete: function() {
    console.log("getting called");
    TodoStoreActions.delete_todo(this.props.data._id);
  },

  render: function() {
    var todo = this.props.data;
    
    return (
      <li onClick={this.handleClick}>
        <div className='todo-list-item container'>
          <div className='row'>
            <div className='col-xs-10'>
              <div className='row'>
                <div className='col-xs-12'>
                  <span className='title'>
                    {todo.title}
                  </span>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-12'>
                  <p>
                    Snippet text.
                  </p>
                </div>
              </div>
              <div className='row'>
                <div className='col-xs-12'>
                  
                </div>
              </div>
            </div>
            <div className='col-xs-2'>
              <div className=''>
                <button className='btn btn-primary'>
                  X
                 </button>
              </div>
              <div>
                 <button className='btn btn-danger' onClick={this.handleDelete}>
                  X
                 </button>
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
    console.log("passed thru todo box", new_todo);
    TodoStoreActions.add_todo(new_todo);
    // dispatcher should update the store for us
    // updating the store should update the view
    // via the _onChange method
  },

  render: function() {
    var todos = this.props.todos;

    return (
      <div>
        <AddTodoForm onTodoSubmit={this.handleTodoSubmit} formVisible={this.props.formVisible} toggleFormVisible={this.props.toggleFormVisible} />
        <TodoList todos={todos} />

      </div>
    )
  }
});

module.exports = TodoBox;