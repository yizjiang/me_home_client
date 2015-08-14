var React = require('react')

var Base = React.createClass({
  render: function(){
    return (
      <div>
         this is the <b>{this.props.name}</b>.
        <RouteHandler/>
      </div>
      )
  }
});

module.exports = Base;
