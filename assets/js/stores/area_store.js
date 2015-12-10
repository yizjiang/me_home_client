var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

// Define initial data points
var _areas = [];

// Method to load product data from mock API
function loadSearchData(data) {
  _areas = data
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var AreaStore = _.extend({}, EventEmitter.prototype, {

  getArea :function() {
    return _areas;
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

  switch(action.actionType) {

    case 'LOAD_AREA':
      loadSearchData(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  AreaStore.emitChange();

  return true;

});

module.exports = AreaStore;
