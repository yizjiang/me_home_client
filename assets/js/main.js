'use strict';
window._ = require('lodash');
window.React = require('react/addons');
window.ReactBootstrap = require("react-bootstrap");

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
    SchoolFinder = require('./components/school/component/main.js'),
    Agent = require('./components/agent/main.js'),
    College = require('./components/college/page.js'),
    UserPanel = require('./components/base/user_panel.js'),
    HelpPanel = require('./components/base/help_panel.js'),
    UserStore = require('./stores/user_store.js');


//ServerActions.fetchRegionRanking('');

ServerActions.getCurrentUser(TICKET).then(function(value){
  console.log(value);
  if(value.agent_identifier != undefined){
    ServerActions.getMeejiaImage(value.id)
  }
});

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
    var linkComponent;
    if(this.state.isAgent == true){
      linkComponent =  <li><a href='/#/agent' className='alinkClass'>经纪人入口</a></li>
    } else if (this.state.isAgent == false) {
      linkComponent = <li><a href='/#/dashboard' className='alinkClass'>我的觅家</a></li>
    } else {
      linkComponent = ''
    }

    return (
      <div>
        <div className='menuDiv'>
          <ul id='MenuBox' className='nav navbar-nav'>
            <li><a href='/#/main' className='alinkClass'>找房</a></li>
            <li><a href='/static/mortgage.html' className='alinkClass'>找钱</a></li>
            <li><a href='/#/school' className='alinkClass'>找学校</a></li>
            {linkComponent}
          </ul>
        </div>
        <header>
            <a href='/#/main'><img className='logoImg' src="/img/logo.png" /></a>
            <div className='location-usa'>
              <p className='location-country'>美 国</p>
              <p className='location-country-en'>United States</p>
            </div>
            <div className='nav-wrap'>
              <ul className='nav-list'>
                <li><a href='/#/main'>找房</a></li>
                <li><a href='/static/mortgage.html'>找钱</a></li>
                <li><a href='/#/school'>找学校</a></li>
                {linkComponent}
              </ul>
            </div>
            <div className='nav-triger'>
              <a id="nav-toggle" className="nav_slide_button"><span></span></a>
            </div>
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
    <Route name="school" handler={SchoolFinder}/>
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

function closeMenubox(){
   $('#nav-toggle').toggleClass('active');
   $('#MenuBox').fadeToggle(300, 'linear');
};

$('#nav-toggle').click(closeMenubox);
$('a.alinkClass').click(closeMenubox);