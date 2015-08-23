var React = require('react'),
  Profile = require('./profile'),
  Login = require('./login'),
  ServerActions = require('../../actions/server_action'),
  UserStore = require('../../stores/user_store');

function getUser(){
  return {currentUser: UserStore.getCurrentUser()};
}

var UserPanel = React.createClass({
  getInitialState: function() {
    return getUser();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    console.log(getUser());

    this.setState(getUser());
  },

  render: function(){
    return (
      <div>
        { _.isEmpty(this.state.currentUser) ? <Login/> : <Profile currentUser= {this.state.currentUser}/>}
      </div>
      )
  }
});

module.exports = UserPanel;
