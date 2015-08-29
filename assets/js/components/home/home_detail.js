'use strict';
var React = require('react'),
    HomeListStore = require('../../stores/home_list_store');


var HomeDetail = React.createClass({

  loadHomeFromServer: function(id) {
    $.ajax({
      url: 'home/show',
      dataType: 'json',
      data: {home_id: id},
      success: function(data) {
        console.log(data);
        this.setState({currentHome: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }.bind(this)
    });
  },

  getInitialState: function() {
    var currentHome =  HomeListStore.getHomeById(this.props.params.id)
    if(_.isEmpty(currentHome)) {
      this.loadHomeFromServer(this.props.params.id)
      currentHome = {};
    }

    return {currentHome: currentHome}
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