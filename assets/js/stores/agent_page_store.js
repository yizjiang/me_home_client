var AppDispatcher = require('../dispatcher/app_dispatcher'),
  EventEmitter = require('events').EventEmitter,
  AgentConstants = require('../constants/agent_constants'),
  _ = require('lodash');

// Define initial data points
var _page_data = {};

function loadQuestions(data) {
  _page_data = data;
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var AgentPageStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getAgentPublishedPage: function() {
    return _page_data;
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
    case AgentConstants.AGENT_DATA:
      console.log('agent receive data');
      loadQuestions(action.data);
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  AgentPageStore.emitChange();

  return true;

});

module.exports = AgentPageStore;
