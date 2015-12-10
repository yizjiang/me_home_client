'use strict';
var React = require('react');
var Router = require('react-router'); // or var Router = ReactRouter; in browsers
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;
var Route = Router.Route;

var Paginator = require('react-pagify');

var SearchBox = require('./search_box.js'),
    SearchPanel = require('./search_panel.js'),
    SelectPanel = require('./select_panel.js'),
    HomeList = require('./home_list.js'),
    SelectItems = require('./select_items'),
    AreaStore = require('../../stores/area_store'),
    ServerActions = require('../../actions/server_action'),
    HomeListStore = require('../../stores/home_list_store');

function getSearchData() {
  return {
    home_list: HomeListStore.getProduct(),
    searched: false,
    pagination: {
      page: 0,
      perPage: 5
    },
    areas: AreaStore.getArea()
  };
}

var HomeMain = React.createClass({
  getInitialState: function() {
    return getSearchData();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    HomeListStore.addChangeListener(this._onChange);
    ServerActions.getAllCity('SF');
    AreaStore.addChangeListener(this.loadArea);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    HomeListStore.removeChangeListener(this._onChange);
    AreaStore.removeChangeListener(this.loadArea);
  },

  _onChange: function() {
    this.setState(getSearchData());
  },

  loadArea: function() {
    this.setState({areas: AreaStore.getArea()});
  },

  performedSearch: function(flag) {
    this.setState({searched: flag});
  },

  render: function () {
    var pagination = this.state.pagination || {};
    var paginated = Paginator.paginate( this.state.home_list, pagination);
    var begin = this.state.pagination.page * this.state.pagination.perPage;
    var end = begin + this.state.pagination.perPage;
    var list = this.state.home_list.slice(begin, end) ;
    var paginateComp = null;
    if(this.state.home_list.length > 5) {
      paginateComp = <Paginator
      className='pagify-pagination'
      ellipsesClassName='pagify-ellipsis'
      activeClassName='selected'
      inactiveClassName='inactive'
      page={paginated.page}
      pages={paginated.amount}
      beginPages={3}
      endPages={3}
      showPrevNext={true}
      alwaysShowPrevNext={true}
      prevButton={'Previous one'}
      nextButton={'Next one'}
      onSelect={this.onSelect}>
      </Paginator>
    }

    return (
      <div className="content">
        <SearchBox areas={this.state.areas}  callback={this.performedSearch}/>
        <HomeList searched={this.state.searched} count={this.state.home_list.length} list={list}/>
        {paginateComp}

        <RouteHandler/>
      </div>
      );
  },

  selectRegion: function(value) {
    console.log(value);
  },

  onSelect(page) {
    var pagination = this.state.pagination || {};

    pagination.page = page;

    this.setState({
      pagination: pagination
    });
  },

  onPerPage(e) {
    var pagination = this.state.pagination || {};

    pagination.perPage = parseInt(event.target.value, 10);

    this.setState({
      pagination: pagination
    });
  }

});

module.exports = HomeMain;