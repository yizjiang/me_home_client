'use strict';
var React = require('react'),
    HomeListStore = require('../../stores/home_list_store'),
    ServerActions = require('../../actions/server_action'),
    UserStore = require('../../stores/user_store'),
    Button = require('react-bootstrap').Button,
    Col = require('react-bootstrap').Col,
    Carousel = require('react-bootstrap').Carousel,
    CarouselItem = require('react-bootstrap').CarouselItem;


var HomeDetail = React.createClass({

  loadHomeFromServer: function(id) {
    $.ajax({
      url: 'home/show',
      dataType: 'json',
      data: {home_id: id},
      success: function(data) {
        this.setState({currentHome: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.log(err);
      }.bind(this)
    });
  },

  getInitialState: function() {
    var currentHome =  HomeListStore.getHomeById(this.props.params.id);
    var self = this;
    if(_.isEmpty(currentHome)) {
      this.loadHomeFromServer(this.props.params.id)
      currentHome = {images: []};
    }
    return {currentHome: currentHome, currentFavorite: UserStore.getFavoriteHomes()}
  },

  _onChange: function() {
    this.setState({currentFavorite: UserStore.getFavoriteHomes()});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
  },

  favoriteAction: function() {
    if(!this.isFavorite()) {
      ServerActions.addFavorite(this.state.currentHome.id, UserStore.getCurrentUser());      //Todo use then
    }else {
      ServerActions.removeFavorite(this.state.currentHome.id, UserStore.getCurrentUser());      //Todo use then
    }
  },


  isFavorite: function() {
    var self = this;
    if(this.state.currentFavorite){
      return !_.isEmpty(this.state.currentFavorite.filter(function(v){return v.id== self.state.currentHome.id})[0])

    }else{
      return false
    }
  },

  render: function () {
    var home = this.state.currentHome;
    var bgStyle = this.isFavorite() ? 'danger' : 'warning';
    var mapping = {addr1: '地址', 
                   addr2: '门牌',
                   city: '城市',
                   state: '州',
                   zipcode: '邮编',
                   county: '国家', 
                   home_type: '房型',
                   bed_num: '卧', 
                   bath_num: '卫', 
                   created_at: '发布日',
                   description: '详情',
                   indoor_size: '室内面积',
                   link: '网址',
                   lot_size: '总体面积',
                   neighborhood: '社区',
                   price: '价格',
                   status: '状态',
                   stores: '层',
                   unit_price: '单价',
                   year_built: '建造时间',
                   last_refresh_at: '上次更新时间',
                   id: 'ID',
                   schools: '学校'
                  };
   
    
    if(home.addr2 == null) {
      home.addr2 = '';
    }else{
      home.addr2 = home.addr2 + ',';
    };
    var address = home.addr1 + ', ' + home.addr2 + ' ' + home.city + ', ' + home.state + ', ' + home.county;
    
    if (home.stores >= 0) {
      home.stores = home.stores + 1;
    }else{
      home.stores = '';
      mapping.stores = '';
    }

    //TODO go back
    return (
      <div>
        <Carousel>
            {
              home.images.map(function(img){
                return (
                  <CarouselItem>
                    <img src={SERVER_URL + img.image_url}/>
                    <div className='carousel-caption'>
                      <h3>{address}</h3>
                    </div>
                  </CarouselItem>
                )
              }
              )
            }
        </Carousel>

        <div className='detailDiv'>
          <button className='btngroup'><a href='#'>后 退</a></button>
          <Button id='favoriteBtn' bsStyle={bgStyle} onClick={this.favoriteAction}>红心</Button>
          <h3>房屋详情</h3>
          <div className='detailWrap'>
              
              <Col md={6} className='detailPara'>  
                 <h3 className='detailh3'>{mapping['addr1']}</h3>
                 <p className='detailp'>{address + ' ' +home['zipcode']}</p>
                 <p className='detailp'>{mapping['neighborhood'] + ' ' + home['neighborhood']}</p>
              </Col>

              <Col md={6} className='detailPara'>
                  <h3 className='detailh3'>{mapping['home_type']}</h3>
                  <p className='detailp'>{home['home_type'] 
                                          + ': ' 
                                          + home['bed_num'] 
                                          + mapping['bed_num'] 
                                          + home['bath_num'] 
                                          + mapping['bath_num']
                                         }
                  </p>
                  <p className='detailp'>{
                                          mapping['indoor_size']
                                          + ': '
                                          + home['indoor_size']
                                          + '千平方英尺, '
                                          + mapping['lot_size']
                                          + ': '
                                          + home['lot_size']
                                          + '千平方英尺, '
                                          + home['stores'] 
                                          + mapping['stores']
                                         }
                  </p>
              </Col>

              <Col md = {6} className='detailPara singledetail'>
                <h3 className='detailh3'>
                 {mapping['price'] + ': ' + home['price']}
                </h3>
                <p className='detailp'>{mapping['unit_price'] + ': ' + home['unit_price'] + '美金/平方英尺'}</p>
              </Col>

              <Col md = {12} className='detailPara detailother'>
                <h3 className='detailh3'>
                 {mapping['description']}
                </h3>
                <p className='detailp'>{home['description']}</p>
              </Col>

              <Col md = {6} className='detailPara '>
                <h3 className='detailh3'>
                 {mapping['schools']}
                </h3>
                <p className='detailp'>{home['schools']}</p>
              </Col>
              <Col md = {6} className='detailPara '>
                <h3 className='detailh3'>
                 其他
                </h3>
                <p className='detailp'> </p>
              </Col>
          </div>
        </div>
      </div>
  );
  }
});

module.exports = HomeDetail;
