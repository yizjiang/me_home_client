'use strict';
var React = require('react'),
  HomeList = require('../home/home_list');

var HomePage = React.createClass({
  render: function () {
    return (
      <div>
        <div className='agent_home_div'>
          <img src={this.props.data.head_image}></img>
          <p>姓名: {this.props.data.header.name}</p>
          <p>联系电话: {this.props.data.header.contact}</p>
          <img src={this.props.data.qr_image}></img>
        </div>
        <div className='preview_list_div'>
          <h3 className='previewH3'>优质房源</h3>
          <HomeList custom_style={'previewList'} count={this.props.data.home_list.length} list={this.props.data.home_list}/>
        </div>
      </div>
      );
  }
});

module.exports = HomePage;