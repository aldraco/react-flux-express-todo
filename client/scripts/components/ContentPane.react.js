var React = require('react');


// receives focus todo ID from props
// can fetch detailed information via that ID

var ContentPane = React.createClass({

  render: function() {
    var focus = this.props.focus || {
      'title' : 'Welcome',
      'description' : 'Select a todo item on the left to view details.'
    };
    return (
      <div className="" id='content-pane'>
        <h2>
          {focus.title}
        </h2>
        <h5>{focus.description}</h5>
        <p>
          Todo Notes and other items
        </p>
      </div>

    )
  }
});

module.exports = ContentPane;