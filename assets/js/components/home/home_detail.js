'use strict';
var React = require('react'),
    HomeListStore = require('../../stores/home_list_store'),
    ServerActions = require('../../actions/server_action'),
    UserStore = require('../../stores/user_store'),
    Button = require('react-bootstrap').Button;


var HomeDetail = React.createClass({

  loadHomeFromServer: function(id) {
    $.ajax({
      url: 'home/show',
      dataType: 'json',
      data: {home_id: id},
      success: function(data) {
        this.setState({currentHome: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }.bind(this)
    });
  },

  getInitialState: function() {
    var currentHome =  HomeListStore.getHomeById(this.props.params.id);
    var self = this;
    if(_.isEmpty(currentHome)) {
      this.loadHomeFromServer(this.props.params.id)
      currentHome = {};
    }
    return {currentHome: currentHome, currentFavorite: UserStore.getFavoriteHomes()}
  },

  _onChange: function() {
    this.setState({currentFavorite: UserStore.getFavoriteHomes()});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  favoriteAction: function() {
    if(!this.isFavorite()) {
      ServerActions.addFavorite(this.state.currentHome.id, UserStore.getCurrentUser());      //Todo use then
    }else {
      ServerActions.removeFavorite(this.state.currentHome.id, UserStore.getCurrentUser());      //Todo use then
    }
  },


  isFavorite: function() {
    var self = this;
    if(this.state.currentFavorite){
      return !_.isEmpty(this.state.currentFavorite.filter(function(v){return v.id== self.state.currentHome.id})[0])

    }else{
      return false
    }
  },

  render: function () {
    var home = this.state.currentHome;
    var bgStyle = this.isFavorite() ? 'danger' : 'warning'
    //TODO go back
    return (
      <div>
        <button><a href='#'> go back </a></button>
        <Button id='favoriteBtn' bsStyle={bgStyle} onClick={this.favoriteAction}>红心</Button>
        <h3>Home Details: </h3>
        <ul>
         {Object.keys(home).map(function(key){
             return (
                 <li>
                   {key + ':' + JSON.stringify(home[key])}
                  </li>
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