var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var _ = require('lodash');

// Define initial data points
var _filter = {elementary: 0, middle: 0, high: 0};

// Method to load product data from mock API
function setFilter(data) {
  _filter = _.merge(_filter, data);
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var FilterStore = _.extend({}, EventEmitter.prototype, {

  getFilter :function() {
    return _filter;
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

    case 'FILTER_CONDITION':
      setFilter(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  FilterStore.emitChange();

  return true;

});

module.exports = FilterStore;
