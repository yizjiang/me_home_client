'use strict';
var React = require('react'),
    StatusBar = require('./status_bar'),
    Carousel = require('react-bootstrap').Carousel,
    CarouselItem = require('react-bootstrap').CarouselItem;

var HomeList = React.createClass({

  render: function () {
    var tableheader = null;
    var tablebody = [];
    var statusHeader = null;
    var noResult = null;

    if(this.props.list != undefined && this.props.list.length > 0){
      statusHeader = <StatusBar count={this.props.count}/> ;
      tableheader = (          
          <tr>
            <th className = 'thpic'></th>
            <th className = 'thdes'><p>详情</p></th>
          </tr>)

      tablebody = this.props.list.map(function(value){
        var imgUrl;
        if(value.images != undefined && value.images.length > 0){
          imgUrl = SERVER_URL + value.images[0].image_url;
        }else{
          imgUrl = '../img/bay-area.jpg';
        };

        var imageItems = null;
        if(value.images != undefined) {
          imageItems = value.images.map(function(img){
                  return (
                    <CarouselItem>
                      <img src={SERVER_URL + img.image_url}/>
                    </CarouselItem>
                  )
                }
                )
        }
        return (<tr>
          <td className='picture_td'>
            <Carousel>
              {
                imageItems
              }
            </Carousel>
          </td>
          <td className = 'thadd'>
            <a href={'#/home_detail/' + value.id}><p>{value.addr1 + ' ' + value.city}</p></a>
            <a href={'#/home_detail/' + value.id}><p>{value.short_desc}</p></a>
          </td>
        </tr>
          )
      })

    } else if(this.props.searched == true) {
      statusHeader = <p>对不起，该地区没有您理想的家</p>
    }

    return (
      <div>
        {statusHeader}
        <div className={'homelistDiv ' + this.props.custom_style} id='homelistAnchor'>
          <table>
            <thead>{tableheader}</thead>
            <tbody>{tablebody}</tbody>
          </table>
        </div>
      </div>
      );
  }
});

module.exports = HomeList;