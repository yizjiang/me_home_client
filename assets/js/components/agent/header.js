'use strict';
var React = require('react'),
  Button = require('react-bootstrap').Button;

var Header = React.createClass({

  saveHeader: function(value){
    var name = $('#name').val();
    var contact =  $('#contact').val();
    this.props.callback({name: name, contact: contact});
  },

  render: function () {
    var name, contact;
    if(this.props.header != undefined) {
      name = this.props.header.name;
      contact = this.props.header.contact;
    }
    return (
      <div>
        <label className='agentlabel'>姓名</label>
        <input id='name' type="text" value={name}/>
        <label className='agentlabel'>联系方式</label>
        <input id='contact' type="text" value={contact}/>
        <Button bsStyle='success' className='save_header' onClick={this.saveHeader}>保存联系方式</Button>
      </div>
      );
  }
});

module.exports = Header;
