'use strict';
var React = require('react');

var HomeList = React.createClass({
  
  scrollToList: function() {

  },

  render: function () {
    if(this.props.list.length > 0){
      this.scrollToList();
    }
    return (
      <div className='homelistDiv' id='homelistAnchor'>
         <ul>
         { this.props.list.map(function(value){
           return <li>
                    <a href={'#/home_detail/' + value.id}>
                      <img src="../img/bay-area.jpg" />
                      <div>
                        <p>地址：{value.addr1 + ", " + value.city}</p>
                        <p>房型：{value.bed_num + " bedrooms" + value.bath_num + " bathrooms"}</p>
                        <p>房屋种类：{value.home_type}</p>
                        <p>价格：{'$' + value.price}</p>
                      </div> 
                    </a>
                  </li>
           })
         }
         </ul>
      </div>
      );
  }
});

module.exports = HomeList;