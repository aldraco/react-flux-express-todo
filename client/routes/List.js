var React = require('react'),
    TodoBox = require('../scripts/components/TodoBox.react'),
    ContentPane = require('../scripts/components/ContentPane.react'),
    TodoStore = require('../scripts/stores/TodoStore.js');

var List = React.createClass({
  getInitialState: function() {
    // fetch application state from the Store
    var todos = TodoStore.getTodos();
    return {
      todos: todos
    };
  },

  render: function() {
    var todos = this.state.todos;

    return (
      <div className='container'>
        <TodoBox todos={todos}/>
        <ContentPane />
      </div>
    );
  }
});

module.exports = List;
