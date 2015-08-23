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
    console.log(this.props.selected_list);
    return (
      <div>
        <ul>
        { this.props.search_options.map(function(value, index){
          var className = '';
          if(_.include(that.props.selected_list, value)){
            className = 'select'
          }

          return(
            <li className={className} id={'li' + that.props.level + index} onClick={that.selectVariant.bind(that, value)}>{value}</li>
      )
      })
      }
      </ul>
        </div>
    );
  }
});

module.exports = SelectItems
