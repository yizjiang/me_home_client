var AppDispatcher = require('../dispatcher/app_dispatcher'),
  EventEmitter = require('events').EventEmitter,
  _ = require('lodash');

// Define initial data points
var _agentRequests = [];                   //TODO redesign, same object, seperate agent and user

function loadData(data) {
  _agentRequests = data;
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var AgentRequestStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getAll: function() {
    return _agentRequests;
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
    case "ALL_REQUESTS":
      loadData(action.data);
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  AgentRequestStore.emitChange();

  return true;

});

module.exports = AgentRequestStore;
