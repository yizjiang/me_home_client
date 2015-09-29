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
      <div className="panelDiv">
        <SelectItems search_options={this.state.search_list} selected_list={this.state.selected}  />
        <button type="button" id='backbtn' className='btngroup' onClick={this.selectPanelBack} >后 退</button>
        <button type="button" id='choosebtn' className='btngroup' onClick={this.homeSearch} ><a href='#homelistAnchor'>查 看</a></button>
    </div>
     );
  }
});

module.exports = SelectPanel