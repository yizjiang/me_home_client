'use strict';
var React = require('react'),
  ServerActions = require('../../actions/server_action'),
  Button = require('react-bootstrap').Button;

var Customer = React.createClass({

  saveHeader: function(id){
    var region = $('#region' + id).val();
    var priceMin =  $('#priceMin' + id).val();
    var priceMax =  $('#priceMax' + id).val();
    ServerActions.saveCustomerSearch({regionValue: region, priceMin: priceMin, priceMax: priceMax, customer_id: id, api: true})
  },

  render: function () {
    var search = this.props.customer.search;
    if(search){
      search = JSON.parse(search)
    } else {
      search = {};
    }
    return (
      <div>
        <p>{this.props.customer.nickname}</p>
        <img src={this.props.customer.head_img_url} height="100" width="100"></img>
        <label>地区</label>
        <input id={"region" + this.props.customer.id} type="text" placeholder={search.regionValue || ''}/>
        <label>最低价</label>
        <input id={"priceMin" + this.props.customer.id} type="text" placeholder={search.priceMin || ''}/>
        <label>最高价</label>
        <input id={"priceMax" + this.props.customer.id} type="text" placeholder={search.priceMax || ''}/>
        <Button bsStyle='success' className='save_header' onClick={this.saveHeader.bind(this, this.props.customer.id)}>保存</Button>
      </div>
      );
  }
});

module.exports = Customer;
