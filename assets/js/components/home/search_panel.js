'use strict';

var React = require('react'),
  Router = require('react-router'), // or var Router = ReactRouter; in browsers
  Link = Router.Link,
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  RouteHandler = Router.RouteHandler,
  SearchBox = require('./search_box'),
  SchoolSearch = require('./school_search');

var SearchPanel = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <nav>
            <a><Link to="search_box">  搜索  </Link></a>
            <a><Link to="school_search" >  学校附近  </Link></a>
          </nav>
        </header>
        <RouteHandler/>
       </div>
      );
   }
});

module.exports = SearchPanel;