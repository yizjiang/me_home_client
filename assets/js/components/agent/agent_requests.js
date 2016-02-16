'use strict';
var React = require('react'),
  ReplyForm = require('./reply_form'),
  UserStore = require('../../stores/user_store'),
  ServerActions = require('../../actions/server_action');

var AgentRequests = React.createClass({

  render: function () {
    return (
      <div className='question_div'>
        <h3>经纪人需求</h3>
        <ul>
          {this.props.requests.map((r) => {
            return (<li>
                     {r.body}
                      <ReplyForm/>
                    </li>
                   )
          })
          }
        </ul>
      </div>
    );
  }
});

module.exports = AgentRequests;