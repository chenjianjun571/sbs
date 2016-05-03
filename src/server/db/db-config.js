/**
 * Created by chenjianjun on 16/3/29.
 */

const DBConfig = {

  'mysql': {
    'host': '192.168.1.2',
    'port': '3306',
    'database': 'test',
    'user': 'root',
    'password': 'root',
    //'charset': 'utf-8',
    'connectionLimit': 5,
    'supportBigNumbers': true,
    'bigNumberStrings': true
  },

  'rethink': {
    db:'sessions',
    host:'127.0.0.1',
    port:'28015'
  }

}

const Thinky = require('thinky')(DBConfig.rethink);

export { DBConfig, Thinky }
