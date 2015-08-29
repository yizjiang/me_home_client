var data = require('./data.js');
var QuestionList = require('./question_list.js'),
  QuestionForm = require('./question_form.js'),
  UserStore = require('../../stores/user_store'),
  ServerActions = require('../../actions/server_action'),
  HomeList = require('../home/home_list'),
  SavedSearchList = require('./saved_search_list.js');

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
      console.log(comment);
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
    return {data: UserStore.getQuestions(), current_user: UserStore.getCurrentUser(), home_list: []};       //TODO re-design
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({data: UserStore.getQuestions(), current_user: UserStore.getCurrentUser()});
  },

  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    return (

      <div className="commentBox">
        <SavedSearchList current_user={this.state.current_user}/>
        <HomeList list={this.state.home_list}/>
        <QuestionForm onCommentSubmit={this.handleQuestionSubmit} />
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