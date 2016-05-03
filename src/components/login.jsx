import React, { PropTypes } from 'react'
import _ from 'lodash'

// 全地址登录方案
import {NetApi} from '../common/net-api'

// 用户名
const UserName = React.createClass({
  render () {
    return (
      <div className="form-group">
        <div className="user-box">
          <input type="text"
                 className="form-control "
                 placeholder="用户名 "
                 onChange={this.handleChange} />
        </div>
      </div>
    );
  },

  getInitialState: function() {
    return {userName: ''};
  },

  componentDidMount: function() {
    console.log('~~~~~~UserName componentDidMount')
  },

  /*
   在组件接收到新的 props 的时候调用
   用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。
   老的 props 可以通过 this.props 获取到。
   在该函数中调用 this.setState() 将不会引起第二次渲染。

   组件获取到新的属性时执行，这个方法应该将this.props同nextProps进行比较，然后通过this.setState()切换状态
   * */
  componentWillReceiveProps: function(nextProps) {
    console.log('~~~~~~UserName componentWillReceiveProps')
    console.log(JSON.stringify(nextProps))
  },

  /*
   如果确定新的 props 和 state 不会导致组件更新，则此处应该 返回 false。
   组件发生改变时执行，应该将this.props和nextProps、this.stats和nextState进行比较，返回true或false决定组件是否更新
   * */
  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('~~~~~~UserName shouldComponentUpdate')
    console.log(JSON.stringify(nextProps))
    console.log(JSON.stringify(nextState))
    return false;
  },

  handleChange (event) {
    console.log(event.target.value)
    this.setState({userName: event.target.value});
  }
});

// 密码
const Password = React.createClass({
  render () {
    return (
      <div className="form-group">
        <div className="password-box">
          <input type="password " className="form-control " placeholder="密码 "/>
        </div>
      </div>
    );
  }
});

// 门店选择组件
const StoreSelection = React.createClass({
  render () {
    return (
      <div className="select-store-box">
        <div className="btn-group">
          <button type="button" className="btn btn-default">请选择门店</button>
          <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="caret"></span>
            <span className="sr-only">Toggle Dropdown</span>
          </button>
          <ul className="dropdown-menu">
            <li><a href="#">重庆店</a></li>
            <li><a href="#">南川店</a></li>
            <li><a href="#">合川店</a></li>
            <li><a href="#">永川店</a></li>
          </ul>
        </div>
      </div>
    );
  }
});

const Login = React.createClass({
  render () {
    return (
      <div className="login-view container-fluid" >
        <div className="login-model container-fluid">
          <form className="form-horizontal text-center">
            <h1 className="js-page-header text-info">婚庆业务系统</h1>
            <UserName />
            <Password />
            <div className="form-group">
              <StoreSelection />
              <div className="login-box">
                <button className="btn btn-primary  btn-group-justified" onClick={this.handleLogin}>登 录</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  },

  getInitialState: function() {
    return {aa:''};
  },

  componentDidMount: function() {
    console.log('~~~~~~componentDidMount')
  },

  /*
   组件更新前执行，不能在此处调用this.setState()
  * */
  componentWillUpdate: function(nextProps, nextState) {
    console.log('~~~~~~componentWillUpdate')
  },

  /*
   组件更新后执行
  * */
  componentDidUpdate: function(prevProps, prevState) {
    console.log('~~~~~~componentDidUpdate')
  },

  /*
   在组件接收到新的 props 的时候调用
   用此函数可以作为 react 在 prop 传入之后， render() 渲染之前更新 state 的机会。
   老的 props 可以通过 this.props 获取到。
   在该函数中调用 this.setState() 将不会引起第二次渲染。

   组件获取到新的属性时执行，这个方法应该将this.props同nextProps进行比较，然后通过this.setState()切换状态
  * */
  componentWillReceiveProps: function(nextProps) {
    console.log('~~~~~~componentWillReceiveProps')
  },

  /*
   如果确定新的 props 和 state 不会导致组件更新，则此处应该 返回 false。
   组件发生改变时执行，应该将this.props和nextProps、this.stats和nextState进行比较，返回true或false决定组件是否更新
  * */
  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('~~~~~~shouldComponentUpdate')
    console.log(JSON.stringify(nextProps))
    console.log(JSON.stringify(nextState))
    return true;
  },

  handleLogin(e) {
    e.preventDefault();

    var info = {
      username : 'cjj',
      password : 'test'
    };

    NetApi.get('POST', '/login', info, function(err, data) {
      console.log('...........')
      if(err) {
        console.log('调用出错.......')
      } else {
        window.location.href='/planner/index'
      }
    });
  }
});

export { Login }
