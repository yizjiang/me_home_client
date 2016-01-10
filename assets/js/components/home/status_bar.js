var React = require('react');

var StatusBar = React.createClass({

  changeViewType: function() {
    this.props.callback(event.target.value)
  },

  render: function() {
    return (
      <div>
        <p className='Search_count'>我们为您搜索了{this.props.count}处理想的家</p>
        <button type="button" value='list' onClick={this.changeViewType}>列表模式</button>
        <button type="button" value='map' onClick={this.changeViewType}>地图模式</button>
      </div>
    );
  }
});

module.exports = StatusBar
