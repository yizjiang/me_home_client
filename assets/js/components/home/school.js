'use strict';

var React = require('react');


var School = React.createClass({

  render: function () {
    return (
      <div className='school-wrap'>
        <div className='school-detail-wrap-name'>
          <h3>学校</h3>
          <p>{this.props.name}</p>
        </div>
        <div className='school-detail-wrap'>
          <h3>类型</h3>
          <p>{this.props.school_type}</p>
        </div>
        <div className='school-detail-wrap'>
          <h3>评分</h3>
          <p>{this.props.rating}</p>
        </div>
        <div className='school-detail-wrap'>
          <h3>年级</h3>
          <p>{this.props.grade}</p>
        </div>
        <div className='school-detail-wrap'>
          <h3>距离</h3>
          <p>{this.props.distance} 英里</p>
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