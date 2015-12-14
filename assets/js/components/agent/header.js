'use strict';
var React = require('react'),
  Button = require('react-bootstrap').Button,
  UserStore = require('../../stores/user_store');

var Header = React.createClass({

  getStateFromStore: function () {
    var name, contact, pageConf;
    pageConf = UserStore.getAgentPublishedPageConfig();
    if (pageConf.header != undefined) {
      name = pageConf.header.name;
      contact = pageConf.header.contact;
    }
    return {name: name, contact: contact}
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
    console.log('onchange');
    this.setState(this.getStateFromStore());
  },

  handleFilterChange: function (event) {
    this.setState({ [event.target.id]
    :
    event.target.value
  });
},

saveHeader: function () {
  this.props.callback(this.state);
}
,

render: function () {
  return (
    <div className='setting_header'>
      <label className='agentlabel'>姓名</label>
      <input id='name' type="text" value={this.state.name} onChange={this.handleFilterChange}/>
      <label className='agentlabel'>联系方式</label>
      <input id='contact' type="text" value={this.state.contact} onChange={this.handleFilterChange}/>
      <Button bsStyle='success' className='save_header' onClick={this.saveHeader}>保存联系方式</Button>
    </div>
    );
}
})
;

module.exports = Header;
