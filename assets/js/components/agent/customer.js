'use strict';
var React = require('react'),
  ServerActions = require('../../actions/server_action'),
  Button = require('react-bootstrap').Button;

var Customer = React.createClass({

    saveSearch: function (id) {
      $('#saveBtn' + id).text('保存中..');
      ServerActions.saveCustomerSearch({regionValue: this.state.regionValue,
        priceMin: this.state.priceMin,
        priceMax: this.state.priceMax,
        customer_id: id,
        api: true}).then(() => { $('#saveBtn' + id).text('保存');});
    },

    getInitialState: function () {
      var search = this.props.customer.search;
      if (search) {
        search = JSON.parse(search)
      } else {
        search = {};
      }

      return {
        regionValue: search.regionValue,
        priceMin: search.priceMin,
        priceMax: search.priceMax
      };

    },

    onPriceMinChange: function (event) {
      this.setState({priceMin: event.target.value});
    },

    onPriceMaxChange: function (event) {
      this.setState({priceMax: event.target.value});
    },

    onRegionChange: function (event) {
      this.setState({regionValue: event.target.value});
    },

    render: function () {
      return (
        <div className='each-customer'>
          <p className='customer-name'>{this.props.customer.nickname}</p>
          <img src={this.props.customer.head_img_url} height="90" width="90"></img>
          <div className='customer-input'>
            <label>地区</label>
            <input id="regionValue" type="text" value={this.state.regionValue || ''} onChange={this.onRegionChange}/><br/>
          </div>
          <div className='customer-input'>
            <label>最低价</label>
            <input id={"priceMin" + this.props.customer.id} type="text" value={this.state.priceMin || ''} onChange={this.onPriceMinChange}/>万<br/>
          </div>
          <div className='customer-input'>
            <label>最高价</label>
            <input id={"priceMax" + this.props.customer.id} type="text" value={this.state.priceMax || ''} onChange={this.onPriceMaxChange}/>万<br/>
          </div>
          <p>最近搜索: {this.props.customer.last_search}</p>
          <p>搜索次数: {this.props.customer.search_count}</p>

          {
            this.props.customer.interest.map((value) => { return <p>浏览过的房源: <a href={CLIENT_URL + "/#/home_detail/" + value.id} >{value.addr1 + ", " + value.city}</a> </p>})

          }
          {
            this.props.customer.favorites.map((value) => { return <p>红心的房源: <a href={CLIENT_URL + "/#/home_detail/" + value.id} >{value.addr1 + ", " + value.city}</a> </p>})
          }
         <Button id={'saveBtn' + this.props.customer.id} bsStyle='success' className='save_header' onClick={this.saveSearch.bind(this, this.props.customer.id)}>保存</Button>
       </div>
     );
   }
});

module.exports = Customer;
