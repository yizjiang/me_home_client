'use strict';
var React = require('react'),
  CustomerStore = require('../../stores/customer_store'),
  UserStore = require('../../stores/user_store'),
  Customer = require('./customer'),
  ServerActions = require('../../actions/server_action');

var Customers = React.createClass({

  getInitialState: function() {
    return {customers:[]}
  },

  _onChange: function() {
    this.setState({customers: CustomerStore.getAll()});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    CustomerStore.addChangeListener(this._onChange);
    ServerActions.getAllCustomers(UserStore.getCurrentUser());
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    CustomerStore.removeChangeListener(this._onChange);
  },

  handleSubmit: function(rid) {
    ServerActions.connectCustomer(rid, UserStore.getCurrentUser());
  },

  render: function () {
    return (
      <div>
        {this.state.customers.map(function(customer){
          return <Customer customer={customer}/>
        })}
      </div>
      )
  }
});

module.exports = Customers;