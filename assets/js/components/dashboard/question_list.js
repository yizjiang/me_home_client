var Question = require('./question.js');

var QuestionList = React.createClass({
  render: function() {
    var questionNodes = this.props.data.map(function (question) {
      return (
        <li>
        <Question text={question.text}/>
        </li>
        );
    });
    return (
      <div className="commentList">
      <h2>我的问题</h2>
        <ul>
        {questionNodes}
        </ul>
      </div>
      );
  }
});

module.exports = QuestionList;
