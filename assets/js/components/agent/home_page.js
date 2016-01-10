'use strict';
var React = require('react'),
  HomeList = require('../home/home_list'),
  HomeMap = require('../home/home_map.js');

var HomePage = React.createClass({
  showMode: function(mode) {
    var listView;
    if(mode == 'list'){
      listView = true;
    } else {
      listView = false;
    }
    this.setState({listView: listView})
  },


  getInitialState: function() {
    return {listView: true};
  },

  render: function () {
    var homesComp = null;
    var home_list = this.props.data.home_list;
    if(this.state.listView){
      homesComp = <HomeList callback={this.showMode} custom_style={'previewList'} count={home_list.length} list={home_list}/>
    } else {
      var home_infos = home_list.map((home) => {
        var points = home.geo_point.split(',');
      return {lat: points[0],long: points[1], home_id: home.id, description: home.short_desc, title: home.addr1}
    });
    homesComp = <HomeMap callback={this.showMode} count={home_list.length} home_infos={home_infos}/>
  }

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
          {homesComp}
        </div>
      </div>
      );
  }
});

module.exports = HomePage;