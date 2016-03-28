/**
 * Created by chenjianjun on 16/2/26.
 */
var env=require("../config");
var type=env.Thinky.type;
var r = env.Thinky.r

// session存储结构
/*
 {
 "cookie": {
     "expires": Tue Mar 22 2016 08:52:10 GMT+00:00 ,
     "httpOnly": true ,
     "maxage": 1800000 ,
     "overwrite": true ,
     "path":  "/" ,
     "signed": true
 } ,
 "id":  "bc1d8ac8-d35b-4d66-846a-fa28d3995e75" ,
 "sid":  "koa:sess:BxzdmV2q8mtsqntTsTUvlAFJhiTbmcEL" ,
 "user": {
    "userName":"",
    "role":1
 }
 }
* */

const Sessions = env.Thinky.createModel('sessions', {
    sid: type.string(),
    cookie: {
        expires: type.date().default(r.now()),
        httpOnly: type.boolean(),
        maxage: type.number(),
        overwrite: type.boolean(),
        path: type.string(),
        signed: type.boolean(),
    },
    user: {
        userName: type.string(),
        role: type.number()
    },
    updateTime: type.date().default(r.now())
})

Sessions.ensureIndex('sid');

module.exports=Sessions;
