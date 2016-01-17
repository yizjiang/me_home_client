'use strict';

var React = require('react'),
    ReactTabs = require('react-tabs'),
    School = require('./school'),
    Tab = ReactTabs.Tab,
    Tabs = ReactTabs.Tabs,
    TabList = ReactTabs.TabList,
    TabPanel = ReactTabs.TabPanel;


var SchoolInfo = React.createClass({

  render: function () {
    return (
       <div>
         <Tabs selectedIndex={0}>
           <TabList>
             <Tab><span className='glyphicon glyphicon-heart'></span></Tab>
             <Tab><span className='glyphicon glyphicon-bookmark'></span></Tab>
             <Tab><span className='glyphicon glyphicon-question-sign'></span></Tab>
           </TabList>

           <TabPanel>
             <h3>指定学校</h3>
             {this.props.assigned_schools.map((school) => {
               return <School {...school}/>
             })}
           </TabPanel>

           <TabPanel>
             <h3>公立学校</h3>
             {this.props.public_schools.map((school) => {
                    return <School {...school}/>
           })}
           </TabPanel>

           <TabPanel>
             <h3>私立学校</h3>
                  {this.props.private_schools.map((school) => {
                    return <School {...school}/>
           })}
           </TabPanel>
         </Tabs>
       </div>
     )
  }
})

module.exports = SchoolInfo;