var React = require('react'),
  Router = require('react-router');


var PageNav = React.createClass({
  render: function() {
    return (
      <div className="sub-navigation container">
        <ul className="actions-list">
          <li>
            <a href='#'>Delete Completed</a>
          </li>
          <li>
            <a href='#'>Mark All Complete</a>
          </li>
          <li>
            <a href='#'>Mark All Incomplete</a>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = PageNav;