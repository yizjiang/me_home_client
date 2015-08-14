'use strict';
var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;

var SearchBox = require('./search_box.js'),
    SelectPanel = require('./select_panel.js'),
    HomeList = require('./home_list.js'),
    HomeListStore = require('../../stores/home_list_store');

function getSearchData() {
  return {
    home_list: HomeListStore.getProduct()
  };
}

var HomeMain = React.createClass({
  getInitialState: function() {
    return getSearchData();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    HomeListStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    HomeListStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getSearchData());
  },

  render: function () {
    return (
      <div>
        <SearchBox/>
        <SelectPanel/>
        <HomeList list={this.state.home_list}/>
        <RouteHandler/>
      </div>
      );
  }
});

module.exports = HomeMain;