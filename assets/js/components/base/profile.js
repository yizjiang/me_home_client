
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
        <p>Welcome</p>
        <button id='login' type="button" onClick={this.logout} className='nobutton'>退 出</button>
      </div>
      )
  }
});

module.exports = Profile;
