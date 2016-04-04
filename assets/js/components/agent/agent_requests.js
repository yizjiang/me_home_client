'use strict';
var React = require('react'),
  ReplyForm = require('./reply_form'),
  UserStore = require('../../stores/user_store'),
  ServerActions = require('../../actions/server_action');

var AgentRequests = React.createClass({

  handleReply: function(text) {
    ServerActions.sendDetailToCustomer(UserStore.getCurrentUser().id,
      this.props.requests[0].requests.map((r) => r.id),
      text).then((data) => {
      $('#desc').show();
    })
  },

  render: function () {
    var requests = this.props.requests
    if(requests == undefined){
      requests = [];
    }
    return (
      <div className='question_div'>
        <h3>客户问询:</h3>
          {requests.map((r) => {
            return (
              <div id={'request'}>
                <p className='property'>房源<a href={CLIENT_URL + '/#/home_detail/' + r.home_id}> {r.home_id}</a></p>
                <label className='request-item'>
                  <input type='checkbox' checked={true} value={r.id}/>
                  <span>{r.requests.map((request) => request.body)}</span>
                </label>
              </div>
             )
          })
          }
         <ReplyForm qid={0} callback={this.handleReply}/>
         <p id='desc' style={{display: 'none', width: '80px'}}> 已提交 </p>
      </div>
    );
  }
});

module.exports = AgentRequests;