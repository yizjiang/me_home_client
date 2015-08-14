'use strict';

var React = require('react'),
  Router = require('react-router'), // or var Router = ReactRouter; in browsers
  Link = Router.Link,
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  RouteHandler = Router.RouteHandler,
  HomePage = require('./home_page'),
  Setting = require('./setting');

var Agent = React.createClass({
  render: function () {
    return (
      <div>
      <header>
        <nav>
          <a><Link to="home_page" params={{id: "123"}}>  首页  </Link></a>
          <a><Link to="setting" params={{id: "123"}}>  设置  </Link></a>
        </nav>
      </header>
      <h2>Agent</h2>
      <RouteHandler/>
      </div>
      );
  }
});

module.exports = Agent;