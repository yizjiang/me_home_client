var Question = React.createClass({
  render: function() {
    return (
      <div className="comment">
        <p>{this.props.text}</p>
      </div>
      );
  }
});

module.exports = Question;