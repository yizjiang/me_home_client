var QuestionForm = React.createClass({
  handleSubmit: function() {
    var text = $('#question').val();
    this.props.onCommentSubmit({text: text});
    return;
  },

  render: function() {
    return (
        <div>
          <h3>提问:</h3>
          <input id='question' type="text" placeholder="Say something..."/>
          <button id='search' type="button" onClick={this.handleSubmit} >提交</button>
        </div>
      );
  }
});

module.exports = QuestionForm;