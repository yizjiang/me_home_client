var AppDispatcher = require('../dispatcher/app_dispatcher'),
  EventEmitter = require('events').EventEmitter,
  QuestionConstants = require('../constants/question_constants'),
   _ = require('lodash');

// Define initial data points
var _questions = [];                   //TODO redesign, same object, seperate agent and user
var _user_questions = [];

// Method to load product data from mock API
function remove_question(qid) {
  _.remove(_questions, function(n) {
    return n.id == qid;
  });
}

function loadQuestions(data) {
  _questions = data;
}

// Extend ProductStore with EventEmitter to add eventing capabilities
var QuestionStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getAll: function() {
    return _questions;
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
    case QuestionConstants.RECEIVE_DATA:
      loadQuestions(action.data);
      break;
    case QuestionConstants.REPLY_POST:
      remove_question(action.data.id);
      break;
    default:
      return true;
  }

  // If action was responded to, emit change event
  QuestionStore.emitChange();

  return true;

});

module.exports = QuestionStore;
