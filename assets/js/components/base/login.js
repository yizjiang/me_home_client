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
//    var auth_window = window.open(SERVER_URL + '/users/login', null, "width=400,height=250");
//    window.auth_window = auth_window;
//    window.auth_callback = this.auth_back;
  },

  auth_back: function() {
    console.log('here')
  },

  render: function(){
    return (
      <div>
        <button id='login' type="button" onClick={this.login} className='nobutton'>登 陆</button>
      </div>
      )
  }
});

module.exports = Login;
