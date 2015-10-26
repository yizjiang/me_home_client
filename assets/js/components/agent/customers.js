'use strict';
var React = require('react'),
  CustomerStore = require('../../stores/customer_store'),
  UserStore = require('../../stores/user_store'),
  ServerActions = require('../../actions/server_action');

var Customers = React.createClass({

  getInitialState: function() {
    return {customers:[]}
  },

  _onChange: function() {
    console.log(CustomerStore.getAll());
    this.setState({customers: CustomerStore.getAll()});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    CustomerStore.addChangeListener(this._onChange);
    ServerActions.getAllCustomers();
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    CustomerStore.removeChangeListener(this._onChange);
  },

  handleSubmit: function(rid) {
    console.log('connecting');
    ServerActions.connectCustomer(rid, UserStore.getCurrentUser());
  },

  render: function () {

    var self = this;
    return (
      <div>
        <h2>客户</h2>
        <ul>
      {this.state.customers.map(function(c){
        return (<li>
                <p>{ c.open_id + ':' }</p>
                <p> {c.region} </p>
                <button id='connect' type="button" onClick={self.handleSubmit.bind(this, c.id)} >申请联系</button>
        </li>)
      })
      }
      </ul>
      </div>
    );
  }
});

module.exports = Customers;