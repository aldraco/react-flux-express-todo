var React = require('react'),
    TodoBox = require('../scripts/components/TodoBox.react'),
    ContentPane = require('../scripts/components/ContentPane.react'),
    TodoStore = require('../scripts/stores/TodoStore.js'),
    TodoStoreActions = require('../scripts/actions/todoActions.js');

var List = React.createClass({
  getInitialState: function() {
    // fetch state from the store
    var todos = TodoStore.getTodos();
    return {
      todos: todos
    };
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
    // call the API fetch here?
    TodoStoreActions.fetch_todos();
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var todos = this.state.todos;

    return (
      <div className='container'>
        <TodoBox todos={todos}/>
        <ContentPane />
      </div>
    );
  },

  _onChange: function() {
    this.setState({
      todos: TodoStore.getTodos()
    });
  }
});

module.exports = List;
