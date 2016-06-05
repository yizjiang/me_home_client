'use strict';
var React = require('react'),
  Header = require('./header'),
  UserStore = require('../../stores/user_store'),
  AgentStore = require('../../stores/agent_page_store'),
  SavedSearch = require('../dashboard/saved_search_list'),
  ServerActions = require('../../actions/server_action'),
  FileDrop = require('./file_drop'),
  HomeQrCode = require('./home_qr_code'),
  Button = require('react-bootstrap').Button;

var Setting = React.createClass({

  getStateFromStore: function () {
    var pageConfig = UserStore.getAgentInfo().page_config;
    if(pageConfig != undefined) {
      pageConfig = JSON.parse(pageConfig)
    }
    return  { page_config: pageConfig,
      saved_searches: UserStore.getSavedSearches(),
      meejia_image: UserStore.getMeejiaImage(),
      qr_code: UserStore.getQRCode()}
  },

  getInitialState: function() {
    return this.getStateFromStore();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(this.getStateFromStore());
  },

  publish: function() {
    var qrcode = $('#qrcode');
    qrcode.toggle();
  },

  populateHeader: function(value) {
    return ServerActions.savePageConfig(UserStore.getCurrentUser(), {header: value})
  },

  saveSelectedSearch: function(value, id) {
    $('#'+id).text('保存中')
    ServerActions.savePageConfig(UserStore.getCurrentUser(), JSON.parse(value[0])).then(() => {
      $("#" + id).removeClass('btn-success').addClass('btn-warning').text('请选择记录');
       $('#desc').show();
      });
  },


  render: function () {
    var content, file_drop;
    if(this.state.meejia_image.is_followed == true){
       content = <p>请分享此二维码给您的客户，以便了解客户在觅家服务上的活动</p>

    }
    else {
      content = <p>请扫描此二维码后刷新页面关注觅家经纪公众号</p>
    }

    if(this.state.qr_code){
      file_drop = <div className='shareDiv'>
            <p>这是您的二维码联系方式</p>
            <img src={this.state.qr_code} height="160" width="160"/>
        </div>
    }
    else {
      file_drop = <FileDrop/>
    }
    return (
      <div>
        <Header callback={this.populateHeader}/>
        <h3>查找房源，生成二维码</h3>
        <HomeQrCode/>
        <h3>选择过往搜索，执行搜索来设置您主页的推荐房源</h3>
        <SavedSearch className='agent' list={this.state.saved_searches} selected={[this.state.page_config]} callback={this.saveSelectedSearch}/>
        <p id='desc' style={{display: 'none'}} > 保存完毕，请点击预览查看 </p>
        <div className='shareGroup'>
          <div className='shareDiv'>
            {content}
            <img id={'qrcode'} src={this.state.meejia_image.img_url || CLIENT_URL + '/img/loading.gif' } height="160" width="160"/>
          </div>
          {file_drop}
        </div>
      </div>
      );
  }
});

module.exports = Setting;