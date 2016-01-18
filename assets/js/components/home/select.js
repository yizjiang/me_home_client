var React = require('react');
var Imm = require('immutable');
var classNames = require('classnames');
var RawSelect = require('react-select');


var Select = React.createClass({

  handleChange: function(_, options) {
    console.log(options);
    this.props.change(options);
  },

  render: function() {
    var options = this.props.options.map((tag) => {return {value: tag.split(',')[0], label: tag}} );
    return (
      <RawSelect
      placeholder='城市或邮编'
      options={options}
      onChange={this.handleChange}
      multi={true}
      />
      );
  }
});

module.exports = Select;
