var React = require('react'),
    TodoList = require('../scripts/components/TodoList.react'),
    ContentPane = require('../scripts/components/ContentPane.react');

var List = React.createClass({
  render: function() {
    return (
      <div className='container'>
        <TodoList />
        <ContentPane />
      </div>
    );
  }
});

module.exports = List;
