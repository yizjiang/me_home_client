var Answer = React.createClass({
  likeThisAnswer: function(aid) {
    var qrcode = $('#qrcode' + aid);
    qrcode.toggle();
  },

  render: function() {
    var style = {};
    style.display = 'none'

    return (
      <div className="comment">
        <p>{this.props.answer.body}</p>
        <button type="button" onClick={this.likeThisAnswer.bind(this, this.props.answer.id)} >喜欢</button>
        <img id={'qrcode' + this.props.answer.id} src={SERVER_URL + '/sample.jpg'} height="80" width="80" style={style}/>
      </div>
      );
  }
});

module.exports = Answer;