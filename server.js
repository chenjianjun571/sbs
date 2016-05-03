/**
 * Created by chenjianjun on 16/3/29.
 */
import Koa from 'koa'
import ejsEngine from 'koa-ejs'
import Path from 'path'
import Favicon from 'koa-favicon'
import Logger from 'koa-logger'
import StaticFile from 'koa-static'
import bodyParser from 'koa-bodyparser'
import thunkify from 'thunkify-wrap'
import Boom from 'boom'
import _ from 'lodash'

const Server = Koa()
/**
 初始化模板引擎 使用ejs作为页面引擎
 可以在中间件中用this.render('templateName',jsonData)
 来生成页面
 api请查看 [http://www.embeddedjs.com/]
 **/
ejsEngine(Server, {
  root: Path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: true,
  debug: true
})
// 只有在NODE_ENV为development才加载日志
process.env.NODE_ENV === 'development' && Server.use(Logger())
// favico
Server.use(Favicon(__dirname + '/assets/images/favicon.png'))
// 其他静态资源：js/images/css
Server.use(StaticFile('./assets',{'maxage':30*60*1000}))
Server.use(bodyParser());
// 配置session
Server.keys = ['jsbn-bus'];

var session = require('koa-generic-session')
var connection = require('./src/server/db/rethinkdb/session-story')
var sessionStore = new connection()
Server.use(session({
  store: sessionStore,
  cookie: {
    httpOnly: true,
    path: '/',
    overwrite: true,
    signed: true,
    maxAge: 30 * 60 * 1000 //毫秒 30分钟
  }
}));

// 登录注销相关的路由
import { loginRouter } from './src/router/login-router'

// 如果是进入登录界面,是不需要判断sid的
Server.use(loginRouter.routes())
Server.use(function*(next) {
  // 判断sid是否存在 每次操作激活一下cookie的过期时间
  if(this.session.sid) {
    var dt = new Date();
    dt.setMinutes(dt.getMinutes() + 30);
    this.session.cookie.expires = dt;
    console.log('session 存在....')
  } else {
    console.log('session 不存在....')
    this.redirect('/login')
  }
  yield next
})

// 其他业务路由
import { plannerRouter } from './src/router/planner-router'
Server.use(plannerRouter.routes())

/**服务器异常处理**/
if (process.env.NODE_ENV === 'test') {
  module.exports = Server.callback();
} else {
  Server.listen(8001);
  console.log('open http://localhost:8001')
}

Server.on('error', function (err) {
  console.log(err.stack)
})
