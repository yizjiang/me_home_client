'use strict';
var React = require('react'),
  QuestionStore = require('../../stores/question_store'),
  ReplyForm = require('./reply_form'),
  UserStore = require('../../stores/user_store'),
  ServerActions = require('../../actions/server_action');

var Questions = React.createClass({

  getInitialState: function() {
    return {questions:[]}
  },

  _onChange: function() {
    this.setState({questions: QuestionStore.getAll()});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    QuestionStore.addChangeListener(this._onChange);
    ServerActions.getAllQuestions(UserStore.getCurrentUser());
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    QuestionStore.removeChangeListener(this._onChange);
  },

  replyQuestion: function(qid, answer) {
    ServerActions.replyQuestion({text: answer, qid: qid}, UserStore.getCurrentUser());
  },

  render: function () {

    var self = this;
    return (
      <div className='question_div'>
        <h3>客户问题</h3>
        <ul>
      {this.state.questions.map(function(q){
        return (<li>
                {q.text}
                <ReplyForm qid={q.id} callback={self.replyQuestion.bind(self, q.id)}/>
                </li>)
      })
      }
        </ul>
      </div>
      );
  }
});

module.exports = Questions;