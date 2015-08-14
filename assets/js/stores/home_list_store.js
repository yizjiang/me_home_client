var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var HomeConstants = require('../constants/home_constants'),
  Api = require('../utils/api');
var _ = require('underscore');

// Define initial data points
var _homes = [];

// Method to load product data from mock API
function loadSearchData(data) {
  _homes = data;
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var HomeListStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getProduct: function() {
    return _homes;
  },

  getHomeById: function(id) {
    return _homes.filter(function(v){return v.id==id})[0];
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

    // Respond to RECEIVE_DATA action
    case HomeConstants.HOME_SEARCH:
      loadSearchData(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  HomeListStore.emitChange();

  return true;

});

module.exports = HomeListStore;
