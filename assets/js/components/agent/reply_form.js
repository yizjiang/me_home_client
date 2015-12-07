
var ReplyForm = React.createClass({

  handleSubmit: function(qid) {
    var text = $('#answer' + qid).val();
    this.props.callback(text);
    //TODO ES6: this.setState({ [event.target.id]: event.target.value });
  },

  render: function() {
    return (
      <div>
        <h3>您的回答:</h3>
        <input id={'answer' + this.props.qid} className='answer-inputbox' type="text" placeholder="Answer question.."/>
        <button id='search' type="button" onClick={this.handleSubmit.bind(this, this.props.qid)} >提交</button>
      </div>
      );
  }
});

module.exports = ReplyForm;