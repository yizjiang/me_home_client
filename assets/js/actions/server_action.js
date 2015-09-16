var AppDispatcher = require('../dispatcher/app_dispatcher');
var HomeConstants = require('../constants/home_constants');
var UserConstants = require('../constants/user_constants');
var QuestionConstants = require('../constants/question_constants');
var AgentConstants = require('../constants/agent_constants');

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

  removeFavorite: function(home_id, user) {
    $.ajax({
      url: '/unfavoriteHome',
      headers: {
        'USER_ID': user.id
      },
      type: 'POST',

      dataType: 'json',

      data: JSON.stringify({home_id: home_id}),

      success: function(data) {
        AppDispatcher.handleAction({
          actionType: UserConstants.FAVORITE_HOME,
          data: data
        })
      },

      error: function() {
        AppDispatcher.handleAction({
          actionType: UserConstants.FAVORITE_HOME,
          data: data
        })
      }
    });
  },

  addFavorite: function(home_id, user) {
    $.ajax({
      url: '/favoriteHome',
      headers: {
        'USER_ID': user.id
      },
      type: 'POST',

      dataType: 'json',

      data: JSON.stringify({home_id: home_id}),

      success: function(data) {
        AppDispatcher.handleAction({
          actionType: UserConstants.FAVORITE_HOME,
          data: data
        })
      },

      error: function() {
        AppDispatcher.handleAction({
          actionType: UserConstants.FAVORITE_HOME,
          data: data
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

  getAllQuestions: function(user) {
    $.ajax({
      url: '/questions',
      headers: {
        'USER_ID': user.id
      },
      type: 'GET',

      dataType: 'json',

      data: {},

      success: function(data) {
        AppDispatcher.handleAction({
          actionType: QuestionConstants.RECEIVE_DATA,
          data: data
        })
      },

      error: function() {
        AppDispatcher.handleAction({
          actionType: QuestionConstants.RECEIVE_DATA,
          data: []
        })
      }
    });
  },

  getAgentPage: function(user) {
    $.ajax({
      url: '/agent/' + user.agent_identifier + '/page',
      type: 'GET',

      dataType: 'json',

      data: {},

      success: function(data) {
        AppDispatcher.handleAction({
          actionType: UserConstants.PUBLISH_PAGE,
          data: data
        })
      },

      error: function() {

      }
    });
  },

  savePageConfig: function(user, value) {
    $.ajax({
      url: '/save_page_config',

      headers: {
        'USER_ID': user.id
      },

      type: 'post',

      dataType: 'json',

      data: JSON.stringify(value),

      success: function(data) {
        AppDispatcher.handleAction({
          actionType: UserConstants.PUBLISH_PAGE,
          data: data
        })
      },

      error: function() {
//        AppDispatcher.handleAction({
//          actionType: QuestionConstants.REPLY_POST,
//          data: []
//        })
      }
    });
  },

  replyQuestion: function(answer, user) {
    $.ajax({
      url: '/post_answer',

      headers: {
        'USER_ID': user.id
      },

      type: 'post',

      dataType: 'json',

      data: JSON.stringify(answer),

      success: function(data) {
        console.log(data);
        AppDispatcher.handleAction({
          actionType: QuestionConstants.REPLY_POST,
          data: data
        })
      },

      error: function() {
        AppDispatcher.handleAction({
          actionType: QuestionConstants.REPLY_POST,
          data: []
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
    var self = this;
    return $.ajax({
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
        console.log('error when getting user');
      }
    });
  }


};

module.exports = ServerActions;
