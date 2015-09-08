var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input,
    ServerActions = require('../../actions/server_action');

var SavedSearchList = React.createClass({

  runSearch: function(value){
     var query = [];
     $('input:checked').each(function() {
         query.push($(this).attr('value'));
     });
     ServerActions.homeSearch(JSON.parse(query[0]));     //TODO clever search
  },

  render: function() {
    var self = this;
    //TODO why not work first time go to dashboard page
    return (
      <div className="commentList">
         <h3>保存的记录</h3>
         <form>
         {this.props.list.map(function(value){
            var searchOption = JSON.parse(value.search_query);
            var label = '地区: ' + searchOption.regionValue + ' 最低价: ' + searchOption.priceMin + ' 最高价: ' + searchOption.priceMax;
            return(
                   <Input type='checkbox' label={label} value={value.search_query}/>
              )
            })}
          </form>
         <Button bsStyle='success' onClick={self.runSearch.bind(self, '123')}>执行搜索</Button>
      </div>
      );
  }
});

module.exports = SavedSearchList;