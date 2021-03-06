'use strict';
var React = require('react'),
    BingMap = require('./bing_map'),
    AgentsInfo = require('./agents_info'),
    CityInfo = require('./city_info'),
    SchoolInfo = require('./school_info'),
    PublicRecord = require('./public_record'),
    HomeListStore = require('../../stores/home_list_store'),
    ServerActions = require('../../actions/server_action'),
    UserStore = require('../../stores/user_store'),
    AgentRequestStore = require('../../stores/agent_request_store'),
    AgentRequests = require('../agent/agent_requests'),
    Button = require('react-bootstrap').Button,
    Col = require('react-bootstrap').Col,
    Carousel = require('react-bootstrap').Carousel,
    _ = require('lodash'),
    CarouselItem = require('react-bootstrap').CarouselItem;


var HomeDetail = React.createClass({

  loadHomeFromServer: function(id) {
    var data = {home_id: id};

    $.ajax({
      url: '/home/show',
      dataType: 'json',
      data: data,
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
    if(_.isEmpty(currentHome)) {
      this.loadHomeFromServer(this.props.params.id)
      currentHome = {images: [], colleges:[], public_schools:[], private_schools:[], assigned_school:[], public_record: {}};
    }
    return {currentHome: currentHome, currentFavorite: UserStore.getFavoriteHomes(), agentRequests: AgentRequestStore.getAll()}              //TODO get user in mobile version
  },

  _onChange: function() {
    if(!_.isEmpty(UserStore.getCurrentUser())){
      if(UserStore.isCurrentUserAgent() && this.state.agentRequests == undefined){
        ServerActions.getAllRequests(UserStore.getCurrentUser());
      } else if (UserStore.isCurrentUserAgent() == false){
        ServerActions.metricTracking(UserStore.getCurrentUser(), {home_id: this.props.params.id})
      }
    }
    this.setState({currentFavorite: UserStore.getFavoriteHomes(), agentRequests: AgentRequestStore.getAll()});
  },

  // Add change listeners to stores
  componentDidMount: function() {
    UserStore.addChangeListener(this._onChange);
    AgentRequestStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    UserStore.removeChangeListener(this._onChange);
    AgentRequestStore.removeChangeListener(this._onChange);
  },

  favoriteAction: function() {
    if(_.isEmpty(UserStore.getCurrentUser())) {
      var auth_window = window.open(SERVER_URL + '/users/login', null, "width=400,height=250");
      window.auth_window = auth_window;
      window.auth_callback = this.auth_back;
    } else{
      if(!this.isFavorite()) {
        ServerActions.addFavorite(this.state.currentHome.id, UserStore.getCurrentUser());
      }else {
        ServerActions.removeFavorite(this.state.currentHome.id, UserStore.getCurrentUser());
      }
    }
  },

  auth_back: function(ticket) {
    ServerActions.getCurrentUser(ticket);
    window.auth_window.close();
  },

  isFavorite: function() {
    var self = this;
    if(this.state.currentFavorite){
      return !_.isEmpty(this.state.currentFavorite.filter(function(v){return v.id== self.state.currentHome.id})[0])

    }else{
      return false
    }
  },

  incHomeView: function(id) {
      // TODO send reqeust to server, inc home view cnt
  },

  calculateDiff: function(home) {
    if(!_.isEmpty(home) && !_.isEmpty(home.public_record)){
      var recordDate = new Date(home.public_record.record_date);
      var currentDate = new Date();
      var yearDiff = currentDate.getUTCFullYear() - recordDate.getUTCFullYear()
      var monthDiff = currentDate.getMonth() - recordDate.getMonth()
      var diff = yearDiff + monthDiff/12
      var publicPrice = parseInt(home.public_record.price) * 10000
      if(diff !== 0){
        return ((home.origin_price - publicPrice) / diff / 10000).toFixed(2)
      } else{
        return 0;
      }
    }
    else {
      return 0;
    }
  },

  render: function () {
    var home = this.state.currentHome;
    console.log(home);
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
                   lot_size: '占地面积',
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

    if (home.stores >= 0) {
      home.stores = home.stores + 1;
    }else{
      home.stores = '';
      mapping.stores = '';
    }
    if(home.assigned_school == null) {
      home['assigned_school'] = [];
    }

    if(home.public_schools == null) {
      home['public_schools'] = [];
    }

    if(home.private_schools == null) {
      home['private_schools'] = [];
    }

    if(home.images == undefined ){
      home['images'] = [];

    }

    if(home.colleges == undefined ){
      home['colleges'] = [];

    }

    var favButtonClass, heartClass;
    if(this.isFavorite()){
      favButtonClass = 'favored';
      heartClass = 'liked';
    }

    var address = home.addr1 + ', ' + home.addr2 + ', ' + home.city + ', ' + home.state + ', ' + home.zipcode;

    var mapComponent = null;
    if(home.geo_point != -1 && home.geo_point != undefined ){
      var points = home.geo_point.split(',');
      mapComponent= <BingMap home_info={{lat: points[0], long: points[1],
        address: address, description: home.chinese_description, home_id: home.id}} show_details={false}/>
    }

    var agentInfoComponent = null

    if(home.id){
      this.incHomeView(home.id);
      if(UserStore.isCurrentUserAgent() == true){
        var homeRequest = _.filter(this.state.agentRequests, (r) => r.home_id == home.id);
        if(homeRequest.length == 1){
          agentInfoComponent = <AgentRequests requests={ homeRequest } title={false}/>;
        }
      } else {
        agentInfoComponent = <AgentsInfo homeID={home.id} userID={UserStore.getCurrentUser().id}/>;
      }
    }

    var cityInfoComponent = null;
    if(home.city_info){
      cityInfoComponent = <CityInfo data={home.city_info} />
    }

    var schoolInfoCompoent = <SchoolInfo colleges= {home.colleges} assigned_schools= {home.assigned_school} public_schools= {home.public_schools} private_schools= {home.private_schools}/>

    var publicRecordComponent = null;
    if(!_.isEmpty(home) && !_.isEmpty(home.public_record)){
      publicRecordComponent = <PublicRecord record={home.public_record} listing={{agent: home.listing_agent, company: home.listed_by}} diff={this.calculateDiff(home)}/>
    }

    return (
      <div className='ccent'>
        <div className='headerinfo_div'>
          <div className='address_imgdiv'>
            <img src="../img/default.png" />
            <div>
              <h3>{home['addr1']}</h3>
              <p>{home['city'] + ', ' + home['state'] + ' ' + home['zipcode']}</p>
            </div>
          </div>

          <div className='rightdes_div'>
            <div>
              <h3>{home['price']}</h3>
              <p>总价</p>
            </div>
            <div>
              <h3>{home['bed_num']}</h3>
              <p>卧室</p>
            </div>
            <div>
              <h3>{home['bath_num']}</h3>
              <p>厕所</p>
            </div>
            <div className='last_div_child'>
              <h3>{parseInt(home['indoor_size'])}</h3>
              <p>平方米</p>
            </div>
            <Button id='favoriteBtn' className={favButtonClass} onClick={this.favoriteAction}>
              <span className={'glyphicon glyphicon-heart ' + heartClass}></span> 喜欢
            </Button>
          </div>
        </div>

        <Carousel>
            {
              home.images.map(function(img){
                return (
                  <CarouselItem>
                    <img src={CDN_URL + '/photo/' + img.image_url}/>
                  </CarouselItem>
                )
              }
              )
            }
        </Carousel>

        {agentInfoComponent}

        {cityInfoComponent}

        <div className='detailDiv'>
          <h3>房屋详情</h3>
          <div className='detailWrap'>

              <Col md={6} className='detailPara'>
                 <h3 className='detailh3'>{mapping['addr1']}</h3>
                 <p className='detailp'>{address}</p>
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
                                          + home['chinese_indoor_size'] + '(' + home['indoor_size'] + '平方英尺)'
                                         }
                  </p>
                <p className='detailp'>{
                    mapping['lot_size']
                    + ': '
                    +  home['chinese_lot_size'] + '(' + home['lot_size'] + ')'
                    + ' '
                    + home['stores']
                    + mapping['stores']
                  }
                </p>
              </Col>

              <Col md = {6} className='detailPara singledetail'>
                <h3 className='detailh3'>
                 {mapping['price'] + ': ' + home['price'] + '(约' + parseInt(home['price']) * 6.5 + '万元)'}
                </h3>
                <p className='detailp'>{mapping['unit_price'] + ': ' + home['unit_price']}</p>
                <p className='detailp'>{'月租金: 约' + home['monthly_rent']}</p>
                <p className='detailp'>{'年房产税: 约' + home['property_tax']}</p>
              </Col>
          </div>
        </div>

        {schoolInfoCompoent}
        {publicRecordComponent}

        <div className='description_div'>
          <h3>
               {mapping['description']}
          </h3>
          <p className='detailp'>{home['description']}</p>
        </div>
        <div className='home-map-wrap'>{mapComponent}</div>
      </div>
  );
  }
});

module.exports = HomeDetail;
