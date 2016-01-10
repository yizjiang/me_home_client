'use strict';

var React = require('react'),
  Customer = require('./components/agent/customer.js');

React.render(
  <Customer customer={customer}/>,
  document.getElementById('content')
);