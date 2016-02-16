'use strict';

var React = require('react');


var ContactAgent = React.createClass({

  getInitialState: function() {
    return {contact: '我对' + this.props.homeID + '号房源很有兴趣，希望了解详情'}
  },


  handleFilterChange: function (event) {
    this.setState({contact: event.target.value});
  },

  handleSubmit: function (){
    this.props.submitContactRequest(this.state.contact, this.props.homeID).then((data) => {
      $('#desc').show();
    })
  },

  render: function () {
    var receipt = this.props.contactCount == 0 ? '发送给公众号' : '发送给选中经纪人'
    return (
      <div>
        <h3>提问:</h3>
        <input id='contactAgent' type="text" value={this.state.contact} onChange={this.handleFilterChange}/>
        <button id='submitContactRequest' type="button" onClick={this.handleSubmit} >{receipt}</button>
        <p id='desc' style={{display: 'none', width: '80px'}}> 已提交 </p>
      </div>
      )
  }
})

module.exports = ContactAgent;