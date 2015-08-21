var React = require('react'),
  Router = require('react-router');


var Header = React.createClass({
  render: function() {
    return (
      <div className="page-header">
        <h1>MuchToDo</h1>
      </div>
    );
  }
});

module.exports = Header;