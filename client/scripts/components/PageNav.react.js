var React = require('react'),
  Router = require('react-router');


var PageNav = React.createClass({
  render: function() {
    return (
      <div className="nav">
        <Router.Link to="list">List</Router.Link>
        &nbsp; | &nbsp;
        <Router.Link to="about">About</Router.Link>
      </div>
    );
  }
});

module.exports = PageNav;