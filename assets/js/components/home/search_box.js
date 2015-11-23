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
        <div className='btn_group'><input id='regionValue' value={this.state.regionValue} onChange={this.handleFilterChange} placeholder="请输入要搜索的城市或邮编，例如旧金山"/>
        <button id='search' type="button" onClick={this.homeSearch} ><a href='#homelistAnchor'><span className='glyphicon glyphicon-search'></span></a></button>
        <button id='saveSearch' type="button" onClick={this.saveSearch} ><span className='glyphicon glyphicon-star'></span></button>
        </div><br/>
        <input id='priceMin' className='pricebox' value={this.state.priceMin} onChange={this.handleFilterChange} placeholder="例如10万"/>
        <p>到</p>
        <input id='priceMax' className='pricebox' value={this.state.priceMax} onChange={this.handleFilterChange} placeholder="例如10万"/>
      </div>
      );
  }
});

module.exports = SearchBox