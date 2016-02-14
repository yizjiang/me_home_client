var React = require('react'),
  ServerActions = require('../../actions/server_action');

var SelectItems = React.createClass({

  selectRegion: function(data){
    this.props.callback(data)
  },

  render: function() {
    var that = this;
    return (
      <div className="panelDiv">
      <div className='citylistDiv'>
        <ul>
        { this.props.list.map(function(value, index){
          var className = '';
          return(
                <div>
                <li className={'listitem ' + className} id={'li' + index}  onClick={that.selectRegion.bind(that, value)}>
                  {value}
                </li>
                </div>
               )
          })
        }
        </ul>
      </div>
      </div>
    );
  }
});

module.exports = SelectItems
