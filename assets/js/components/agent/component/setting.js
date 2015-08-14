'use strict';
var React = require('react');

var Setting = React.createClass({
  render: function () {
    return (
      <div>
        <h3>Settings: {this.props.params.id}</h3>
      </div>
      );
  }
});

module.exports = Setting;