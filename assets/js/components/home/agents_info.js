var ServerActions = require('../../actions/server_action'),
  AgentStore = require('../../stores/agent_store'),
  ContactAgent = require('./contact_agent'),
  _ = require('lodash');


var AgentsInfo = React.createClass({

  getInitialState: function() {
    var agents = AgentStore.getAgents().map((agent) => { agent['selected'] = true;
                                                         return agent })
    return {agents: agents}
  },

  _onChange: function() {
    var agents = AgentStore.getAgents().map((agent) => { agent['selected'] = true;
    return agent })
    this.setState({agents: agents});
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

  selectAgent: function() {
    console.log('sasf');
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
                   <a className='agent-link' href={CLIENT_URL + '/agent/' + agent.agent_extention.agent_identifier}>{agent.wechat_user.nickname}</a>
                   <img src={agent.qr_code} />
                 </div>
               </div>
             </div>
           )
         }
       )}
       <ContactAgent/>
      </div>
    );
  }
});

module.exports = AgentsInfo;