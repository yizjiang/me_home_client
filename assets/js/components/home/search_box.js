var ServerActions = require('../../actions/server_action'),
  SearchOptions = require('./search_options'),
  UserStore = require('../../stores/user_store');

var SearchBox = React.createClass({

  getInitialState: function() {
    return {
      moreOptions: false,
      regionValue: '',
      priceMin: '',
      priceMax: '',
      bedNum: '',
      single_family: true,
      condo: true,
      multi_family: true
    };
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
    var that = this;
    if (this.state.regionValue != '') {
      $('.homelistDiv').addClass('loading');
      ServerActions.homeSearch(this.state).then(() => {
        $('.homelistDiv').removeClass('loading');
        if(!_.isEmpty(UserStore.getCurrentUser())) {
          that.saveSearch();
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
    return (
      <div className='searchDiv'>
        <h3 className='home_h3'>觅 家 Find a Home</h3>
        <div className='btn_group'><input id='regionValue' value={this.state.regionValue} onChange={this.handleFilterChange} placeholder="请输入要搜索的城市或邮编，例如旧金山"/>
        <button id='search' type="button" onClick={this.homeSearch} ><a href='#homelistAnchor'><span className='glyphicon glyphicon-search'></span></a></button>
        <button id='more' type="button" onClick={this.moreOptions} ><span className='glyphicon glyphicon-filter'></span></button>
        <SearchOptions options={this.state} callback={this.handleFilterChange} show={this.state.moreOptions}/>
        <div className='slogan_div'><p>觅家为尊贵的您寻觅美国最美的家</p></div>
        
        </div><br/>
      </div>
      );
  }
});

module.exports = SearchBox
