var ServerActions = require('../../actions/server_action'),
  SearchOptions = require('../home/search_options'),
  Select = require('../home/select'),
  _ = require('lodash'),
  AreaStore = require('../../stores/area_store'),
  UserStore = require('../../stores/user_store');

var _selectRgion = [];

function addRegion(data){
  data = data.split(',')[0];
  _selectRgion.push(data)
}

function removeRegion(data){
  data = data.split(',')[0];
  _.remove(_selectRgion, function(n) {
    return n == data;
  });
}

function getSelectRegion(){
  return _selectRgion
}

var QuickSearch = React.createClass({

  stateObject: function() {
    var search = this.props.wechat_user.search;
    var stateObject = {
      regionValue: [],
      priceMin: '',
      priceMax: '',
      bedNum: '',
      single_family: true,
      condo: true,
      townhouse: true,
      multi_family: true,
      business: false,
      land: false,
      farm: false,
      other: false
    };

    if (search) {
      search = JSON.parse(search)
    } else {
      search = {};
    }

    if(search.bedNum != undefined){
      stateObject['bedNum'] = search.bedNum
    }
    if(search.home_type != undefined){
      var homeType;
      homeType = search.home_type.map((value) => {
        if(value == 'Single Family Home'){
          return 'single_family'
        }else if(value == 'Townhouse'){
          return 'townhouse'
        }
        else if(value == 'Duplex' || value == 'Triplex' || value == 'Fourplex'){
          return 'multi_family'
        }
        else if(value == 'Apartment' || value == 'Condominium'){
          return 'condo'
        }
        else if(value == 'Residential Land' || value == 'Residential Lot' || value == 'Land'){
          return 'land'
        }
        else {
          return 'other'
        }
      })
      stateObject['single_family'] = false;
      stateObject['townhouse'] = false;
      stateObject['multi_family'] = false;
      stateObject['condo'] = false;
      homeType.map((value) => stateObject[value] = true)
    }

    if(search.regionValue != undefined){
       search.regionValue.split(',').forEach((value) => {
         var selectRegion = this.props.areas.find((area) => area.startsWith(value));
         addRegion(selectRegion);
         stateObject['regionValue'].push(selectRegion);
       });
    }

    if(search.home_age != undefined){
      stateObject['home_age'] = search.home_age
    }

    if(search.indoor_size != undefined){
      stateObject['indoor_size'] = search.indoor_size
    }

    if(search.priceMax != undefined){
      stateObject['priceMax'] = search.priceMax
    }

    if(search.priceMin != undefined){
      stateObject['priceMin'] = search.priceMin
    }

    return stateObject;
  },

  getInitialState: function () {
     return this.stateObject();
  },

  handleFilterChange: function(event) {
    $('#desc').hide();
    if(event.target.id){
      this.setState({ [event.target.id]: event.target.value });
    } else {
      var temp = this.state[event.target.value];
      this.setState({[event.target.value]: !temp});
    };
  },

  changeRegionValue: function(regions) {
    _selectRgion = regions.map((region) => {
      return region.value
    });
  },

  saveSearch: function(id) {
    var region, search;
    region = getSelectRegion();
    search = this.state;
    search['regionValue'] = region;
    var that = this;
    if (search.regionValue.length != 0) {
      search['regionValue'] = search.regionValue.join(',');
      search['customer_id'] = this.props.wechat_user.id;
      search['api'] = true;
      $('#saveBtn' + id).text('保存中..');

      ServerActions.saveCustomerSearch(search).then(() => { $('#saveBtn' + id).text('保存');
                                                            $('#desc').show();

                                                          });
    }
  },

  render: function() {
    var that = this;
    var text = '已更新'
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
      text = '已更新, 点击返回看结果';
    }
    return (
      <div className='wechat_search'>
        <div className='wechat_wrap'>
          <img className='customer-avator' src={this.props.wechat_user.head_img_url} />
          <p className='customer-name'>微信用户：{this.props.wechat_user.nickname}</p>
        </div>

        <div className='searchDiv'>
          <h3>微信快速搜索设置</h3>
          <Select options={this.props.areas} change={this.changeRegionValue} selected={this.state.regionValue}/>
          <SearchOptions options={this.state} callback={this.handleFilterChange} show={true}/>
          <button id={'saveBtn' + this.props.wechat_user.id} className='btn btn-success' type="button" onClick={this.saveSearch.bind(this, this.props.wechat_user.id)} >保存</button>
          <p id='desc' style={{display: 'none', width: '80px'}}> {text} </p>
          <hr />
        </div>
      </div>
    );
  }
});

module.exports = QuickSearch;