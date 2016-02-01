var ServerActions = require('../../actions/server_action'),
  AgentStore = require('../../stores/agent_store'),
  _ = require('lodash');


var AgentInfo = React.createClass({

  getInitialState: function() {
    return {agents: AgentStore.getAgents()}
  },

  _onChange: function() {
    this.setState({agents: AgentStore.getAgents()});
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


  render: function() {
    return (
      <div className='agent_info_wrap'>
        <h3>在线经纪人</h3>
        {this.state.agents.map((agent) => {
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
      </div>
      );
  }
});

module.exports = AgentInfo;