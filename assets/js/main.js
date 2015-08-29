'use strict';

var React = require('react'),
    Router = require('react-router'), // or var Router = ReactRouter; in browsers
    Link = Router.Link,
    Route = Router.Route,
    DefaultRoute = Router.DefaultRoute,
    NotFoundRoute = Router.NotFoundRoute,
    RouteHandler = Router.RouteHandler,
    ServerActions = require('./actions/server_action'),
    Api = require('./utils/api'),
    Dashboard = require('./components/dashboard/main.js'),
    Money = require('./components/money/component/main.js'),
    HomeMain = require('./components/home/main.js'),
    HomeDetail = require('./components/home/home_detail.js'),
    Manage = require('./components/manage/component/main.js'),
    Agent = require('./components/agent/component/main.js'),
    HomePage = require('./components/agent/component/home_page.js'),
    College = require('./components/college/page.js'),
    Setting = require('./components/agent/component/setting.js'),
    UserPanel = require('./components/base/user_panel.js');

ServerActions.fetchRegionRanking('');
ServerActions.getCurrentUser();

var App = React.createClass({
  render: function () {

    return (
      <div>
        <header>
          <img className='logoImg' src="/img/logo.png" />
          <nav className='mainNav'>
            <Link to="home_main">找房</Link>
            <Link to="money">找钱</Link>
            <Link to="manage">管理房产</Link>
            <Link to="agent">经纪人入口</Link>
            <Link to="dashboard">我的觅家</Link>
          </nav>
        </header>
        <UserPanel/>
        <RouteHandler/>
      </div>
      )
  }
});

var routes = (
  <Route name="root" path="/" handler={App}>
    <Route name="home_main" handler={HomeMain}>
      <Route name="home_compare" path=":query" handler={HomeDetail}/>
    </Route>
    <Route name="money" handler={Money}/>
    <Route name="manage" handler={Manage}/>
    <Route name="agent" handler={Agent}>
      <Route name="home_page" path="home_page/:id" handler={HomePage}/>
      <Route name="setting" path="setting/:id" handler={Setting}/>
    </Route>
    <Route name="dashboard" handler={Dashboard}/>
    <Route name="home_detail/:id" handler={HomeDetail}/>
    <DefaultRoute handler={HomeMain}/>
    <NotFoundRoute handler={HomeMain}/>
  </Route>
  );

Router.run(routes, function (Handler, state) {
  var params = state.params;
  React.render(<Handler params={params}/>, document.getElementById('app'));
});

