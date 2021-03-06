'use strict';

var React = require('react'),
    ReactTabs = require('react-tabs'),
    School = require('./school'),
    College = require('./college'),
    Tab = ReactTabs.Tab,
    Tabs = ReactTabs.Tabs,
    TabList = ReactTabs.TabList,
    TabPanel = ReactTabs.TabPanel;


var SchoolInfo = React.createClass({

  render: function () {

    var assignedSchools, publicSchools, privateSchools, colleges;
    assignedSchools = publicSchools = privateSchools = colleges = <p>暂无学校信息</p>;

    if(this.props.assigned_schools.length > 0 ){
      assignedSchools = this.props.assigned_schools.map((school) => {
        return <School {...school}/>
      })
    }

    if(this.props.public_schools.length > 0 ){
      publicSchools = this.props.public_schools.map((school) => {
        return <School {...school}/>
      })
    }

    if(this.props.private_schools.length > 0 ){
      privateSchools = this.props.private_schools.map((school) => {
        return <School {...school}/>
      })
    }

    if(this.props.colleges.length > 0 ){
      colleges = this.props.colleges.map((college) => {
        return <College {...college}/>
      })
    }

    return (
       <div className='school-info-wrap'>
         <Tabs selectedIndex={0}>
           <TabList>
             <Tab>指定学校</Tab>
             <Tab>公立学校</Tab>
             <Tab>私立学校</Tab>
             <Tab>大学</Tab>
           </TabList>

           <TabPanel>
             {assignedSchools}
           </TabPanel>

           <TabPanel>
             {publicSchools}
           </TabPanel>

           <TabPanel>
              {privateSchools}
           </TabPanel>

           <TabPanel>
              {colleges}
           </TabPanel>
         </Tabs>
       </div>
     )
  }
})

module.exports = SchoolInfo;