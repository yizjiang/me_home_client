'use strict';
var React = require('react'),
  Header = require('./header'),
  UserStore = require('../../stores/user_store'),
  AgentStore = require('../../stores/agent_page_store'),
  SavedSearch = require('../dashboard/saved_search_list'),
  ServerActions = require('../../actions/server_action'),
  Button = require('react-bootstrap').Button;

var Setting = React.createClass({
  getInitialState: function() {
    return { page_config: UserStore.getAgentPublishedPageConfig(), saved_searches: UserStore.getSavedSearches()};
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
    this.setState({page_config: UserStore.getAgentPublishedPageConfig(), saved_searches: UserStore.getSavedSearches()});
  },

  publish: function() {
    var qrcode = $('#qrcode');
    qrcode.toggle();
  },

  populateHeader: function(value) {
    ServerActions.savePageConfig(UserStore.getCurrentUser(), {header: value})
  },

  saveSelectedSearch: function(value) {
    ServerActions.savePageConfig(UserStore.getCurrentUser(), {search: value})
  },


  render: function () {
    var style = {};
    style.display = 'none';
    return (
      <div>
        <h3>Settings:</h3>
        <Header callback={this.populateHeader} header={this.state.page_config.header}/>
        <SavedSearch className='agent' list={this.state.saved_searches} selected={this.state.page_config.search} callback={this.saveSelectedSearch}/>
        <div>
          <button type="button" onClick={this.publish} >二维码</button>
          <img id={'qrcode'} src={'./img/' + UserStore.getCurrentUser().agent_identifier + '.png'} height="160" width="160" style={style}/>
        </div>
      </div>
      );
  }
});

module.exports = Setting;