var ServerActions = require('../../actions/server_action'),
  UserStore = require('../../stores/user_store');

var SearchBox = React.createClass({

  getInitialState: function() {
    return {
      regionValue: '',
      priceMin: '',
      priceMax: ''
    };
  },

  handleFilterChange: function(event) {
    var stateObject = function() {
      var returnObj = {};
      returnObj[this.target.id] = this.target.value;
      return returnObj;
    }.bind(event)();
    this.setState( stateObject );
    //TODO ES6: this.setState({ [event.target.id]: event.target.value });
  },

  homeSearch: function() {
    ServerActions.homeSearch(this.state);
  },

  saveSearch: function() {
    ServerActions.saveUserSearch(this.state, UserStore.getCurrentUser());    //TODO login first
  },

  render: function() {
    return (
      <div className='searchDiv'>
        <input id='regionValue' value={this.state.regionValue} onChange={this.handleFilterChange} placeholder="请输入想要搜索的城市或者邮编"/><br/>
        <input id='priceMin' className='pricebox' value={this.state.priceMin} onChange={this.handleFilterChange} placeholder="例如10万"/>
        <p>到</p>
        <input id='priceMax' className='pricebox' value={this.state.priceMax} onChange={this.handleFilterChange} placeholder="例如10万"/>
        <button id='search' type="button" onClick={this.homeSearch} ><a href='#homelistAnchor'>觅 家</a></button>
        <button id='saveSearch' type="button" onClick={this.saveSearch} >保存</button>
      </div>
      );
  }
});

module.exports = SearchBox