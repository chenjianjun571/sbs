import Koa from 'koa'
import ejsEngine from 'koa-ejs'
import Path from 'path'
import Favicon from 'koa-favicon'
import Logger from 'koa-logger'
import StaticFile from 'koa-static'
import bodyParser from 'koa-bodyparser'
import thunkify from 'thunkify-wrap'
import Boom from 'boom'
import { loginRouter, busRouter } from './routes'
import _ from 'lodash'

import se from './src/server/thinky/session_manager'
const SessionUtil = se.Instance()
var session = require('koa-generic-session')

const ReactServer = Koa()
/**
初始化模板引擎 使用ejs作为页面引擎
可以在中间件中用this.render('templateName',jsonData)
来生成页面
api请查看 [http://www.embeddedjs.com/]
**/
ejsEngine(ReactServer, {
  root: Path.join(__dirname, 'views'),
  layout: 'layout',
  viewExt: 'html',
  cache: true,
  debug: true
})

process.env.NODE_ENV === 'development' && ReactServer.use(Logger()) // 只有在NODE_ENV为development才加载日志
ReactServer.use(Favicon(__dirname + '/assets/images/favicon.png')) // favico
ReactServer.use(StaticFile('./assets',{'maxage':3*60*1000})) // 其他静态资源：js/images/css
ReactServer.use(bodyParser());


var connection = require('./src/server/thinky/session_story')
var sessionStore = new connection()
ReactServer.keys = ['jsbn-bus'];
ReactServer.use(session({
  store: sessionStore,
  cookie: {
    httpOnly: true,
    path: '/',
    overwrite: true,
    signed: true,
    maxAge: 30 * 60 * 1000 //毫秒 30分钟
  }
}));


// 如果是进入登录界面,是不需要判断sid的
ReactServer.use(loginRouter.routes())

// 进入业务以后先验证是否登录
ReactServer.use(function*(next) {
  // 判断sessionid是否存在 每次操作激活一下cookie的过期时间
  if(this.session.sid) {
    var dt = new Date();
    dt.setMinutes(dt.getMinutes() + 30);
    this.session.cookie.expires = dt;
    console.log('session 存在....')
  } else {
    this.redirect('/login')
  }

  yield next
})

// 业务路由
ReactServer.use(busRouter.routes())

/**服务器异常处理**/
if (process.env.NODE_ENV === 'test') {
  module.exports = ReactServer.callback();
} else {
  ReactServer.listen(8001);
  console.log('open http://localhost:8001')
}

ReactServer.on('error', function (err) {
  console.log(err.stack)
})
