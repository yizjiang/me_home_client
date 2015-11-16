var AppDispatcher = require('../dispatcher/app_dispatcher');
var EventEmitter = require('events').EventEmitter;
var Api = require('../utils/api');
var _ = require('underscore');
var UserConstants = require('../constants/user_constants');

// Extend ProductStore with EventEmitter to add eventing capabilities
var _currentUser = {};
var _questions = [];
var _savedSearches = [];
var _favoriteHomes = [];
var _publishedPageConfig = {};
var _publishedPage = {};
var _qrImage = {};
var _qrCode = '';

function setCurrentUser(user) {
  _currentUser = user;
  _questions = user.questions;
  _savedSearches = user.saved_searches;
  _favoriteHomes = user.homes;
  _publishedPageConfig = user.published_page_config;
  _qrImage = user.qr_image;
  _qrCode = user.qr_code
}

function setSavedSearch(savedSearches) {
  _savedSearches = savedSearches
}

function setPublishedPageConfig(result) {
  _publishedPageConfig = result
}

function setQRImage(img) {
  _qrImage = img
}

function setPublishedPage(result) {
  _publishedPage = result
}

function setFavorites(favorites) {
  _favoriteHomes = favorites
}

function setQuestions(questions) {
  _questions = questions
}

var UserStore = _.extend({}, EventEmitter.prototype, {

  // Return Product data
  getCurrentUser: function() {
    return _currentUser;
  },

  getAgentPublishedPageConfig: function() {
    return _publishedPageConfig;
  },

  getQRImage: function() {
    return _qrImage;
  },

  getQRCode: function() {
    return _qrCode;
  },

  getAgentPublishedPage: function() {
    return _publishedPage;
  },

  getQuestions: function() {
    return _questions;
  },

  getSavedSearches: function() {
    return _savedSearches;
  },

  getFavoriteHomes: function() {
    return _favoriteHomes;
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
    case UserConstants.SAVED_SEARCH:
      setSavedSearch(action.data.saved_searches);
      break;
    case UserConstants.FAVORITE_HOME:
      setFavorites(action.data.homes);
      break;
    case UserConstants.SUBMIT_QUESTION:
      setQuestions(action.data);
      break;
    case UserConstants.PUBLISH_PAGE_CONFIG:
      setPublishedPageConfig(action.data);
      break;
    case UserConstants.PUBLISH_PAGE:
      setPublishedPage(action.data);
      break;
    default:
      return true;
  }

  console.log('emit');
  // If action was responded to, emit change event
  UserStore.emitChange();

  return true;

});

module.exports = UserStore;
