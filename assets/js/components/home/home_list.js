'use strict';
var React = require('react');

var HomeList = React.createClass({
  render: function () {
    return (
      <div className='homelistDiv'>
         <ul>
         { this.props.list.map(function(value){
           return <li>
                    <a href={'#/home_detail/' + value.id}>
                      {value.addr1 + ", " + value.city + ": " + value.home_type + " $" + value.price}
                    </a>
                  </li>
           })
         }
         </ul>
      </div>
      );
  }
});

module.exports = HomeList;