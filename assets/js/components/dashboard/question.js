var Question = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <p className='questionPara'>{this.props.text}</p>
      </div>
      );
  }
});

module.exports = Question;