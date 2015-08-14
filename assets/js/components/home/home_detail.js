'use strict';
var React = require('react'),
    HomeListStore = require('../../stores/home_list_store');


var HomeDetail = React.createClass({
  getInitialState: function() {
    return {currentHome: HomeListStore.getHomeById(this.props.params.id)}
  },

  // Add change listeners to stores
  componentDidMount: function() {
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
  },

  render: function () {
    var home = this.state.currentHome;
    return (
      <div>
        <button><a href='#'> go back </a></button>
        <h3>Home Details: </h3>
        <ul>
         {Object.keys(home).map(function(key){
             return (
                 <li> {key + ':' + JSON.stringify(home[key])} </li>
               )
           }
        )

         }
        </ul>
      </div>
      );
  }
});

module.exports = HomeDetail;