'use strict';
var React = require('react'),
  HomeList = require('../home/home_list');

var HomePage = React.createClass({
  render: function () {
    console.log(this.props.data);
    return (
      <div>
        <h3>
          Name: {this.props.data.header.name}
          <br></br>
          Contact: {this.props.data.header.contact}
          <br></br>
          My List
        </h3>
        <HomeList list={this.props.data.home_list}/>
      </div>
      );
  }
});

module.exports = HomePage;