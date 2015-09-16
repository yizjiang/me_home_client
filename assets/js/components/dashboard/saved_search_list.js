var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input,
    ServerActions = require('../../actions/server_action'),
    _ = require('lodash');

var SavedSearchList = React.createClass({

  runSearch: function(value){
     var query = [];
     $('input:checked').each(function() {
         query.push($(this).attr('value'));
     });
     if(this.props.callback){ //TODO clever search
       this.props.callback(query);
     } else {
       ServerActions.homeSearch(JSON.parse(query[0]));
     }
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
            var checked = _.findIndex(self.props.selected, function(search){
              return search.regionValue == searchOption.regionValue && search.priceMin == searchOption.priceMin && search.priceMax == searchOption.priceMax
            })
            return(
                   <Input type='checkbox' checked={checked != -1} label={label} value={value.search_query}/>
              )
            })}
          </form>
         <Button bsStyle='success' onClick={self.runSearch.bind(self, '123')}>执行搜索</Button>
      </div>
      );
  }
});

module.exports = SavedSearchList;