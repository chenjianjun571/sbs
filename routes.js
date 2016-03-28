import Router from 'koa-router'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import { renderToString } from 'react-dom/server'

import { Login } from './components/login.jsx'
import { Test } from './components/test.jsx'

const DBUtil = require("./src/server/mysql_db/dbHelper.js");
var Sessions = require('./src/server/thinky/module/sessions')

// 登录注册页面
const loginRouter = new Router()
loginRouter.post('/login', function *(next) {

  let username = this.request.body.username;
  // 从数据库判断用户名和密码是否存在
  let result = yield DBUtil.execSql("select password from user where userName='"+username+"'");
  console.log(JSON.stringify(result))
  if(result[0]) {
    if (result[0].password === this.request.body.password) {
      // 从缓存里面清理掉这个user的session
      yield Sessions.filter({user: {username:username}}).delete();

      // 登录成功,保存用户session信息
      let user = {
        permissions:1, //TODO:: 该用户的权限
        username:username
      };
      this.session.user = user;
      this.redirect('/test')
    } else {
      // 只能通过带参数的方式传递错误码
      this.redirect('/login?err=1')
    }
  } else {
    // 只能通过带参数的方式传递错误码,客户端通过location的方式获取
    this.redirect('/login?err=1')
  }
});

loginRouter.get('/login', function *(next) {
  yield this.render('modules/default', { 'reactMarkup': renderToString(<Login />), 'main': 'login'})
});

loginRouter.get('/logout', function *(next) {
  this.session = null;
  this.body = 'ok';
});

// 需要授权访问的页面
const busRouter = new Router()
busRouter.get('/test', function *(next) {
  yield this.render('modules/default', { 'reactMarkup': renderToString(<Test data="test"/>), 'main': 'test'})
});

export { loginRouter, busRouter }
