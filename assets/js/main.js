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
    Agent = require('./components/agent/main.js'),
    College = require('./components/college/page.js'),
    UserPanel = require('./components/base/user_panel.js'),
    UserStore = require('./stores/user_store.js');

ServerActions.fetchRegionRanking('');
ServerActions.getCurrentUser().then(function(value){console.log(value)});

var App = React.createClass({

  getInitialState: function() {
    return {isAgent: undefined}
  },

  _onChange: function() {
    this.setState({isAgent: UserStore.getCurrentUser().agent_identifier != undefined});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  render: function () {
    console.log(this.state.isAgent);
    var linkComponent;
    if(this.state.isAgent == true){
      linkComponent =  <Link to="agent">经纪人入口</Link>
    } else if (this.state.isAgent == false) {
      linkComponent = <Link to="dashboard">我的觅家</Link>
    } else {
      linkComponent = ''
    }

    return (
      <div>
        <header>
          <img className='logoImg' src="/img/logo.png" />
          <nav className='mainNav'>
            <Link to="home_main">找房</Link>
            <Link to="money">找钱</Link>
            <Link to="manage">管理房产</Link>
            {linkComponent}
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
    <Route name="agent" handler={Agent}/>
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

