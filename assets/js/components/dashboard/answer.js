var Answer = React.createClass({
  likeThisAnswer: function(aid) {
    var qrcode = $('#qrcode' + aid);            //TODO should we have action?
    qrcode.toggle();
  },

  render: function() {
    var style = {};
    style.display = 'none'
    return (
      <div className="comment">
        <p className='answerPara'>{this.props.answer.body}</p>
        <button type="button" id='likedbtn' onClick={this.likeThisAnswer.bind(this, this.props.answer.id)} >
        <span className='glyphicon glyphicon-heart'></span>喜欢
        </button>
        <img id={'qrcode' + this.props.answer.id} src={SERVER_URL + "/" + this.props.answer.user.qr_code} height="80" width="80" style={style}/>
      </div>
      );
  }
});

module.exports = Answer;