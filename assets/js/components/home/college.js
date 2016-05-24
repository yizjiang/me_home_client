'use strict';

var React = require('react');


var School = React.createClass({

  render: function () {
    return (
      <div className='school-wrap'>
        <div className='school-detail-wrap-name'>
          <h3>学校</h3>
          <p><a href={this.props.url}>{this.props.name}</a></p>
        </div>
        <div className='school-detail-wrap'>
          <h3>录取率</h3>
          <p>{this.props.admin_rate}%</p>
        </div>
        <div className='school-detail-wrap'>
          <h3>排名</h3>
          <p>{this.props.rank}</p>
        </div>
        <div className='school-detail-wrap'>
          <h3>在校学生</h3>
          <p>{this.props.enrolled_student}人</p>
        </div>
        <div className='school-detail-wrap'>
          <h3>女性比例</h3>
          <p>{this.props.female_pct}%</p>
        </div>
        <div className='school-detail-wrap'>
          <h3>教师学生比</h3>
          <p>{this.props.student_teacher_ratio}</p>
        </div>
      </div>
      )
  }
})

module.exports = School;