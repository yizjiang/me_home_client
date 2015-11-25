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
        'uid': user.id
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
       'uid': user.id
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

  removeSearch: function(id, list) {
    console.log(list);
    $.ajax({
      url: '/removeSearch/' + id,
      type: 'DELETE',
      success: function() {
        AppDispatcher.handleAction({
          actionType: UserConstants.SAVED_SEARCH,
          data: {saved_searches: list}
        })
      }
    });
  },

  removeFavorite: function(home_id, user) {
    $.ajax({
      url: '/unfavoriteHome',
      headers: {
        'uid': user.id
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
        'uid': user.id
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

  homeSearches: function(query){
    console.log(query);

    $.ajax({
      url: '/homeSearch',

      type: 'GET',

      dataType: 'json',

      data: query[0],              //TODO


      success: function(data) {
        AppDispatcher.handleAction({
          actionType: HomeConstants.HOME_SEARCH,
          data: data
        })
      },

      error: function() {
        AppDispatcher.handleAction({
          actionType: HomeConstants.HOME_SEARCH,
          data: []
        })
      }
    });
  },

  homeSearch: function(query) {

    AppDispatcher.handleAction({
      actionType: HomeConstants.HOME_SEARCH,
      data: []
    });

    return $.ajax({
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
          data: []
        })
      }
    });
  },

  getAllQuestions: function(user) {
    $.ajax({
      url: '/questions',
      headers: {
        'uid': user.id
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

  connectCustomer: function (request_id, user){
    $.ajax({
      url: '/customers/connect',

      headers: {
        'uid': user.id
      },

      type: 'post',

      dataType: 'json',

      data: JSON.stringify({rid: request_id}),

      success: function(data) {
        console.log(data)
      },

      error: function() {
//        AppDispatcher.handleAction({
//          actionType: QuestionConstants.REPLY_POST,
//          data: []
//        })
      }
    });
  },

  saveCustomerSearch: function (value){
    return $.ajax({
      url: '/agent/save_customer_search',

      type: 'post',

      dataType: 'json',

      data: JSON.stringify(value),

      success: function(data) {
        console.log(data)
      },

      error: function() {
//        AppDispatcher.handleAction({
//          actionType: QuestionConstants.REPLY_POST,
//          data: []
//        })
      }
    });
  },

  getAllCustomers: function (user){
    console.log('here');
    $.ajax({
      url: '/agent/' + user.id + '/customers',
      type: 'GET',

      dataType: 'json',

      success: function(data) {
        console.log(data);
        AppDispatcher.handleAction({
          actionType: 'ALL_CUSTOMERS',
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
    return $.ajax({
      url: '/save_page_config',

      headers: {
        'uid': user.id
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
        'uid': user.id
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

  getCurrentUser: function(ticket) {
    var self = this;

    var url;
    if(ticket){
      url = '/user?' + 'ticket=' + ticket
    } else {
      url = '/user'
    }
    return $.ajax({
      url: url,

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

  uploadFile: function(file, user) {
    console.log(file);
    var data = new FormData();
    data.append( 'file', file);

    console.log(data);
    var self = this;
    return $.ajax({
      url: '/agent/upload_qrcode',

      type: 'post',

      headers: {
        'uid': user.id
      },
      data: data,
      enctype: 'multipart/form-data',
      processData: false,  // tell jQuery not to process the data
      contentType: false,   // tell jQuery not to set contentType

      success: function(data) {
        console.log(data);
      },

      error: function() {
        console.log('error when getting user');
      }
    });
  }

};

module.exports = ServerActions;
