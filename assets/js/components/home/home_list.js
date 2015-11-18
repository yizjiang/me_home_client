'use strict';
var React = require('react');

var HomeList = React.createClass({

  render: function () {
    return (
      <div className={'homelistDiv ' + this.props.custom_style} id='homelistAnchor'>
         <ul>
         { this.props.list.map(function(value){
           var imgUrl;
           if(value.images != undefined && value.images.length > 0){
            imgUrl = SERVER_URL + value.images[0].image_url;
           }else{
            imgUrl = '../img/bay-area.jpg';
           };
           return <li>
                    <a href={'#/home_detail/' + value.id}>
                      <img src={imgUrl} />
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