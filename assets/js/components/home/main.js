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
    HomeMap = require('./home_map.js'),
    SelectItems = require('./select_items'),
    AreaStore = require('../../stores/area_store'),
    FilterStore = require('../../stores/filter_store'),
    ServerActions = require('../../actions/server_action'),
    HomeListStore = require('../../stores/home_list_store');

function getSearchData() {
  return {
    home_list: HomeListStore.getProduct(),
    listView: true,
    searched: false,
    pagination: {
      page: 0,
      perPage: 5
    },
    areas: AreaStore.getArea(),
    filter: FilterStore.getFilter()
  };
}

var HomeMain = React.createClass({

  showMode: function(mode) {
    var listView;
    if(mode == 'list'){
      listView = true;
    } else {
      listView = false;
    }
    this.setState({listView: listView})
  },


  getInitialState: function() {
    return getSearchData();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    HomeListStore.addChangeListener(this._onChange);
    ServerActions.getAllCity('SF');
    AreaStore.addChangeListener(this.loadArea);
    FilterStore.addChangeListener(this.changeFilter);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    HomeListStore.removeChangeListener(this._onChange);
    AreaStore.removeChangeListener(this.loadArea);
    FilterStore.removeChangeListener(this.changeFilter);
  },

  _onChange: function() {
    this.setState(getSearchData());
  },

  loadArea: function() {
    this.setState({areas: AreaStore.getArea()});
  },

  changeFilter: function() {
    this.setState({filter: FilterStore.getFilter()})
  },

  performedSearch: function(flag) {
    this.setState({searched: flag});
  },

  filterHomes: function(home_list) {
    var filter = this.state.filter;
    if(_.isEqual(filter, {elementary: 0, middle: 0, high: 0})) {
      return home_list
    } else{
      return _.filter(home_list, (home) => {
        return (home.assigned_school.length == 3
          && home.assigned_school[0].rating > filter.elementary
          && home.assigned_school[1].rating > filter.middle
          && home.assigned_school[2].rating > filter.high
          )
      })
    }
  },

  render: function () {
    var home_list = this.state.home_list
    home_list = this.filterHomes(home_list);
    var pagination = this.state.pagination || {};
    var paginated = Paginator.paginate( home_list, pagination);
    var begin = this.state.pagination.page * this.state.pagination.perPage;
    var end = begin + this.state.pagination.perPage;
    var list = home_list.slice(begin, end) ;
    var paginateComp = null;
    var homesComp = null;

    if(this.state.listView){
      if(home_list.length > 5) {
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
      homesComp = <HomeList callback={this.showMode} searched={this.state.searched} count={home_list.length} list={list}/>
    } else {
      var home_infos = home_list.map((home) => {
        var points = home.geo_point.split(',');
        return {lat: points[0],long: points[1], home_id: home.id, description: home.short_desc, title: home.addr1}
      });
      homesComp = <HomeMap callback={this.showMode} searched={this.state.searched} count={home_list.length} home_infos={home_infos}/>
    }

    return (
      <div className="content">
        <SearchBox areas={this.state.areas} searched={this.state.searched} callback={this.performedSearch}/>

        {homesComp}
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