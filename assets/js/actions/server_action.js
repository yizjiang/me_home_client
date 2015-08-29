var AppDispatcher = require('../dispatcher/app_dispatcher');
var HomeConstants = require('../constants/home_constants');
var UserConstants = require('../constants/user_constants');

// Define action methods
var ServerActions = {

  fetchRegionRanking: function(data) {
    AppDispatcher.handleAction({
      actionType: HomeConstants.SELECT_REGION,
      data: data.region
    });

    $.ajax({
      url: '/regionSearch',

      type: 'GET',

      dataType: 'json',

      data: data,

      success: function(data) {
        AppDispatcher.handleAction({
          actionType: HomeConstants.RECEIVE_DATA,
          data: data
        })
      },

      error: function() {
        AppDispatcher.handleAction({
          actionType: HomeConstants.RECEIVE_DATA,
          data: []
        })
      }
    });
  },

  panelBack: function() {
    AppDispatcher.handleAction({
      actionType: HomeConstants.PANEL_BACK,
    })
  },

  submitQuestion: function(question, user) {
    $.ajax({
      url: '/submitQuestion',
      headers: {
        'USER_ID': user.id
      },
      type: 'POST',

      dataType: 'json',

      data: JSON.stringify(question),              //TODO

      success: function(data) {
        console.log(data.questions);
        AppDispatcher.handleAction({
          actionType: UserConstants.SUBMIT_QUESTION,
          data: data.questions
        })
      },

      error: function() {
//        AppDispatcher.handleAction({
//          actionType: UserConstants.SAVED_SEARCH,
//          data: query
//        })
      }
    });
  },

  saveUserSearch: function(query, user) {
    $.ajax({
      url: '/saveSearch',
      headers: {
       'USER_ID': user.id
      },
      type: 'POST',

      dataType: 'json',

      data: JSON.stringify(query),              //TODO

      success: function(data) {
        AppDispatcher.handleAction({
          actionType: UserConstants.SAVED_SEARCH,
          data: data
        })
      },

      error: function() {
        AppDispatcher.handleAction({
          actionType: UserConstants.SAVED_SEARCH,
          data: query
        })
      }
    });
  },

  homeSearch: function(query) {
    $.ajax({
      url: '/homeSearch',

      type: 'GET',

      dataType: 'json',

      data: query,              //TODO

      success: function(data) {
        AppDispatcher.handleAction({
          actionType: HomeConstants.HOME_SEARCH,
          data: data
        })
      },

      error: function() {
        AppDispatcher.handleAction({
          actionType: HomeConstants.HOME_SEARCH,
          data: query
        })
      }
    });
  },

  logout: function() {
    $.ajax({
      url: '/clear',

      type: 'GET',

      dataType: 'json',

      data: {},

      success: function() {
        AppDispatcher.handleAction({
          actionType: 'USER_LOGIN',
          data: {}
        })
      },

      error: function() {
        AppDispatcher.handleAction({
          actionType: 'USER_LOGIN',
          data: {}
        })
      }
    });
  },

  getCurrentUser: function() {
    $.ajax({
      url: '/user',

      type: 'GET',

      dataType: 'json',

      data: {},

      success: function(data) {
        AppDispatcher.handleAction({
          actionType: 'USER_LOGIN',
          data: data
        })
      },

      error: function() {
        AppDispatcher.handleAction({
          actionType: 'USER_LOGIN',
          data: {}
        })
      }
    });
  },

  // Add item to cart
  addToCart: function(sku, update) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.CART_ADD,
      sku: sku,
      update: update
    })
  },

  // Remove item from cart
  removeFromCart: function(sku) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.CART_REMOVE,
      sku: sku
    })
  },

  // Update cart visibility status
  updateCartVisible: function(cartVisible) {
    AppDispatcher.handleAction({
      actionType: FluxCartConstants.CART_VISIBLE,
      cartVisible: cartVisible
    })
  }

};

module.exports = ServerActions;
