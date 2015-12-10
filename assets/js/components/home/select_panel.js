var React = require('react'),
    ServerActions = require('../../actions/server_action'),
    AreaStore = require('../../stores/area_store'),
    SelectItems = require('./select_items.js');

var SelectPanel = React.createClass({

  selectVariant132: function() {
    console.log('hera');
//    $('#region'+index).toggleClass('select');
//    var areas = [];
//    $('.select').each(function () {
//      areas.push($(this).text());
//    });
    this.props.callback(data);
  },

  render: function() {
    return null
  }
});

module.exports = SelectPanel