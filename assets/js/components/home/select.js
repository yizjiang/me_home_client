var React = require('react');
var Imm = require('immutable');
var classNames = require('classnames');
var RawSelect = require('react-select');


var Select = React.createClass({

  handleChange: function(_, options) {
    this.props.change(options);
  },

  render: function() {
    var {options, selected} = this.props;

    if(options == undefined){
      options = []
    }
    if(selected == undefined) {
      selected = [];
    }

    var options = options.map((tag) => {return {value: tag.split(',')[0], label: tag}} );
    var selected = selected.map((tag) => {return {value: tag.split(',')[0], label: tag}} );

    return (
      <RawSelect
      value={selected}
      placeholder='城市或邮编'
      options={options}
      onChange={this.handleChange}
      multi={true}
      />
      );
  }
});

module.exports = Select;
