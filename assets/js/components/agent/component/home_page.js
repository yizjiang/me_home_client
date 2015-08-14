'use strict';
var React = require('react');

var HomePage = React.createClass({
  render: function () {
    console.log(this.props);
    return (
      <div>
        <h3>Home Page: {this.props.params.id}</h3>
      </div>
      );
  }
});

module.exports = HomePage;