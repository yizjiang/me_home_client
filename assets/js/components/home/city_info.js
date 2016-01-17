'use strict';

var React = require('react'),
  PieChart = require("react-chartjs").Pie,
  BarChart = require("react-chartjs").Bar;

var CityInfo = React.createClass({

  buildPieChartData: function (data) {
    var other = 100 - parseInt(data.asian) - parseInt(data.black) - parseInt(data.caucasion) -  parseInt(data.hispanics)
    return [
      {
        value: parseInt(data.asian),
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "亚裔"
      },
      {
        value: parseInt(data.black),
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "非洲裔"
      },
      {
        value: parseInt(data.caucasion),
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "白人"
      },
      {
        value: parseInt(data.hispanics),
        color: "#ff9966",
        highlight: "#ff9966",
        label: '西班牙裔'
      },
      {
        value: parseInt(other),
        color: "#6600ff",
        highlight: "#6600ff",
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
      <div>
        <h3>社区信息:</h3>
        <table>
          <thead>
            <tr>
              <th>平均家庭年收入</th>
              <th>人口</th>
              <th>环境指数</th>
              <th>大学及以上教育</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.income}</td>
              <td>{data.population}</td>
              <td>{data.PMI}</td>
              <td>{data.above_bachelor}</td>
            </tr>
          </tbody>
        </table>
        <h3>城市安全度</h3>
        <table>
          <thead>
            <tr>
              <th>州失业率</th>
              <th>本市失业率</th>
              <th>全美犯罪指数</th>
              <th>本市犯罪指数</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.state_unemploy}</td>
              <td>{data.unemploy}</td>
              <td>{data.us_crime}</td>
              <td>{data.crime}</td>
            </tr>
          </tbody>
        </table>
        <h4>族裔比例</h4>
        <PieChart data={this.buildPieChartData(data)} options={this.chartOptions()} width="600" height="250"/>
        <ul>
          <li><span style={{color:'blue'}}></span>白人</li>
        </ul>

      </div>
    );
  }
});

module.exports = CityInfo;