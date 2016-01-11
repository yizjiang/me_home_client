
var HelpPanel = React.createClass({
    render: function() {
      return (
        <nav>
          <a href='/get_home'> 怎么买</a>
          <a href='/get_agent'> 经纪人</a>
          <a href='/get_money'> 贷款</a>
        </nav>
      )
    }
});

module.exports = HelpPanel;