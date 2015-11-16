'use strict';
var React = require('react'),
  ServerActions = require('../../actions/server_action'),
  Button = require('react-bootstrap').Button;

var Customer = React.createClass({

  saveHeader: function(id){
    var region = $('#region' + id).val();
    var price =  $('#price' + id).val();
    ServerActions.saveCustomerSearch({city: region, price_range: price, customer_id: id, api: true})
  },

  render: function () {
    var search = this.props.customer.search;
    if(search){
      search = JSON.parse(search)
    } else {
      search = {city: 'San Francisco', price_range: '5000000 - 1000000'}
    }
    console.log(search);
    return (
      <div>
        <p>{this.props.customer.nickname}</p>
        <img src={this.props.customer.head_img_url} height="100" width="100"></img>
        <label>地区</label>
        <input id={"region" + this.props.customer.id} type="text" placeholder={search.city}/>
        <label>价格区间</label>
        <input id={"price" + this.props.customer.id} type="text" placeholder={search.price_range}/>
        <Button bsStyle='success' className='save_header' onClick={this.saveHeader.bind(this, this.props.customer.id)}>保存</Button>
      </div>
      );
  }
});

module.exports = Customer;
