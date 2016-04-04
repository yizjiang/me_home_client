var ServerActions = require('../../actions/server_action'),
  AgentStore = require('../../stores/agent_store'),
  ContactAgent = require('./contact_agent'),
  React = require('react'),
  _ = require('lodash');


var AgentsInfo = React.createClass({

  getInitialState: function() {
    var agents = AgentStore.getAgents().map((agent) => { agent['selected'] = true;
    return agent })
    return {agents: agents, contactCount: agents.length}
  },

  _onChange: function() {
    var agents = AgentStore.getAgents().map((agent) => { agent['selected'] = true;
    return agent })
    this.setState({agents: agents, contactCount: agents.length});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    AgentStore.addChangeListener(this._onChange);
    ServerActions.getAgents(this.props.userID);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    AgentStore.removeChangeListener(this._onChange);
  },

  auth_back: function(ticket) {
    ServerActions.getCurrentUser(ticket);
    window.auth_window.close();
  },

  submitContactRequest: function(message, homeID) {
    if (this.props.userID == undefined) {
      var auth_window = window.open(SERVER_URL + '/users/login', null, "width=400,height=250");
      window.auth_window = auth_window;
      window.auth_callback = this.auth_back;
    } else {
      var selectedAgents = _.filter(this.state.agents, (agent) => agent.selected).map((agent) => agent.id);
      return ServerActions.sendContactRequest(this.props.userID, selectedAgents, homeID, message)
    }
  },

  selectAgent: function(event) {
    var agents = AgentStore.getAgents();
    agents[event.target.value]['selected'] = !agents[event.target.value]['selected'];
    var count = _.filter(agents, { 'selected': true }).length;
    this.setState({agents: agents, contactCount: count});
  },

  closeAgent: function(event) {
    $('.qr-layer').hide();
  },

  showAgent: function(event) {
    $('.qr-layer').show();
  },

  render: function() {
    return (
      <div className='agent_info_wrap'>
        <h3>联系经纪人</h3>
        <p>鼠标悬浮头像查看二维码扫描二维码</p>
          {this.state.agents.map((agent, index) => {
             return (
               <div className='agent_home_div'>
                 <div className='agent-list'>
                   <div className='triger-div'>
                     <img className='profile_img' src={agent.wechat_user.head_img_url} onMouseOver={this.showAgent} onMouseOut={this.closeAgent}/>
                     <div className='agent-detail-info'>
                      <input type='checkbox' checked={agent.selected} value={index} onChange={this.selectAgent}/>
                      <a className='agent-link' href={CLIENT_URL + '/agent/' + agent.agent_extention.agent_identifier}>{agent.wechat_user.nickname}</a>
                     </div>
                     <div className='qr-layer'>
                      <div className='close-div' onClick={this.closeAgent}>x</div>
                      <img className='agent-qr-image' src={agent.qr_code} />
                     </div>
                   </div>
                 </div>
               </div>
             )
           }
         )}
        <ContactAgent homeID={this.props.homeID} submitContactRequest={this.submitContactRequest} contactCount={this.state.contactCount}/>
      </div>
    );
  }
});

module.exports = AgentsInfo;