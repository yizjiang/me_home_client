var ServerActions = require('../actions/server_action');

module.exports = {

  // Load mock product data from localStorage into ProductStore via Action
  getSearchPanelData: function(root) {
    var data;
    if(root == true) {
      data = ['SF bay Area', 'New York'];
    } else {
      data = ['Foster City', 'Redwood City', 'Palo Alto'];
    }
    return data;
  }

};