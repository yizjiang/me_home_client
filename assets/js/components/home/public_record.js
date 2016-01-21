var React = require('react');

var PublicRecord = React.createClass({

  render: function() {
    console.log(this.props);
    var {record, diff} = this.props;
    return (
      <div>
        <h3>最近成交记录</h3>
        <div>
          <div>
           <p>{record.property_id}</p>
          </div>
          <div>
            <p>{record.price}</p>
          </div>
          <div>
            <p>{record.record_date}</p>
          </div>
          <div>
            <p>{record.source}</p>
          </div>
          <div>
            <p>每年涨幅</p>
            <p>{diff}%</p>
          </div>
       </div>
      </div>
    );
  }
});

module.exports = PublicRecord
