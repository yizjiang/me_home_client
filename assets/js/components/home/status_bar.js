var React = require('react');

var StatusBar = React.createClass({

  render: function() {
    return (
      <p>我们为您搜索了{this.props.count}处理想的家</p>
    );
  }
});

module.exports = StatusBar