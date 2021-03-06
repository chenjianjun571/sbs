/**
 * Created by chenjianjun on 16/3/23.
 */
var Sessions = require("./module/sessions.js");
import {Thinky} from '../db-config.js'
var r = Thinky.r
var _ = require('lodash')

var Session = null;
function SessionManager() {};

exports.Instance = function() {
  if (Session == null) {
    Session = new SessionManager();
    // 定时器，定时清理过期session 30分钟一次
    setInterval(function() {
      console.log('清理过期session......');
      Sessions.filter(r.row('updateTime').lt(r.now())).delete().then(function(result) {});
    }, 60000*30);
  }

  return Session;
}

