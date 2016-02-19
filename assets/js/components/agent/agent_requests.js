'use strict';
var React = require('react'),
  ReplyForm = require('./reply_form'),
  UserStore = require('../../stores/user_store'),
  ServerActions = require('../../actions/server_action');

var AgentRequests = React.createClass({

  handleReply: function () {

  },

  render: function () {
    var requests = this.props.requests
    if(requests == undefined){
      requests = [];
    }

    return (
      <div className='question_div'>
        <h3>客户问询</h3>
          {requests.map((r) => {
            return (
              <div>
               <p>房源<a href={CLIENT_URL + '/#/home_detail/' + r.home_id}> {r.home_id}</a></p>
               {r.requests.map((request) => request.body)}
                <ReplyForm qid={r.home_id} callback={this.handleReply}/>
              </div>

             )
          })
          }
      </div>
    );
  }
});

module.exports = AgentRequests;