import React, { PropTypes } from 'react'
import _ from 'lodash'

//const Login = React.createClass({
//  render () {
//    return (
//      <div>
//        <form method="post" action="/login">
//          <p>
//            <label>用户名:
//              <input type="username" name="username" value={this.state.username} onChange={this.handleChange1} />
//            </label>
//          </p>
//          <p>
//            <label>密码:
//              <input type="password" name="password" value={this.state.password} onChange={this.handleChange2} />
//            </label>
//          </p>
//          <p>
//            <button type="submit">登录</button>
//          </p>
//        </form>
//        {
//          this.props.msg && <p>{this.props.msg}</p>
//        }
//      </div>
//    )
//  },
//
//  getInitialState() {
//    return {
//      username:'',
//      password:''
//    }
//  },
//
//  handleChange1: function(event) {
//    this.setState({username: event.target.value});
//  },
//
//  handleChange2: function(event) {
//    this.setState({password: event.target.value});
//  }
//})

// 全地址登录方案
import {NetApi} from '../common/net-api'
const Login = React.createClass({
  render () {
    return (
      <div>
        <button onClick={this.login}>登录</button>
        {
          this.props.msg && <p>{this.props.msg}</p>
        }
      </div>
    )
  },

  getInitialState() {
    return {
      username:'',
      password:''
    }
  },

  handleChange1: function(event) {
    this.setState({username: event.target.value});
  },

  handleChange2: function(event) {
    this.setState({password: event.target.value});
  },

  login() {
    let info = {username: 'cjj', password: 'test'}
    NetApi.get('POST', '/login', info, function(err, data) {
      if(err) {
        console.log('调用出错.......')
      } else {
        console.log(data)
        window.location.href='http://localhost:8001/home'
      }
    });
  }
})

export { Login }
