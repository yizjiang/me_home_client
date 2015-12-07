'use strict';
var React = require('react'),
  Header = require('./header'),
  UserStore = require('../../stores/user_store'),
  AgentStore = require('../../stores/agent_page_store'),
  SavedSearch = require('../dashboard/saved_search_list'),
  ServerActions = require('../../actions/server_action'),
  FileDrop = require('./file_drop'),
  Button = require('react-bootstrap').Button;

var Setting = React.createClass({

  getStateFromStore: function () {
    return  { page_config: UserStore.getAgentPublishedPageConfig(),
      saved_searches: UserStore.getSavedSearches(),
      qr_img: UserStore.getQRImage(),
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
    ServerActions.savePageConfig(UserStore.getCurrentUser(), {header: value})
  },

  saveSelectedSearch: function(value, id) {
    $('#'+id).text('保存中')
    ServerActions.savePageConfig(UserStore.getCurrentUser(), {search: value}).then(() => {
      $('#'+id).text('执行搜索');
       $('#desc').show();
      });
  },


  render: function () {
    var content, file_drop;
    if(this.state.qr_img.is_followed == true){
       content = <p>请分享此二维码给您的客户</p>
    }
    else {
      content = <p>您还未关注觅家公众号，请扫描此二维码后刷新</p>
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
        <SavedSearch className='agent' list={this.state.saved_searches} selected={this.state.page_config.search} callback={this.saveSelectedSearch}/>
        <p id='desc' style={{display: 'none'}} > 保存完毕，请点击预览查看 </p>
        <div className='shareGroup'>
          <div className='shareDiv'>
            {content}
            <img id={'qrcode'} src={SERVER_URL + "/" + this.state.qr_img.img_url} height="160" width="160"/>
          </div>
          {file_drop}
        </div>
      </div>
      );
  }
});

module.exports = Setting;