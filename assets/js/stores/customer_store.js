var AppDispatcher = require('../dispatcher/app_dispatcher'),
  EventEmitter = require('events').EventEmitter,
  //CustomerConstants = require('../constants/question_constants'),
  _ = require('lodash');

// Define initial data points
var _customers = [];                   //TODO redesign, same object, seperate agent and user

function loadQuestions(data) {
  _customers = data;
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var CustomerStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getAll: function() {
    return _customers;
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
    case "ALL_CUSTOMERS":
      loadQuestions(action.data);
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  CustomerStore.emitChange();

  return true;

});

module.exports = CustomerStore;
