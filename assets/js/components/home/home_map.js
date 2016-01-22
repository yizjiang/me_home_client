var React = require('react'),
  BingMap = require('./bing_map'),
  StatusBar = require('./status_bar');

var HomeMap = React.createClass({
  render: function () {
    return (
      <div className='searchresult_div'>
        <StatusBar {...this.props} />
        <BingMap home_info={this.props.home_infos} show_details={true}/>
      </div>
    );
  }
});

module.exports = HomeMap
