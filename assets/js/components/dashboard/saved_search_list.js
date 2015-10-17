var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input,
    ServerActions = require('../../actions/server_action'),
    _ = require('lodash');

var SavedSearchList = React.createClass({

  runSearch: function(value){
     var query = [];
     $('.selected').each(function() {
         query.push($(this).attr('value'));
     });
     if(this.props.callback){ //TODO clever search
       this.props.callback(query);
     } else {
       query = query.map(function(value){
         return JSON.parse(value)
       })

       ServerActions.homeSearches(query);  //TODO search all
     }
  },

  selectVariant: function(value, index){
    $('#' + index).toggleClass('selected');
  },

  render: function() {
    var self = this;
    var index = 0;
    //TODO why not work first time go to dashboard page
    return (
      <div className={"commentList " + this.props.className}>
         <h3>保存的记录</h3>
         <form>
         {this.props.list.map(function(value){

            var searchOption = JSON.parse(value.search_query);
            var label = '地区: ' + searchOption.regionValue + ' 最低价: ' + searchOption.priceMin + ' 最高价: ' + searchOption.priceMax;
            var checked = _.findIndex(self.props.selected, function(search){
              return search.regionValue == searchOption.regionValue && search.priceMin == searchOption.priceMin && search.priceMax == searchOption.priceMax
            })
            index = index+1;
            return(
                   <li className={'listitem'} id={index} value={value.search_query} onClick={self.selectVariant.bind(self, value.search_query, index)}>
                      {label}
                    </li>
              )
            })}
          </form>
         <Button bsStyle='success' onClick={self.runSearch.bind(self, '123')}>执行搜索</Button>
      </div>
      );
  }
});

module.exports = SavedSearchList;