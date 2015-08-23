var React = require('react'),
    ServerActions = require('../../actions/server_action'),
    SelectItems = require('./select_items.js'),
    SearchPanelStore = require('../../stores/search_panel_store');

function getSearchData() {
  return {
    search_list: SearchPanelStore.getProduct(),
    selected: SearchPanelStore.getSelected()
  };
}

var SelectPanel = React.createClass({

  getInitialState: function() {
    return getSearchData();
  },

  // Add change listeners to stores
  componentDidMount: function() {
    SearchPanelStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    SearchPanelStore.addChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState(getSearchData());
  },

  homeSearch: function() {
    ServerActions.homeSearch({regionValue: this.state.selected.join(',')});
  },

  selectPanelBack: function(){
    ServerActions.panelBack();
  },

  render: function() {
    return (
      <div>
        <SelectItems search_options={this.state.search_list} selected_list={this.state.selected}  />
        <button type="button" onClick={this.selectPanelBack} >Back</button>
        <button type="button" onClick={this.homeSearch} >Search </button>
    </div>
     );
  }
});

module.exports = SelectPanel