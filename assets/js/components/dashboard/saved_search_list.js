var SavedSearchList = React.createClass({

  selectVariant: function(value){
     console.log(value);
  },

  render: function() {
    var list = this.props.current_user.saved_searches;

    if(!list) {
      list = []
    }
    var that = this;
    var savedList = list.map(function(value){
      return <li onClick={that.selectVariant.bind(that, value)}>
               {'地区: ' + JSON.parse(value.search_query).regionValue + ' 最低价: ' + JSON.parse(value.search_query).priceMin + ' 最高价: ' + JSON.parse(value.search_query).priceMax}
             </li>
      })

    return (
      <div className="commentList">
         <h3>保存的记录</h3>
         <ul>
         {savedList}
         </ul>
      </div>
      );
  }
});

module.exports = SavedSearchList;