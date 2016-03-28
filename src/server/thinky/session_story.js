/**
 * Created by chenjianjun on 16/3/23.
 */
var _ = require('lodash')
var debug = require('debug')('session:generic-session-rethinkdb')
var Sessions = require('./module/sessions')

function ThinkySession() {
  this.model = Sessions
}

ThinkySession.prototype.get = function* (sid) {
  debug('get', sid)
  var res = yield this.model.filter({sid:sid}).run()
  debug('got', res[0])
  return res[0]
}

ThinkySession.prototype.set = function* (sid, session) {
  // check if there is a doc with that id
  debug('set', sid, session)
  var res = yield this.model.filter({sid:sid}).run()
  if(res[0]) {
    // 更新
    return yield this.model.filter({sid:sid}).update({cookie:session.cookie, updateTime:session.cookie.expires})
  } else {
    var dt = new Date();
    dt.setMilliseconds(dt.getMilliseconds() + session.cookie.maxage);
    // 插入
    let payload = _.extend({
      sid: sid,
      updateTime: dt
    }, session)

    return yield this.model.save(payload)
  }
}

ThinkySession.prototype.destroy = function* (sid) {
  debug('destroy', sid)
  return yield this.model.filter({sid: sid}).delete();
}

module.exports = ThinkySession
