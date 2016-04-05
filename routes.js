/**
 * Created by chenjianjun on 16/3/29.
 */
import Router from 'koa-router'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import { renderToString } from 'react-dom/server'

const DBUtil = require("./server/db/mysql/db-helper.js");
import sessionManager from './server/db/rethinkdb/session-manager.js'
const SessionManager = sessionManager.Instance();

import { Login } from './components/login.jsx'
import { Home } from './components/home.jsx'

// 登录注销路由
const loginRouter = new Router()
loginRouter.post('/login', function *(next) {
  let username = this.request.body.username;
  // 从数据库判断用户名和密码是否存在
  let result = yield DBUtil.execSql("select password from user where userName='"+username+"'");
  console.log(JSON.stringify(result))
  if(result[0]) {
    if (result[0].password === this.request.body.password) {
      // 从缓存里面清理掉这个user的session
      yield SessionManager.deleteSessionWithUsername(username);
      // 登录成功,保存用户session信息
      let user = {
        permissions:1, //TODO:: 该用户的权限
        username:username
      };
      this.session.user = user;
      this.body = {success:true, msg:'登录成功'}//this.redirect('')
    } else {
      this.body = {success:false, msg:'登录失败'}
    }
  } else {
    this.body = {success:false, msg:'登录失败'}
  }
})

loginRouter.get('/login', function *(next) {
  yield this.render('modules/default', { 'reactMarkup': renderToString(<Login />), 'main': 'login'})
});

loginRouter.get('/logout', function *(next) {
  this.session = null;
  this.body = 'ok';
});

// 需要授权访问的页面
const busRouter = new Router()
busRouter.get('/home', function *(next) {
  yield this.render('modules/default', { 'reactMarkup': renderToString(<Home />), 'main': 'home'})
});


export { loginRouter, busRouter }
