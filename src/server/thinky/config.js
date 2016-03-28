/**
 * Created by chenjianjun on 16/3/5.
 */
const DBConfig = {
  rethink:{
    db:'sessions',
    host:'127.0.0.1',
    port:'28015'
  }
};
const Thinky = require('thinky')(DBConfig.rethink);

module.exports = {
  'DBConfig':DBConfig,
  'Thinky':Thinky
};
