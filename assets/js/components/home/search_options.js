var React = require('react'),
  Slider = require('rc-slider'),
  FilterStore = require('../../stores/filter_store'),
  ServerActions = require('../../actions/server_action');

const marks = [1,2,3,4,5,6,7,8,9,10];

var SearchOptions = React.createClass({

  elementaryRatingChange: function(value){
    ServerActions.filterChange({elementary: value})
  },

  middleRatingChange: function(value){
    ServerActions.filterChange({middle: value})
  },

  highRatingChange: function(value){
    ServerActions.filterChange({high: value})
  },

  render: function() {
    var style = {};
    if(!this.props.show) {
      style.display = 'none'
    }
    var schoolFilter = null;
    if(this.props.showSchoolFilter == true){
      schoolFilter = (<div className='schoolFilter'>
                       <div className='schoolWrap'>
                       <label>小学评分</label>
                       <Slider marks={marks} step={null} onChange={this.elementaryRatingChange} defaultValue={30}/>
                       </div>
                       <div className='schoolWrap'>
                       <label>初中评分</label>
                       <Slider marks={marks} step={null} onChange={this.middleRatingChange}/>
                       </div>
                       <div className='schoolWrap'>
                       <label>高中评分</label>
                       <Slider marks={marks} step={null} onChange={this.highRatingChange}/>
                       </div>
                      </div>)
    }

    var bedNum = ['','','','',''];
    var homeAge = {5: '', 10: '', 20: '', 30: '', 50: '', 80: '', 200: ''};
    var indoorSize = {'538': '', '968': '','1291': '','1614': '','2153': '','2690' : '', '3229': ''};

    if(this.props.options.bedNum){
      bedNum[this.props.options.bedNum - 1] = true
    } else {
      bedNum[1] = true
    }

    if(this.props.options.home_age){
      homeAge[this.props.options.home_age] = true
    } else {
      homeAge['200'] = true
    }

    if(this.props.options.indoor_size){
      indoorSize[this.props.options.indoor_size] = true
    } else {
      indoorSize['968'] = true
    }

    return (
      <div className='filter' style={style}>
        <label>
          <input type='checkbox' checked={this.props.options.single_family} value='single_family' onChange={this.props.callback}/>
          <span>独栋别墅</span>
        </label>
        <label >
          <input type='checkbox' checked={this.props.options.multi_family} value='multi_family' onChange={this.props.callback}/>
          <span>复合别墅</span>
        </label>
        <label>
          <input type='checkbox' checked={this.props.options.townhouse} value='townhouse'  onChange={this.props.callback}/>
          <span>联排别墅</span>
        </label>
        <label>
          <input type='checkbox' checked={this.props.options.condo} value='condo'  onChange={this.props.callback}/>
          <span>公寓</span>
        </label>
        <label>
          <input type='checkbox' checked={this.props.options.business} value='business'  onChange={this.props.callback}/>
          <span>商住两用</span>
        </label>
        <label >
          <input type='checkbox' checked={this.props.options.land} value='land' onChange={this.props.callback}/>
          <span>土地</span>
        </label>
        <label>
          <input type='checkbox' checked={this.props.options.farm} value='farm'  onChange={this.props.callback}/>
          <span>农场</span>
        </label>
        <label>
          <input type='checkbox' checked={this.props.options.other} value='other'  onChange={this.props.callback}/>
          <span>其他</span>
        </label>
        <label>
          <span>房间数</span>
          <select id='bedNum' onChange={this.props.callback}>
            <option value="1" selected={bedNum[0]}>1+</option>
            <option value="2" selected={bedNum[1]}>2+</option>
            <option value="3" selected={bedNum[2]}>3+</option>
            <option value="4" selected={bedNum[3]}>4+</option>
            <option value="5" selected={bedNum[4]}>5+</option>
          </select>
        </label>
        <label>
          <span>室内面积</span>
          <select id='indoor_size' onChange={this.props.callback}>
            <option value="538" selected={indoorSize['538']}>50平方米以上</option>
            <option value="968" selected={indoorSize['968']}>90平方米以上</option>
            <option value="1291" selected={indoorSize['1291']}>120平方米以上</option>
            <option value="1614" selected={indoorSize['1614']}>150平方米以上</option>
            <option value="2153" selected={indoorSize['2153']}>200平方米以上</option>
            <option value="2690" selected={indoorSize['2690']}>250平方米以上</option>
            <option value="3229" selected={indoorSize['3229']}>350平方米以上</option>
          </select>
        </label>
        <label>
          <span>房龄</span>
          <select id='home_age' onChange={this.props.callback}>
            <option value="200"selected={homeAge['200']}>不限</option>
            <option value="5"  selected={homeAge['5']} >5年内</option>
            <option value="10" selected={homeAge['10']}>10年内</option>
            <option value="20" selected={homeAge['20']}>20年内</option>
            <option value="30" selected={homeAge['30']}>30年内</option>
            <option value="50" selected={homeAge['50']}>50年内</option>
            <option value="80" selected={homeAge['80']}>80年内</option>
          </select>
        </label>
        <label>
          <span>最低价</span>
          <input id='priceMin' value={this.props.options.priceMin} placeholder='不限' onChange={this.props.callback}/>万美元
        </label>
        <label>
          <span>最高价</span>
          <input id='priceMax' value={this.props.options.priceMax} placeholder='不限' onChange={this.props.callback}/>万美元
        </label>
        <br/>
        {schoolFilter}
      </div>
      );
  }
});

module.exports = SearchOptions
