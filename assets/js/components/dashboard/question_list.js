var Question = require('./question.js'),
  Answer = require('./answer.js');

var QuestionList = React.createClass({

  render: function() {
    var questionNodes = this.props.data.map(function (question) {
      if(question.answers == undefined){
        question.answers = [];
      }
      return (
        <li>
        <Question text={question.text}/>
                  {question.answers.map(function(answer){
                    return <Answer answer={answer}/>
                  })}
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
