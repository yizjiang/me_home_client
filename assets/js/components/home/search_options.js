var React = require('react'),
  ServerActions = require('../../actions/server_action');

var SearchOptions = React.createClass({
  render: function() {
    var style = {};
    if(!this.props.show) {
      style.display = 'none'
    }
    return (
      <div style={style}>
        <label>
          <input type='checkbox' checked={this.props.options.single_family} value='single_family' onChange={this.props.callback}/>
          <span>独栋别墅</span>
        </label>
        <label>
          <input type='checkbox' checked={this.props.options.multi_family} value='multi_family' onChange={this.props.callback}/>
          <span>复合别墅</span>
        </label>
        <label>
          <input type='checkbox' checked={this.props.options.condo} value='condo'  onChange={this.props.callback}/>
          <span>联排别墅/公寓</span>
        </label>
        <label>
          <span>房间数</span>
          <input id='bedNum' value={this.props.options.bedNum} onChange={this.props.callback}/>
        </label>
        <label>
          <span>最低价</span>
          <input id='priceMin' value={this.props.options.priceMin} onChange={this.props.callback}/>
        </label>
        <label>
          <span>最高价</span>
          <input id='priceMax' value={this.props.options.priceMax} onChange={this.props.callback}/>
        </label>
      </div>
      );
  }
});

module.exports = SearchOptions
