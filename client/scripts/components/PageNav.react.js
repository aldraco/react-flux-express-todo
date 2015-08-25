var React = require('react'),
  Router = require('react-router');


var PageNav = React.createClass({
  render: function() {
    return (
      <div className="sub-navigation container">
        <ul className="actions-list">
          <li>
            <a href='#'>Action One</a>
          </li>
          <li>
            <a href='#'>Action Two</a>
          </li>
          <li>
            <a href='#'>Action Three</a>
          </li>
        </ul>
      </div>
    );
  }
});

module.exports = PageNav;