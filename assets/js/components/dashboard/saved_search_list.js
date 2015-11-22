var Button = require('react-bootstrap').Button;
var Input = require('react-bootstrap').Input,
    ServerActions = require('../../actions/server_action'),
    _ = require('lodash');

var SavedSearchList = React.createClass({

  runSearch: function(id){
     var query = [];
     $('.selectedItem').each(function() {
         query.push($(this).attr('value'));
     });
     if(this.props.callback){ //TODO clever search
       this.props.callback(query, id);
     } else {
       query = query.map(function(value){
         return JSON.parse(value)
       })

       ServerActions.homeSearches(query);  //TODO search all
     }
  },

  selectVariant: function(value, index){
    $('#' + index).toggleClass('selectedItem');
  },

  removeSearch: function(value){
    var removedList = this.props.list
    _.remove(removedList, (data) => {
                        return data.id == value.id;
                      });
    ServerActions.removeSearch(value.id, removedList)
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
            if(searchOption.bedNum != undefined){
              label += ' 房间数: ' + searchOption.bedNum
            }
            if(searchOption.home_type != undefined){
              var homeType;
              homeType = searchOption.home_type.map((value) => {
                if(value == 'Single Family Home'){
                   return '独栋别墅'
                }else if(value == 'Multi-Family Home'){
                   return '复合别墅'
                }
                else {
                   return '联排别墅/公寓'
                }

              })
              label += ' 房型: ' +  homeType.join();
            }

            var checked = _.findIndex(self.props.selected, function(search){
              return search.regionValue == searchOption.regionValue && search.priceMin == searchOption.priceMin && search.priceMax == searchOption.priceMax
            })
            index = index+1;
            return(
                   <div>
                   <li className={'listitem'} id={index} value={value.search_query} onClick={self.selectVariant.bind(self, value.search_query, index)}>
                      {label}
                   </li>
                    <button onClick={self.removeSearch.bind(self, value)} >删除</button>
                   </div>
              )
            })}
          </form>
         <Button id='savedListBtn' bsStyle='success' onClick={self.runSearch.bind(self, 'savedListBtn')}>执行搜索</Button>
      </div>
      );
  }
});

module.exports = SavedSearchList;