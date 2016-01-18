'use strict';

var React = require('react'),
  PieChart = require("react-chartjs").Doughnut,
  BarChart = require("react-chartjs").Bar;

var CityInfo = React.createClass({

  buildPieChartData: function (data) {
    var other = 100 - parseInt(data.asian) - parseInt(data.black) - parseInt(data.caucasion) -  parseInt(data.hispanics)
    return [
      {
        value: parseInt(data.asian),
        color:"#45BDBC",
        highlight: "#45BDBC",
        label: "亚裔"
      },
      {
        value: parseInt(data.black),
        color: "#FDB45C",
        highlight: "#FDB45C",
        label: "非洲裔"
      },
      {
        value: parseInt(data.caucasion),
        color: "#F54549",
        highlight: "#F54549",
        label: "白人"
      },
      {
        value: parseInt(data.hispanics),
        color: "#4D5360",
        highlight: "#4D5360",
        label: '西班牙裔'
      },
      {
        value: parseInt(other),
        color: "#949FB1",
        highlight: "#949FB1",
        label: "其他"
      },
    ]
  },

  chartOptions: function() {
    return {
      segmentShowStroke : true,

      //String - The colour of each segment stroke
      segmentStrokeColor : "#fff",

      //Number - The width of each segment stroke
      segmentStrokeWidth : 2 ,
      tooltipTemplate: "<%= label %> : <%= value %>%"};
  },

  render: function () {
    console.log(this.props.data)
    var data = this.props.data;
    if (data == undefined ){
      data = {};
    }
    return (
      <div className='cityinfo-wrap'>
        <div className='city-detail-wrap'>
          <h3>社区信息:</h3>
          <div className='city-detail'>
            <h4>平均家庭年收入</h4>
            <p>{data.income}</p>
            <h4>人口</h4>
            <p>{data.population}</p>
            <h4>环境指数</h4>
            <p>{data.PMI}</p>
            <h4>大学及以上教育</h4>
            <p>{data.above_bachelor}</p>
          </div>
        </div>
        
        <div className='city-detail-wrap'>
          <h3>城市安全度</h3>
          <div className='city-detail'>
            <h4>州失业率</h4>
            <p>{data.state_unemploy}</p>
            <h4>本市失业率</h4>
            <p>{data.unemploy}</p>
            <h4>全美犯罪指数</h4>
            <p>{data.us_crime}</p>
            <h4>本市犯罪指数</h4>
            <p>{data.crime}</p>
          </div>
        </div>

        <div className='city-detail-wrap'>
          <h3>族裔比例</h3>
          <PieChart data={this.buildPieChartData(data)} options={this.chartOptions()} width="600" height="250"/>
          <ul>
            <li><span className='color-sq'></span>白人</li>
            <li><span className='color-sq'></span>亚裔</li>
            <li><span className='color-sq'></span>非洲裔</li>
            <li><span className='color-sq'></span>西班牙裔</li>
            <li><span className='color-sq'></span>其他</li>
          </ul>
        </div>

      </div>
    );
  }
});

module.exports = CityInfo;