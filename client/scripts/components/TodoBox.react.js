var React = require('react');
var TodoStoreActions = require('../actions/todoActions.js');
var TodoStore = require('../stores/TodoStore.js');
var ReactCSSTransitionGroup = require('react/lib/ReactCSSTransitionGroup');

var AddTodoForm = React.createClass({
  getInitialState: function() {
    return {
      form_title: 'Title'
    };
  },

  handleChange: function(e) {
    var form_title = this.state.form_title;
    form_title = e.target.value;
    this.setState({
      form_title: form_title
    });
  },

  handleSubmit: function(e) {
    // prevent default event action
    e.preventDefault();
    var title = this.state.form_title;
    // pass the data off to the parent component
    this.props.onTodoSubmit({title: title});
    // reset the view

    this.setState({
      form_title: 'Title'
    });

  },

  render: function() {
    var isVisible = this.props.formVisible;
    var form_title = this.state.form_title;

    return (
      <div className='text-center'>
        <div onClick={this.props.toggleFormVisible} id='expand-todo-form'>
          <span className='title'>+ Add New</span>
        </div>
        <div className={isVisible ? 'add-todo-form' : 'collapse'}>
          <form id="new_todo_form" onSubmit={this.handleSubmit} className='form-inline'>
            <div className='form-group'>
              <div className="input-group">
                <input type="text" className='form-control' value={form_title} name="todo_title" onChange={this.handleChange}   />
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
    TodoStoreActions.delete_todo(this.props.data._id);
  },

  handleToggleComplete: function() {
    // bubble it up to the list
    this.props.onTodoToggleComplete(this.props.data._id, this.props.data.completed);
  },

  render: function() {
    var todo = this.props.data;
    var extraClass = this.props.focused ? ' focused' : '';
    var classes = 'todo-list-item container' + extraClass;
    var isCompleted = this.props.data.completed ? 'todo-complete-status completed' : 'todo-complete-status';
    
    return (
      <li onClick={this.handleClick}>
        <div className={classes}>
          <div className='row'>
            <div className='col-xs-10 col-sm-8 col-md-9'>
              <div className='row todo-title-row'>
                <div className='col-xs-12'>
                  <span className='title'>
                    {todo.title}
                  </span>
                </div>
              </div>
              <div className='row todo-snippet-row'>
                <div className='col-xs-12'>
                  <p>
                    
                  </p>
                </div>
              </div>
              <div className='row todo-badges-row'>
                <div className='col-xs-12'>
                  
                </div>
              </div>
            </div>
            <div className='col-xs-2 col-sm-4 col-md-3'>
              <div className='button-bar'>
                <div className={isCompleted} onClick={this.handleToggleComplete} ></div>
              </div>
              <div className='button-bar'>
                 <button className='btn btn-delete-todo' onClick={this.handleDelete}>
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
    var focused = this.props.focused;
    var onTodoToggleComplete = this.props.onTodoToggleComplete;

    todos = todos.map(function(todo) {
      var isFocused = (todo._id === focused._id);
      
      return <Todo key={todo._id} data={todo} focused={isFocused} onTodoToggleComplete={onTodoToggleComplete} />
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

  handleTodoToggleComplete: function(id, status) {
    TodoStoreActions.toggle_complete(id, status);
  },

  render: function() {
    var todos = this.props.todos;

    return (
      <div id='todo-list'>
        <AddTodoForm onTodoSubmit={this.handleTodoSubmit} formVisible={this.props.formVisible} toggleFormVisible={this.props.toggleFormVisible} />
        <TodoList todos={todos} focused={this.props.focused} onTodoToggleComplete={this.handleTodoToggleComplete} />

      </div>
    )
  }
});

module.exports = TodoBox;