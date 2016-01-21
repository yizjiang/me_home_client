var React = require('react');

var PublicRecord = React.createClass({

  render: function() {
    var {record, diff} = this.props;
    return (
      <div className='public-record-wrap'>
        <h3>最近挂牌记录</h3>
        <div className='public-record-detail'>
         <h4>交易信息</h4>
         <p>{record.source}: {record.property_id}</p>
        </div>
        <div className='public-record-detail'>
          <h4>交易状态</h4>
          <p>{record.event}</p>
        </div>
        <div className='public-record-detail' >
          <h4>日期</h4>
          <p>{record.record_date}</p>
        </div>
        <div className='public-record-detail'>
          <h4>价格</h4>
          <p>{record.price}</p>
        </div>
        <div className='public-record-detail'>
          <h4>每年涨幅</h4>
          <p>{diff}%</p>
        </div>
      </div>
    );
  }
});

module.exports = PublicRecord
