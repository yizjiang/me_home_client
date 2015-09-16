'use strict';

var React = require('react'),
  AgentMain = require('./components/agent/home_page.js');

React.render(
  <AgentMain data={meta_data}/>,
  document.getElementById('content')
);

