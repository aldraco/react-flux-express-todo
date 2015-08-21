var React = require('react'),
	Router = require('react-router');
var Header = require('./components/Header.react');
var PageNav = require('./components/PageNav.react');

var TodoApp = React.createClass({
  render: function() {
    return (
      <div className="container">
        <Header />
        <PageNav />
        <Router.RouteHandler/>
      </div>
    );
  }
});

// create the main routes from the routes folder
// these are the controller views
// map each controller to a key on the routes object

var routes = {
  List: require('../routes/List'),
  About: require('../routes/About')
};

// now set up the react router structure.

var routes = (
  <Router.Route name="app" path="/" handler={TodoApp}>  
    <Router.Route name="list" path="/" handler={routes.List}/>
    <Router.Route name="about" path="/about" handler={routes.About}/>
    <Router.DefaultRoute handler={routes.Home}/>
  </Router.Route>
);

Router.run(routes, Router.HistoryLocation, function (Handler) {
	React.render(<Handler/>, document.body);
});
