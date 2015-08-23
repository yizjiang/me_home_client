var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var HomeConstants = require('../constants/home_constants'),
    Api = require('../utils/api');
var _ = require('underscore');

// Define initial data points
var _selected = [];
var _currentList = [];
var _global_list = [];

// Method to load product data from mock API
function loadSearchData(data) {
  if(data.length > 0){
    _selected = [];
    _currentList = data;
    _global_list.push(data);
  }
}

function selectRegion(data) {
  _selected.push(data);
}
// Method to set the currently selected product variation
function setSelected(index) {
  _selected = _currentList.variants[index];
}

function panelBack() {
  _currentList = _global_list[0]; //TODO
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var SearchPanelStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getProduct: function() {
    return _currentList;
  },

  // Return selected Product
  getSelected: function(){
    return _selected;
  },

  // Emit Change event
  emitChange: function() {
    this.emit('change');
  },

  // Add change listener
  addChangeListener: function(callback) {
    this.on('change', callback);
  },

  // Remove change listener
  removeChangeListener: function(callback) {
    this.removeListener('change', callback);
  }

});

// Register callback with AppDispatcher
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var text;

  switch(action.actionType) {

    // Respond to RECEIVE_DATA action
    case HomeConstants.RECEIVE_DATA:
      loadSearchData(action.data);
      break;

    case HomeConstants.SELECT_REGION:
      selectRegion(action.data);
      break;

    case HomeConstants.PANEL_BACK:
      panelBack();
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  SearchPanelStore.emitChange();

  return true;

});

module.exports = SearchPanelStore;
