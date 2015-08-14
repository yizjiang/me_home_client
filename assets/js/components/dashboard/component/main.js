var data = require('./data.js');
var CommentList = require('./comment_list.js'),
  CommentForm = require('./comment_form.js');

var Dashboard = React.createClass({

  loadCommentsFromServer: function() {
    $.ajax({
      url: 'comments',
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  handleCommentSubmit: function(comment) {
    var comments = this.state.data;
    var newComments = comments.concat([comment]);
    this.setState({data: newComments});

    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: comment,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadCommentsFromServer();
    //setInterval(this.loadCommentsFromServer, this.props.pollInterval);
  },

  render: function() {
    // <CommentForm onCommentSubmit={this.handleCommentSubmit} />
    return (
      <div className="commentBox">
        <h1>对话框</h1>
        <CommentList data={this.state.data} />
      </div>
      );
  }
});
//React.render(
//  <CommentBox url="comments" pollInterval={5000} />,
//  document.getElementById('content')
//);

module.exports = Dashboard;