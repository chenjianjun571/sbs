import React, { PropTypes } from 'react'
import _ from 'lodash'
import {NetApi} from '../common/net-api'

const Home = React.createClass({
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

    //NetApi.get('GET', '/home', {Name:"sanmao",Password:"sanmaoword"}, function(err, data) {
    //  if(err) {
    //    console.log('调用出错.......')
    //  } else {
    //    console.log('')
    //  }
    //});

    NetApi.get('POST', '/home', {Name:"sanmao",Password:"sanmaoword"}, function(err, data) {
      if(err) {
        console.log('调用出错.......')
      } else {
        console.log('')
      }
    });
  }
})

export { Home }
