var React = require('react');
var Imm = require('immutable');
var classNames = require('classnames');
var RawSelect = require('react-select');


var Select = React.createClass({

  handleChange: function(_, options) {
    console.log(options);
  },

  render: function() {
//    var { optionMapper, options, value, multi } = this.props;

      var options = this.props.options.map((tag) => {return {value: tag, label: tag}}  );
//    value = value.map(optionMapper).toArray();

    return (
      <RawSelect
      options={options}
      onChange={this.handleChange}
      multi={true}
      />
      );
  }
});

module.exports = Select;
