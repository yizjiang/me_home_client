'use strict';
var React = require('react');

var HomeList = React.createClass({

  render: function () {
    var tableheader = null;
    var tablebody = [];

    if(this.props.list != undefined && this.props.list.length > 0){
      tableheader = (          
          <tr>
            <th className = 'thadd'><p>地址</p></th>
            <th className = 'thdes'><p>详情</p></th>
          </tr>)

      tablebody = this.props.list.map(function(value){
        var imgUrl;
        if(value.images != undefined && value.images.length > 0){
          imgUrl = SERVER_URL + value.images[0].image_url;
        }else{
          imgUrl = '../img/bay-area.jpg';
        };
        return (<tr>
          <td className = 'thadd'>
            <a href={'#/home_detail/' + value.id}><p>{value.addr1 + ' ' + value.city}</p></a>
          </td>
          <td className = 'thdes'>
            <a href={'#/home_detail/' + value.id}><p>{value.short_desc}</p></a>
          </td>
        </tr>
          )
      })

    }

    return (
      <div className={'homelistDiv ' + this.props.custom_style} id='homelistAnchor'>
        <table>
          <thead>{tableheader}</thead>
          <tbody>{tablebody}</tbody>
        </table>
      </div>
      );
  }
});

module.exports = HomeList;