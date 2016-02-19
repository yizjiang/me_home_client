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
      homesComp = <HomeList listView={true} callback={this.showMode} custom_style={'previewList'} count={home_list.length} list={home_list}/>
    } else {
      var home_infos = home_list.map((home) => {
        var points = home.geo_point.split(',');
      return {lat: points[0],long: points[1], home_id: home.id, description: home.short_desc, title: home.addr1}
    });
    homesComp = <HomeMap listView={false} callback={this.showMode} count={home_list.length} home_infos={home_infos}/>
  }

    return (
      <div>
      <div>
        <div className='agent_home_div'>
          <img className='profile_img' src={this.props.data.head_image}></img>
          <div className='name_card'>
            <p>姓名: {this.props.data.header.name}</p>
            <p>联系电话: {this.props.data.header.contact}</p>
          </div>
          <img className='agent_qr_img' src={this.props.data.qr_image}></img>
        </div>
        <div className='preview_list_div'>
          <h3 className='previewH3'>优质房源</h3>
          {homesComp}
        </div>
      </div>
      <div className='float_menu'>
        <ul>
          <li><span className='glyphicon glyphicon-earphone'></span><br/>电话</li>
          <li><span className='glyphicon glyphicon-phone'></span><br/>短信</li>
          <li><span className='glyphicon glyphicon-comment'></span><br/>微信</li>
          <li><span className='glyphicon glyphicon-envelope'></span><br/>电邮</li>
        </ul>
      </div>
      </div>
      );
  }
});

module.exports = HomePage;