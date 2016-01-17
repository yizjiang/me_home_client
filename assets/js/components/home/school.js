'use strict';

var React = require('react');


var School = React.createClass({

  render: function () {
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>学校</th>
              <th>类型</th>
              <th>评分</th>
              <th>年级</th>
              <th>距离</th>
              <th>教师学生比</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{this.props.name}</td>
              <td>{this.props.school_type}</td>
              <td>{this.props.rating}</td>
              <td>{this.props.grade}</td>
              <td>{this.props.distance}</td>
              <td>{this.props.student_teacher_ratio}</td>
            </tr>
          </tbody>
        </table>
      </div>
      )
  }
})

module.exports = School;