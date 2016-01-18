var React = require('react');

var StatusBar = React.createClass({

  changeViewType: function() {
    this.props.callback(event.target.value);
  },

  render: function() {
    var listView = '', mapView = '';
    if(this.props.listView){
      listView = 'btn-active'
    } else {
      mapView = 'btn-active'
    }

    console.log(this.props);
    console.log(listView);
    console.log(mapView);
    return (
      <div className='statusbar_div'>
        <p className='Search_count'>我们为您搜索了{this.props.count}处理想的家</p>
        <div className='status_wrap'>
          <button type="button" className={listView} value='list' onClick={this.changeViewType}><span className='glyphicon glyphicon-th-list'></span></button>
          <button type="button" className={mapView} value='map' onClick={this.changeViewType}><span className='glyphicon glyphicon-map-marker'></span></button>
        </div>
      </div>
    );
  }
});

module.exports = StatusBar
