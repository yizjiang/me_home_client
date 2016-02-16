'use strict';
var React = require('react'),
  CustomerStore = require('../../stores/customer_store'),
  AgentRequestStore = require('../../stores/agent_request_store'),
  AreaStore = require('../../stores/area_store'),
  UserStore = require('../../stores/user_store'),
  Customer = require('./customer'),
  AgentRequests = require('./agent_requests'),
  QuickSearch = require('../dashboard/quick_search'),
  ServerActions = require('../../actions/server_action');

var Customers = React.createClass({

  getInitialState: function() {
    return {customers:[],
      areas: AreaStore.getArea(),
      requests: []}
  },

  _onChange: function() {
    this.setState({customers: CustomerStore.getAll(), requests: AgentRequestStore.getAll()});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    ServerActions.getAllCity('SF');
    CustomerStore.addChangeListener(this._onChange);
    AgentRequestStore.addChangeListener(this._onChange);
    ServerActions.getAllCustomers(UserStore.getCurrentUser());
    ServerActions.getAllRequests(UserStore.getCurrentUser());
    AreaStore.addChangeListener(this.loadArea);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    CustomerStore.removeChangeListener(this._onChange);
    AgentRequestStore.removeChangeListener(this._onChange);
    AreaStore.removeChangeListener(this.loadArea);
  },

  handleSubmit: function(rid) {
    ServerActions.connectCustomer(rid, UserStore.getCurrentUser());
  },

  loadArea: function() {
    this.setState({areas: AreaStore.getArea()});
  },

  render: function () {
    console.log(this.state.requests);
    var quickSearchComp = null;
    if(!_.isEmpty(this.state.areas)) {
      quickSearchComp = this.state.customers.map((customer) => {
          return <QuickSearch wechat_user={customer} areas={this.state.areas}/>
        });
    }

    return (
      <div>
        {quickSearchComp}
        <AgentRequests requests={this.state.requests}/>
      </div>
      )
  }
});

module.exports = Customers;