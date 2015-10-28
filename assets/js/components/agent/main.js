'use strict';

var React = require('react'),
  Router = require('react-router'), // or var Router = ReactRouter; in browsers
  Link = Router.Link,
  Route = Router.Route,
  DefaultRoute = Router.DefaultRoute,
  RouteHandler = Router.RouteHandler,
  HomePage = require('./home_page'),
  Questions = require('./questions'),
  Customers = require('./customers'),
  UserStore = require('../../stores/user_store'),
  AgentStore = require('../../stores/agent_page_store'),
  ServerActions = require('../../actions/server_action'),
  Setting = require('./setting');

var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;


var Agent = React.createClass({

  getInitialState: function() {
    return {data: UserStore.getAgentPublishedPage()}
  },

  _onChange: function() {
    if(!_.isEmpty(UserStore.getCurrentUser()) && _.isEmpty(this.state.data)){
      ServerActions.getAgentPage(UserStore.getCurrentUser())
    }

    this.setState({data: UserStore.getAgentPublishedPage()});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },


  handleSelect: function (index, last) {
    console.log('Selected tab: ' + index + ', Last tab: ' + last);
  },

  render: function () {
    var tabPanel = <TabPanel></TabPanel>;
    var tab = <Tab>预览</Tab>;
    if(!_.isEmpty(this.state.data.header)){
      tabPanel = <TabPanel>
        <HomePage data={this.state.data}/>
      </TabPanel>
    }
    return (
      <div className='agentDiv'>
            <Tabs
            onSelect={this.handleSelected}
            selectedIndex={0}
            id='agenttab'
            >

        {/*
         <TabList/> is a composit component and is the container for the <Tab/>s.
         */}

              <TabList>

          {/*
           <Tab/> is the actual tab component that users will interact with.

           Selecting a tab can be done by either clicking with the mouse,
           or by using the keyboard tab to give focus then navigating with
           the arrow keys (right/down to select tab to the right of selected,
           left/up to select tab to the left of selected).

           The content of the <Tab/> (this.props.children) will be shown as the label.
           */}

                
                <Tab>设置</Tab>
                {tab}
                <Tab>答疑</Tab>
                <Tab>客户</Tab>
              </TabList>

        {/*
         <TabPanel/> is the content for the tab.

         There should be an equal number of <Tab/> and <TabPanel/> components.
         <Tab/> and <TabPanel/> components are tied together by the order in
         which they appear. The first (index 0) <Tab/> will be associated with
         the <TabPanel/> of the same index. Running this example when
         `selectedIndex` is 0 the tab with the label "Foo" will be selected
         and the content shown will be "Hello from Foo".

         As with <Tab/> the content of <TabPanel/> will be shown as the content.
         */}

              <TabPanel>
                <Setting/>
              </TabPanel>
              {tabPanel}
              <TabPanel>
                <Questions/>
              </TabPanel>
              <TabPanel>
                <Customers/>
              </TabPanel>
            </Tabs>

      </div>
      );
  }
});

module.exports = Agent;
