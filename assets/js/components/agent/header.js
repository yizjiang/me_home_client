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

    var value = {};
    if(this.props.header){
      value = this.props.header;
    }

    return (
      <div>
        <label className='agentlabel'>姓名</label>
        <input id='name' type="text" value={value.name} placeholder="姓名"/>
        <label className='agentlabel'>联系方式</label>
        <input id='contact' type="text" value={value.contact} placeholder="联系方式"/>
        <Button bsStyle='success' className='save_header' onClick={this.saveHeader.bind(this, '123')}>保存联系方式</Button>
      </div>
      );
  }
});

module.exports = Header;
