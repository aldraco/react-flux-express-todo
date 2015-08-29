var React = require('react');


// receives focus todo ID from props
// can fetch detailed information via that ID

var ContentPane = React.createClass({

  render: function() {
    
    if (this.props.focus !== null) {
      var focus = this.props.focus;
    } else {
      var focus = {
        'title' : 'Welcome',
        'description' : 'Select a todo item on the left to view details.'
      };
    }


    return (
      <div className="" id='content-pane'>
        <h2>
          {focus.title}
        </h2>
        <h5>{focus.description}</h5>
      </div>

    )
  }
});

module.exports = ContentPane;