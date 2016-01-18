var React = require('react');

var StatusBar = React.createClass({

  changeViewType: function() {
    this.props.callback(event.target.value)
  },

  render: function() {
    return (
      <div className='statusbar_div'>
        <p className='Search_count'>我们为您搜索了{this.props.count}处理想的家</p>
        <div className='status_wrap'>
          <button type="button" className='' value='list' onClick={this.changeViewType}><span className='glyphicon glyphicon-th-list'></span></button>
          <button type="button" className='btn-active' value='map' onClick={this.changeViewType}><span className='glyphicon glyphicon-map-marker'></span></button>
        </div>
      </div>
    );
  }
});

module.exports = StatusBar
