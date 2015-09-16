var React = require('react')

var Login = React.createClass({
  getInitialState: function() {
    return {
      username: '',
      password: ''
    };
  },

  handleFilterChange: function(event) {
    var stateObject = function() {
      returnObj = {};
      returnObj[this.target.id] = this.target.value;
      return returnObj;
    }.bind(event)();
    this.setState( stateObject );
    //TODO ES6: this.setState({ [event.target.id]: event.target.value });
  },

  login: function() {
    window.location.href = SERVER_URL + '/users/login';
  },

  render: function(){
    return (
      <div>
      {/*
        <a href={SERVER_URL + '/users/auth/facebook'}><img src={'/img/facebook.jpeg'} height='30' width='30'></img></a>
        <input id='username' value={this.state.username} onChange={this.handleFilterChange} placeholder='用户名'/>
        <input id='password' value={this.state.password} onChange={this.handleFilterChange} placeholder='密码'/>
      */}
        <button id='login' type="button" onClick={this.login} >登陆</button>
      </div>
      )
  }
});

module.exports = Login;
