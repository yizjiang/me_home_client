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
         var search = JSON.parse(value);
         return search
       })
       if(!_.isEmpty(query[0])){
         ServerActions.homeSearches(query[0]);  //TODO search all
       }
     }
  },

  selectVariant: function(value, index){
    $('.listitem').each(function() {
      $(this).removeClass('selectedItem');
    });
    $('#' + index).addClass('selectedItem');
    $("#savedListBtn").removeClass('btn-warning').addClass('btn-success').text('执行搜索');
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
    var defaultText = undefined;
    var defaultButton = <Button id='savedListBtn' bsStyle='warning' onClick={self.runSearch.bind(self, 'savedListBtn')}>请选择记录</Button>
    if(this.props.list.length == 0){
      defaultText =  <p>还没有查询记录，请返回首页查询后再来</p>;
      defaultButton = <Button bsStyle='success' href={CLIENT_URL} >前去搜索页面</Button>
    }

    //TODO why not work first time go to dashboard page
    return (
      <div className={"commentList " + this.props.className}>
         <h3>我的查询记录</h3>
         {defaultText}
         <form>
         {this.props.list.map(function(value){
            var searchOption = JSON.parse(value.search_query);

            for (var k in searchOption) {
              if (!searchOption.hasOwnProperty(k)) continue;
              if (searchOption[k] == undefined) {
                searchOption[k] = '';
              }
            }

            var label = '地区: ' + searchOption.regionValue;

            if(searchOption.priceMin != undefined){
              label += ' 最低价: ' + searchOption.priceMin + '万 '
            }

            if(searchOption.priceMin != undefined){
              label += '最高价: ' + searchOption.priceMax + '万 '
            }

            if(searchOption.bedNum != undefined){
              label += ' 房间数: ' + searchOption.bedNum
            }

            if(searchOption.home_type != undefined){
              var homeType;
              homeType = searchOption.home_type.map((value) => {
                if(value == 'Single Family Home'){
                   return '独栋别墅'
                }else if(value == 'Townhouse'){
                   return '联排别墅'
                }
                else if(value == 'Duplex' || value == 'Triplex' || value == 'Fourplex'){
                                   return '复合别墅'
                                }
                else if(value == 'Apartment' || value == 'Condominium'){
                                  return '公寓'
                               }
                else if(value == 'Residential Land' || value == 'Residential Lot' || value == 'Land'){
                                  return '土地'
                               }
                else {
                   return '其他'
                }

              })
              label += ' 房型: ' +  homeType.join();
            }

            if(searchOption.home_age != undefined){
              label += ' 建造于: ' + searchOption.home_age + '年以内 '
            }

            if(searchOption.indoor_size != undefined){
              label += ' 室内面积大于: ' + parseInt(parseInt(searchOption.indoor_size) * 0.093) + '平方米'
            }
            // TODO: populate agent saved search
            var checked = _.findIndex(self.props.selected, function(search){
              return search.regionValue == searchOption.regionValue &&
              search.priceMin == searchOption.priceMin &&
              search.priceMax == searchOption.priceMax
            })
            index = index+1;
            return(
                   <div>
                   <li className={'listitem'} id={index} value={value.search_query} onClick={self.selectVariant.bind(self, value.search_query, index)}>
                      {label}
                    </li>
                    <button className='delete_btn' onClick={self.removeSearch.bind(self, value)} >删除</button>
                    
                   </div>
              )
            })}
          </form>
          {defaultButton}
      </div>
      );
  }
});

module.exports = SavedSearchList;