/**
 * Created by chenjianjun on 16/3/23.
 */
var Sessions = require("./module/sessions.js");
var env=require("./config");
var r = env.Thinky.r

var session = null;

function SessionManager() {};

SessionManager.prototype.deleteSessionWithUsername = function(username) {
  return new Promise(function(resolve, reject){
    Sessions.filter({user: {username:username}}).delete().then(function(result) {
      resolve(result);
    });
  });
};

exports.Instance = function() {
  if (session == null) {
    session = new SessionManager();
    // 定时器，定时清理过期session 一分钟一次
    setInterval(function() {
      console.log('清理过期session......');
      Sessions.filter(r.row('updateTime').lt(r.now())).delete().then(function(result) {});
    }, 60000*1);
  }

  return session;
}

