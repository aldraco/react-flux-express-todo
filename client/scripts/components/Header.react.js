var React = require('react'),
  Router = require('react-router');


var Header = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top navbar-inverse">
        <div className="container-fluid">
          <div className="navbar-header">
            <a className="navbar-brand" href='#'>
              <img alt="brand" src="http://lorempixel.com/30/30" />
            </a>
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#mobile-menu" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="mobile-menu">
            <form className="navbar-form navbar-right" role="search">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Router.Link to="list">List</Router.Link>
              </li>
              <li>
                <Router.Link to="about">About</Router.Link>
              </li>
            </ul>
          </div>
          
        </div>
      </nav>
    );
  }
});

module.exports = Header;