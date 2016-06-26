var React = require('react'),
  Button = require('react-bootstrap').Button,
  ServerActions = require('../../actions/server_action'),
  HomeStore = require('../../stores/home_store'),
  UserStore = require('../../stores/user_store');

var HomeQrCode = React.createClass({
  statics: {
    source: [
      {name: 'San Francisco MLS', val: 'sf_mls'},
      {name: 'MLSListings', val: 'mls'},
      {name: 'TheMLS', val: 'the_mls'},
      {name: 'CRMLS', val: 'ccrmls'},
      {name: 'Other', val: 'other'},
      {name: 'MetroList', val: 'metro_list'}
    ]
  },

  getInitialState: function () {
    return { home: {} };
  },

  componentDidMount: function() {
    HomeStore.addChangeListener(this._onChange);
  },

  // Remove change listeners from stores
  componentWillUnmount: function() {
    HomeStore.removeChangeListener(this._onChange);
  },

  _onChange: function() {
    this.setState({home: HomeStore.getHome()});
  },


  handleSearch: function() {
    var sourceType = $('#sourceType').val();
    var sourceId = $('#sourceId').val();

    ServerActions.homeSearchByListing(sourceType, sourceId)
  },

  handleSubmit: function() {
    var agentId = UserStore.getCurrentUser().id;
    $('#qrcode').show();
    $('#qrcode').attr('src', CLIENT_URL + '/img/loading.gif');

    $("#saveSuccess").hide();
    $("#saveFail").hide();

    ServerActions.generateHomeQrCode(agentId, this.state.home['id']).then((data) => {
    $('#qrcode').attr('src', SERVER_URL + data.qrImage);
    $("#qrSaveSuccess").show();
    }, () => {
        $('#qrcode').attr('src', SERVER_URL + "/default.jpeg");
        $("#qrSaveFail").show();
      }
)},

  render: function() {
    var actionButton;
    if(!_.isEmpty(this.state.home)){
      actionButton = <Button style={{display: 'block'}} bsStyle='success' id='generate' type="button" onClick={this.handleSubmit} >生成二维码</Button>
    }else {
      actionButton =   <Button style={{display: 'block'}} bsStyle='success' id='generate' type="button" onClick={this.handleSearch} >查找房屋</Button>
    }

    var homeComponent = null;
    console.log(this.state.home);
    if(!_.isEmpty(this.state.home)){
      homeComponent =
        <div>
           <h3>选中房屋</h3>
           <h3>{this.state.home['addr1']}</h3>
           <p>{this.state.home['short_desc']}</p>
           <img src={CDN_URL + this.state.home['images'][0].image_url}  height="160" width="160"/>
        </div>
    }

    return (
      <div>
        <label className='agentlabel'>房源档案类型</label>
        <select id='sourceType'>
          {
            HomeQrCode.source.map( (source) => {
              return <option value= {source.val}> {source.name}</option>
            })
          }
        </select>
        <label className='agentlabel'>房源档案号</label>
        <input id='sourceId' className='answer-inputbox' type="text"/>

        {homeComponent}
        {actionButton}
        <img id='qrcode' style={{display: 'none'}} height="160" width="160"/>
        <p id='qrSaveSuccess' style={{display: 'none'}} > 二维码已生成, 请保存</p>
        <p id='qrSaveFail' style={{display: 'none'}} > 出错了, 该房源没找到</p>
      </div>
      );
  }
});

module.exports = HomeQrCode;