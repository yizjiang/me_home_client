
var React = require('react'),
  ServerActions = require('../../actions/server_action');


var Profile = React.createClass({
  getInitialState: function() {
    return {};
  },

  logout: function() {
    //window.location.href = SERVER_URL + '/users/login';
    var auth_window = window.open( '/clear', null, "width=400,height=250");
    window.auth_window = auth_window;
    window.auth_callback = this.auth_back;
  },

  auth_back: function(ticket) {
    console.log('logout');
    ServerActions.getCurrentUser(ticket);
    window.auth_window.close();
  },

  render: function(){
    
    return (
      <div>
        <p>Welcome {this.props.currentUser.username}</p>
        <button id='login' type="button" onClick={this.logout} className='nobutton'>退 出</button>
      </div>
      )
  }
});

module.exports = Profile;
