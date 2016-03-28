import React, { PropTypes } from 'react'
import _ from 'lodash'
import {NetApi} from '../src/common/net-api'

const Test = React.createClass({
  render () {
    return (
      <div>
        <button onClick={this.handle}>test</button>
      </div>
    )
  },

  handle() {
    // localStorage 存储数据在客户端
    //let loUser = localStorage.getItem("user") || "";
    localStorage.setItem('user','yourValue');

    //NetApi.get('GET', '/test', {Name:"sanmao",Password:"sanmaoword"}, function(err, data) {
    //  if(err) {
    //    console.log('调用出错.......')
    //  } else {
    //    console.log('')
    //  }
    //});

    NetApi.get('POST', '/test', {Name:"sanmao",Password:"sanmaoword"}, function(err, data) {
      if(err) {
        console.log('调用出错.......')
      } else {
        console.log('')
      }
    });
  }
})

export { Test }
