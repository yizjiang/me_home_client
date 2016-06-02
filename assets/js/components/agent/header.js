'use strict';
var React = require('react'),
  Button = require('react-bootstrap').Button,
  UserStore = require('../../stores/user_store');

var Header = React.createClass({

  getStateFromStore: function () {
    var pageConf;
    pageConf = UserStore.getAgentInfo();
    return {name: pageConf.cn_name,
            phone: pageConf.phone,
            email: pageConf.mail,
            license: pageConf.license_id,
            description: pageConf.description
    }
  },

  getInitialState: function () {
    return this.getStateFromStore();
  },

  componentDidMount: function () {
    UserStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function () {
    UserStore.addChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState(this.getStateFromStore());
  },

  handleFilterChange: function (event) {
    this.setState({ [event.target.id]
    :
    event.target.value
  });
},

saveHeader: function () {
  this.props.callback(this.state).then(() => {
  $('#saveSuccess').show()});
}
,

render: function () {
  return (
    <div className='setting_header'>
      <label className='agentlabel'>姓名</label>
      <input id='name' type="text" value={this.state.name} onChange={this.handleFilterChange}/>
      <label className='agentlabel'>电话</label>
      <input id='phone' type="text" value={this.state.phone} onChange={this.handleFilterChange}/>
      <label className='agentlabel'>执照号</label>
      <input id='license' type="text" value={this.state.license} onChange={this.handleFilterChange}/>
      <label className='agentlabel'>电子邮箱</label>
      <input id='email' type="text" value={this.state.email} onChange={this.handleFilterChange}/>
      <label className='agentlabel'>个人介绍</label>
      <input id='description' type="text" value={this.state.description} onChange={this.handleFilterChange}/>
      <Button bsStyle='success' className='save_header' onClick={this.saveHeader}>保存</Button>
      <p id='saveSuccess' style={{display: 'none', width: '80px'}} >保存成功</p>
    </div>
    );
}
})
;

module.exports = Header;
