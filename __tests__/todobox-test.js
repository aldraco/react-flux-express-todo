// __tests__/todobox-test.js

jest.dontMock('../client/scripts/components/TodoBox.react');

describe('TodoBox', function() {
  it('should render ... something', function() {
    var todobox = require('../client/scripts/components/TodoBox.react');
    var React = require('react/addons');
    var TestUtils = React.addons.TestUtils;

    // render the todobox
    var todoBox = TestUtils.renderIntoDocument(
       <TodoBox todos={} />
    );

    // todos should be empty
    
  });
});