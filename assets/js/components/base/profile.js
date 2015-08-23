var React = require('react'),
  ServerActions = require('../../actions/server_action');


var Profile = React.createClass({
  getInitialState: function() {
    return {};
  },

  logout: function() {
    window.location.href = '/clear'
  },

  render: function(){
    return (
      <div>
         <p> welcome { this.props.currentUser.email } </p>
        <button id='login' type="button" onClick={this.logout} >退出</button>
      </div>
      )
  }
});

module.exports = Profile;
