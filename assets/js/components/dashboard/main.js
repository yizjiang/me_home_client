var data = require('./data.js');
var QuestionList = require('./question_list.js'),
    QuestionForm = require('./question_form.js'),
    UserStore = require('../../stores/user_store'),
    ServerActions = require('../../actions/server_action'),
    HomeList = require('../home/home_list'),
    HomeMap = require('../home/home_map.js'),
    SavedSearchList = require('./saved_search_list.js'),
    HomeListStore = require('../../stores/home_list_store'),
    AreaStore = require('../../stores/area_store'),
    QuickSearch = require('./quick_search.js'),
    React = require('react'),
    ReactTabs = require('react-tabs'),
    Tab = ReactTabs.Tab,
    Tabs = ReactTabs.Tabs,
    TabList = ReactTabs.TabList,
    TabPanel = ReactTabs.TabPanel,
    Paginator = require('react-pagify');

var Dashboard = React.createClass({

//  loadCommentsFromServer: function() {
//    $.ajax({
//      url: 'comments',
//      dataType: 'json',
//      cache: false,
//      success: function(data) {
//        this.setState({data: data});
//      }.bind(this),
//      error: function(xhr, status, err) {
//        console.error(this.props.url, status, err.toString());
//      }.bind(this)
//    });
//  },

  handleQuestionSubmit: function(comment) {
    ServerActions.submitQuestion(comment, UserStore.getCurrentUser());
//    $.ajax({
//      url: this.props.url,
//      dataType: 'json',
//      type: 'POST',
//      data: comment,
//      success: function(data) {
//        this.setState({data: data});
//      }.bind(this),
//      error: function(xhr, status, err) {
//        console.error(this.props.url, status, err.toString());
//      }.bind(this)
//    });
  },

  stateObject: function() {
    return {data: UserStore.getQuestions(),
      saved_searches: UserStore.getSavedSearches(),
      current_user: UserStore.getCurrentUser(),
      home_list: HomeListStore.getProduct(),
      favorite_list: UserStore.getFavoriteHomes(),
      listView: true,
      areas: AreaStore.getArea(),
      wechatUser: UserStore.getWechatUser(),
      pagination: {
        page: 0,
        perPage: 5
      }}
  },

  getInitialState: function() {
    return this.stateObject();       //TODO re-design
  },

  showMode: function(mode) {
    var listView;
    if(mode == 'list'){
      listView = true;
    } else {
      listView = false;
    }
    this.setState({listView: listView})
  },


  // Remove change listeners from stores
  componentWillUnmount: function() {
    console.log('unmount dashboad');
    AreaStore.removeChangeListener(this.loadArea);
    UserStore.removeChangeListener(this._onChange);
    HomeListStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({data: UserStore.getQuestions(),
      saved_searches: UserStore.getSavedSearches(),
      current_user: UserStore.getCurrentUser(),
      home_list: HomeListStore.getProduct(),
      areas: AreaStore.getArea(),
      wechatUser: UserStore.getWechatUser(),
      favorite_list: UserStore.getFavoriteHomes()});
  },

  componentDidMount: function() {
    ServerActions.getAllCity('SF');
    AreaStore.addChangeListener(this.loadArea);
    UserStore.addChangeListener(this._onChange);
    HomeListStore.addChangeListener(this._onChange);
//    $('#nav-toggle').removeClass('active');
//    $('#MenuBox').fadeOut(300, 'linear');
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  loadArea: function() {
    this.setState({areas: AreaStore.getArea()});
  },

  render: function() {
    var home_list =  this.state.home_list;
    var favorite_list = this.state.favorite_list
    var pagination = this.state.pagination || {};
    var paginated = Paginator.paginate( this.state.home_list, pagination);
    var begin = this.state.pagination.page * this.state.pagination.perPage;
    var end = begin + this.state.pagination.perPage;
    var list = this.state.home_list.slice(begin, end) ;
    var paginateComp = null;

    var homesComp = null;
    var favoriteHomesComp = null;

    if(this.state.listView){
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
      homesComp = <HomeList listView={true} callback={this.showMode} searched={this.state.searched} count={home_list.length} list={list}/>
      favoriteHomesComp =  <HomeList listView={true} callback={this.showMode} custom_style={'favoredHouse'} count={favorite_list.length} list={favorite_list}/>
    } else {
      var home_infos = home_list.map((home) => {
        var points = home.geo_point.split(',');
      return {lat: points[0],long: points[1], home_id: home.id, description: home.short_desc, title: home.addr1}
    });
      var favoriate_infos = favorite_list.map((home) => {
      var points = home.geo_point.split(',');
    return {lat: points[0],long: points[1], home_id: home.id, description: home.short_desc, title: home.addr1}
  });

      homesComp = <HomeMap listView={false} callback={this.showMode} searched={this.state.searched} count={home_list.length} home_infos={home_infos}/>
      favoriteHomesComp = <HomeMap listView={false} callback={this.showMode} searched={this.state.searched} count={favorite_list.length} home_infos={favoriate_infos}/>
    }

    var quickSearchComp = null;
    if(!_.isEmpty(this.state.wechatUser) && !_.isEmpty(this.state.areas)) {
      quickSearchComp =  <QuickSearch wechat_user={this.state.wechatUser} areas={this.state.areas}/>
    }

    return (
      <div className='tabdiv'>
      <Tabs onSelect={this.handleSelected} selectedIndex={1}>
        <TabList>
          <Tab><span className='glyphicon glyphicon-heart'></span></Tab>
          <Tab><span className='glyphicon glyphicon-bookmark'></span></Tab>
          <Tab><span className='glyphicon glyphicon-question-sign'></span></Tab>
        </TabList>

        <TabPanel>
          <h3>红心房源</h3>
          {favoriteHomesComp}
        </TabPanel>

        <TabPanel>
          {quickSearchComp}
          <SavedSearchList list={this.state.saved_searches}/>
          <div className='searchResult'>
            {homesComp}
            {paginateComp}
          </div>
        </TabPanel>

        <TabPanel>
          <QuestionForm onCommentSubmit={this.handleQuestionSubmit} />
          <hr />
          <QuestionList data={this.state.data} />
        </TabPanel>
      </Tabs>
      </div>
    
    );
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

//React.render(
//  <CommentBox url="comments" pollInterval={5000} />,
//  document.getElementById('content')
//);

module.exports = Dashboard;
