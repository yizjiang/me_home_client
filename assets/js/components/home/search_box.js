var ServerActions = require('../../actions/server_action'),
  SearchOptions = require('./search_options'),
  SelectItems = require('./select_items'),
  Tokenizer = require('react-typeahead').Tokenizer,
  _ = require('lodash'),
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

var SearchBox = React.createClass({

  getInitialState: function() {
    return {
      moreOptions: false,
      regionValue: [],
      priceMin: '',
      priceMax: '',
      bedNum: '',
      single_family: true,
      condo: true,
      multi_family: true
    }
  },

  handleFilterChange: function(event) {
    if(event.target.id){
      this.setState({ [event.target.id]: event.target.value });
    } else {
      var temp = this.state[event.target.value];
      this.setState({[event.target.value]: !temp});
    }
  },

  homeSearch: function() {
    var region, search;
    region = getSelectRegion();
    search = this.state;
    search['regionValue'] = region;
    var that = this;
    if (search.regionValue.length != 0) {
      search['regionValue'] = search.regionValue.join(',');
      console.log(search);
      $('.homelistDiv').addClass('loading');
      ServerActions.homeSearch(search).then(() => {
        $('.homelistDiv').removeClass('loading');
        if(!_.isEmpty(UserStore.getCurrentUser())) {
          that.saveSearch();
          that.props.callback(true);
        }
      })
    }
  },

  saveSearch: function() {
    if(_.isEmpty(UserStore.getCurrentUser())) {
      var currentUrl = encodeURIComponent(CLIENT_URL);
      window.location.href = SERVER_URL + '/users/login?redirect_url=' + currentUrl;
    }else{
      ServerActions.saveUserSearch(this.state, UserStore.getCurrentUser());
    }
  },


  moreOptions: function() {
    this.setState({moreOptions: !this.state.moreOptions});
  },

  render: function() {
    var that = this;
    return (
      <div className='searchDiv'>
        <h3 className='home_h3'>觅 家 Find a Home</h3>
        <Tokenizer
          customClasses={{input: 'input-region'}}
          options={this.props.areas}
          defaultSelected={this.props.select_region}
          placeholder='请输入要搜索的城市或邮编，例如旧金山'
          onTokenAdd={function(token) {
            addRegion(token)
          }}
          onTokenRemove={function(token) {
            removeRegion(token);
          }}
        />
        <button id='search' type="button" onClick={this.homeSearch} ><a href='#homelistAnchor'><span className='glyphicon glyphicon-search'></span></a></button>
        <button id='more' type="button" onClick={this.moreOptions} ><span className='glyphicon glyphicon-filter'></span></button>
        <SearchOptions options={this.state} callback={this.handleFilterChange} show={this.state.moreOptions}/>
        <div className='slogan_div'><p>觅家为尊贵的您寻觅<br/>美国最美的家</p></div>

        <br/>
      </div>
      );
  }
});

module.exports = SearchBox
