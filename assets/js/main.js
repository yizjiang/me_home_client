'use strict';

var React = require('react'),
    Base = require('./base/base.js'),
    CommentBox = require('./comment/comment_box.js'),
    HomeMap = require('./home/home_map.js'),
    Product = require('./product/filterable_product_table.js');

var Agent = React.createClass({
  render: function () {
    return <h2>Agent</h2>;
  }
});


var HomeSearch = React.createClass({
  render: function () {
    return (
      <div>
        <h2>HomeSearch</h2>
        <input
        type="text"
        placeholder="Search..."
        value={this.props.filterText}

        onChange={this.handleChange}
        />
        <RouteHandler/>
      </div>
      );
  }
});

var Home = React.createClass({
  render: function () {
    return (
      <div>
       <p>{this.props.params.home_id}</p>
      </div>
      );
  }
});



var Manage = React.createClass({
  render: function () {
    return <h2>Manage</h2>;
  }
});


// declare our routes and their hierarchy
var Router = require('react-router'); // or var Router = ReactRouter; in browsers

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = React.createClass({
  render: function () {
    return (
      <div>
        <header>
          <nav>
            <a><Link to="home_search">  找房  </Link></a>
            <a><Link to="money">  找钱  </Link></a>
            <a><Link to="manage">  管理房产  </Link></a>
            <a><Link to="agent">  经纪人入口  </Link></a>
            <a><Link to="dashboard">  我的觅家  </Link></a>
          </nav>
        </header>
        <RouteHandler/>
      </div>
      )
  }
});

var Message = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },

  render: function () {
    return (
      <div>{this.props.params.id}</div>
      );
  }
});

var routes = (
  <Route name="root" path="/" handler={App}>
    <Route name="home_search" handler={HomeSearch}>
      <Route name="home" path=":home_id" handler={Home}/>
    </Route>
    <Route name="money" handler={Product}/>
    <Route name="manage" handler={Manage}/>
    <Route name="agent" handler={Agent}/>
    <Route name="dashboard" handler={CommentBox}/>
    <DefaultRoute handler={HomeSearch}/>
  </Route>
  );

Router.run(routes, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.getElementById('app'));
});

