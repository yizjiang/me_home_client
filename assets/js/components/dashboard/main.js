var data = require('./data.js');
var QuestionList = require('./question_list.js'),
  QuestionForm = require('./question_form.js'),
  UserStore = require('../../stores/user_store'),
  ServerActions = require('../../actions/server_action'),
  HomeList = require('../home/home_list'),
  SavedSearchList = require('./saved_search_list.js'),
  HomeListStore = require('../../stores/home_list_store');

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

  getInitialState: function() {
    return {data: UserStore.getQuestions(),
      saved_searches: UserStore.getSavedSearches(),
      current_user: UserStore.getCurrentUser(),
      home_list: HomeListStore.getProduct(),
      favorite_list: UserStore.getFavoriteHomes()};       //TODO re-design
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
    HomeListStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({data: UserStore.getQuestions(),
      saved_searches: UserStore.getSavedSearches(),
      current_user: UserStore.getCurrentUser(),
      home_list: HomeListStore.getProduct(),
      favorite_list: UserStore.getFavoriteHomes()});
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
    HomeListStore.addChangeListener(this._onChange);
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (
      <div className="commentBox">
        <h3>红心房源</h3>
        <HomeList custom_style={'favoredHouse'} list={this.state.favorite_list}/>
        <hr />
        <SavedSearchList list={this.state.saved_searches}/>
        <div className='searchResult'>
          <HomeList list={this.state.home_list}/>
        </div>
        <QuestionForm onCommentSubmit={this.handleQuestionSubmit} />
        <hr />
        <QuestionList data={this.state.data} />
      </div>
      );
  }
});

//React.render(
//  <CommentBox url="comments" pollInterval={5000} />,
//  document.getElementById('content')
//);

module.exports = Dashboard;