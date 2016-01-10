var ServerActions = require('../../actions/server_action'),
  SearchOptions = require('../home/search_options'),
  Tokenizer = require('react-typeahead').Tokenizer,
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

    console.log(stateObject);
    return stateObject;
  },

  getInitialState: function () {
     return this.stateObject();
  },

  handleFilterChange: function(event) {
    if(event.target.id){
      this.setState({ [event.target.id]: event.target.value });
    } else {
      var temp = this.state[event.target.value];
      this.setState({[event.target.value]: !temp});
    };
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
      console.log(search);
      $('#saveBtn' + id).text('保存中..');

      ServerActions.saveCustomerSearch(search).then(() => { $('#saveBtn' + id).text('保存');});
    }
  },

  render: function() {
    var that = this;
    return (
      <div className='each-customer'>
        <p className='customer-name'>{this.props.wechat_user.nickname}</p>
        <img src={this.props.wechat_user.head_img_url} height="90" width="90"></img>

        <div className='searchDiv'>
          <h3>微信快速搜索</h3>
          <Tokenizer
          customClasses={{input: 'input-region'}}
          options={this.props.areas}
          defaultSelected={this.state.regionValue}
          placeholder='城市或邮编（最多三个）'
          onTokenAdd={function(token) {
            addRegion(token);
          }}
          onTokenRemove={function(token) {
            removeRegion(token);
          }}
          />
          <SearchOptions options={this.state} callback={this.handleFilterChange} show={true}/>
          <button id={'saveBtn' + this.props.wechat_user.id} type="button" onClick={this.saveSearch.bind(this, this.props.wechat_user.id)} >保存</button>

          <br/>
        </div>
      </div>
    );
  }
});

module.exports = QuickSearch;