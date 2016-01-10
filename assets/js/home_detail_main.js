'use strict';

var React = require('react'),
  HomeDetail = require('./components/home/home_detail.js');

React.render(
  <HomeDetail params={{id: home_id}}/>,
  document.getElementById('content')
);