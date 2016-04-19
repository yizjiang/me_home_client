var React = require('react');

var PublicRecord = React.createClass({

  render: function() {
    var {record, listing, diff} = this.props;
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
          <h4>年增值</h4>
          <p>{diff}万美金</p>
        </div>
        <div className='public-record-detail'>
          <h4>经纪人</h4>
          <p>{listing.agent}</p>
        </div>
        <div className='public-record-detail'>
          <h4>公司</h4>
          <p>{listing.company}</p>
        </div>
      </div>
    );
  }
});

module.exports = PublicRecord
