var ServerActions = require('../../actions/server_action');

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
      returnObj = {};
      returnObj[this.target.id] = this.target.value;
      return returnObj;
    }.bind(event)();
    this.setState( stateObject );
    // ES6: this.setState({ [event.target.id]: event.target.value });
  },

  homeSearch: function() {
    ServerActions.homeSearch(this.state);
  },

  render: function() {
    return (
      <div>
        <input id='regionValue' value={this.state.regionValue} onChange={this.handleFilterChange} placeholder="城市 邮编"/>
        <input id='priceMin' value={this.state.priceMin} onChange={this.handleFilterChange} placeholder="10万"/>
        <input id='priceMax' value={this.state.priceMax} onChange={this.handleFilterChange} placeholder="10万"/>
        <button id='search' type="button" onClick={this.homeSearch} >Search</button>
      </div>
      );
  }
});

module.exports = SearchBox