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
           var divStyle = {backgroundImage: 'url(' + imgUrl + ')'};
           return <li>
                    <a href={'#/home_detail/' + value.id}>
                      <div style={divStyle}>
                        <p>地址：{value.addr1}</p>
                        <p>城市：{value.city}</p>
                        <p>房型：{value.bed_num + " 房 " + value.bath_num + " 卫"}</p>
                        <p>房屋种类：{value.home_type}</p>
                        <p>价格：{'$' + value.price}</p>
                        <p>面积：{value.indoor_size + '000平方英尺'}</p>
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