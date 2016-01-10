'use strict';
var React = require('react'),
  CustomerStore = require('../../stores/customer_store'),
  AreaStore = require('../../stores/area_store'),
  UserStore = require('../../stores/user_store'),
  Customer = require('./customer'),
  QuickSearch = require('../dashboard/quick_search'),
  ServerActions = require('../../actions/server_action');

var Customers = React.createClass({

  getInitialState: function() {
    return {customers:[],
      areas: AreaStore.getArea()}
  },

  _onChange: function() {
    this.setState({customers: CustomerStore.getAll()});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    ServerActions.getAllCity('SF');
    CustomerStore.addChangeListener(this._onChange);
    ServerActions.getAllCustomers(UserStore.getCurrentUser());
    AreaStore.addChangeListener(this.loadArea);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    CustomerStore.removeChangeListener(this._onChange);
    AreaStore.removeChangeListener(this.loadArea);
  },

  handleSubmit: function(rid) {
    ServerActions.connectCustomer(rid, UserStore.getCurrentUser());
  },

  loadArea: function() {
    this.setState({areas: AreaStore.getArea()});
  },

  render: function () {
    var quickSearchComp = null;
    if(!_.isEmpty(this.state.areas)) {
      quickSearchComp = this.state.customers.map((customer) => {
          console.log(customer);
          return <QuickSearch wechat_user={customer} areas={this.state.areas}/>
        });
    }

    return (
      <div>
        {quickSearchComp}
      </div>
      )
  }
});

module.exports = Customers;