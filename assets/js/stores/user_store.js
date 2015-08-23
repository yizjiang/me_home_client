var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var Api = require('../utils/api');
var _ = require('underscore');

// Extend ProductStore with EventEmitter to add eventing capabilities
var _currentUser;

function setCurrentUser(user) {
  _currentUser = user
}

var UserStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getCurrentUser: function() {
    return _currentUser;
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
    case 'USER_LOGIN':
      setCurrentUser(action.data);
      break;

    default:
      return true;
  }

  // If action was responded to, emit change event
  UserStore.emitChange();

  return true;

});

module.exports = UserStore;
