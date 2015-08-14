var React = require('react'),
  ServerActions = require('../../actions/server_action');

var SelectItems = React.createClass({

  getInitialState: function() {
    return {
      filterValue: '',
      sortBy: 'name'
    };
  },

  selectVariant: function(value){
    ServerActions.fetchRegionRanking({region: value});
  },

  render: function() {
    var that = this;
    return (
      <div>
        <ul>
        { this.props.search_options.map(function(value){
          return(
            <li id={'li' + value} onClick={that.selectVariant.bind(that, value)}>{value}</li>
      )
      })
      }
      </ul>
        </div>
    );
  }
});

module.exports = SelectItems