var React = require('react'),
    TodoBox = require('../scripts/components/TodoBox.react'),
    ContentPane = require('../scripts/components/ContentPane.react'),
    TodoStore = require('../scripts/stores/TodoStore.js'),
    FocusStore = require('../scripts/stores/FocusStore.js'),
    TodoStoreActions = require('../scripts/actions/todoActions.js');

var List = React.createClass({
  getInitialState: function() {
    // fetch state from the store
    var todos = TodoStore.getTodos();
    var focused = FocusStore.getFocused();


    return {
      todos: todos,
      focused: focused,
      formVisible: true
    };
  },

  toggleFormVisible: function() {
    console.log('clicking');
    var toggleVisible = !this.state.formVisible;
    this.setState({
      formVisible: toggleVisible
    });
  },

  componentDidMount: function() {
    TodoStore.addChangeListener(this._onChange);
    // listens for changes on the Focus Item
    FocusStore.addChangeListener(this._onChange);
    // call the API fetch here?
    TodoStoreActions.fetch_todos();
    // get the focus todo information (more than what's in the list)
    TodoStoreActions.focus_todo(this.props.params.id);
    // get the focused todo
    TodoStoreActions.fetch_focused(this.props.params.id);
  },

  componentWillUnmount: function() {
    TodoStore.removeChangeListener(this._onChange);
    FocusStore.removeChangeListener(this._onChange);
  },

  render: function() {

    return (
      <div className='container row'>
        <div className='col-xs-12 col-sm-4 clean-row'>
          <TodoBox todos={this.state.todos} focused={this.state.focused} formVisible={this.state.formVisible} toggleFormVisible={this.toggleFormVisible}/>
        </div>
        <div className='col-xs-12 col-sm-7 col-sm-offset-1'>
          <ContentPane focus={this.state.focused}/>
        </div>
        
      </div>
    );
  },

  _onChange: function() {
    var todos = TodoStore.getTodos();
    var focused = FocusStore.getFocused();

    this.setState({
      todos: todos,
      focused: focused
    });
  }
});

module.exports = List;
