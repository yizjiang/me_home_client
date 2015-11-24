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
                        <p>地址：{value.addr1 + ' ' + value.city}</p>
                        <p>{value.short_desc}</p>
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