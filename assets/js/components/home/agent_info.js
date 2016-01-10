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
    console.log(this.state.agents);
    return (
      <div>
        {this.state.agents.map((agent) => {
           return (
             <div>
               <h3>在线经纪人</h3>
               <p>姓名: {agent.wechat_user.nickname}</p>
               <img src={agent.wechat_user.head_img_url}></img>
               <p>二维码联系方式</p>
               <img src={agent.qr_code}></img>
             </div>
           )
         }
       )}
      </div>
      );
  }
});

module.exports = AgentInfo;