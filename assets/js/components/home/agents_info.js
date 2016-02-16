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

  submitContactRequest: function(message, homeID) {
    return ServerActions.sendContactRequest(this.props.userID, AgentStore.getAgents().map((agent) => agent.id), homeID, message)
  },

  selectAgent: function(event) {
    var agents = AgentStore.getAgents();
    agents[event.target.value]['selected'] = !agents[event.target.value]['selected'];
    var count = _.filter(agents, { 'selected': true }).length;
    this.setState({agents: agents, contactCount: count});
  },

  render: function() {
    return (
      <div className='agent_info_wrap'>
        <h3>联系经纪人</h3>
          {this.state.agents.map((agent, index) => {
             return (
               <div className='agent_home_div'>
                 <div className='agent-list'>
                   <img className='profile_img' src={agent.wechat_user.head_img_url} />
                   <div className='agent-detail-info'>
                     <input type='checkbox' checked={agent.selected} value={index} onChange={this.selectAgent}/>
                     <a className='agent-link' href={CLIENT_URL + '/agent/' + agent.agent_extention.agent_identifier}>{agent.wechat_user.nickname}</a>
                     <img src={agent.qr_code} />
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