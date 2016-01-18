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
       <div className='school-info-wrap'>
         <Tabs selectedIndex={0}>
           <TabList>
             <Tab>指定学校</Tab>
             <Tab>公立学校</Tab>
             <Tab>私立学校</Tab>
           </TabList>

           <TabPanel>
             {this.props.assigned_schools.map((school) => {
               return <School {...school}/>
             })}
           </TabPanel>

           <TabPanel>
             {this.props.public_schools.map((school) => {
                    return <School {...school}/>
           })}
           </TabPanel>

           <TabPanel>
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