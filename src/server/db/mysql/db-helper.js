/**
 * Created by chenjianjun on 16/3/29.
 */

import { DBConfig } from '../db-config'
import mysql from 'mysql2'

var pool = mysql.createPool(DBConfig.mysql);

//执行所有sql语句 数据带绑定操作
function execQuery(sql, values, callback) {
  if (typeof values === 'function') {
    callback = values;
    values = undefined;
  }

  pool.getConnection(function(err, connection) {
    if (err) {
      console.log('数据库连接获取异常！');
      callback(err);
    } else {
      connection.query(sql, values, function(err, rows) {
        release(connection);
        if (err) {
          console.log('SQL语句执行错误:' + err);
          callback(err);
        } else {
          callback(null,rows);
        }
      });
    }
  });
}

function release(connection) {
  try {
    connection.release(function(error) {
      if (error) {
        console.log('关闭数据库连接异常！');
      }
    });
  } catch (err) {}
}

/**
 * 通过表名和字段值搜索
 * @param tablename 数据库表名
 * @param values    搜索参数{id:5}  单条件,不支持多条件
 * @returns {Promise}
 */
exports.selectObject = function(tablename, values){
  return new Promise(function(resolve, reject){
    var sql = 'select * from ?? where ?';
    execQuery(sql,[tablename, values], function(err, rows){
      if(err){
        reject(err);
      }else{
        resolve(rows);
      }
    })
  });
}

/**
 * 通过表名和字段值更新和搜索条件
 * @param tablename 数据库表名
 * @param values    更新后的字段值{nameName:'123',**:''};
 * @param id        条件参数{id:4}  单条件,不支持多条件
 * @returns {Promise}
 */
exports.updateObject = function(tablename, values, id) {
  return new Promise(function(resolve, reject){
    var sql = 'UPDATE ?? SET ? WHERE ?';
    execQuery(sql,[tablename, values, id], function(err, result){
      if(err){
        reject(err);
      }else{
        resolve(result);
      }
    })
  });
}

/**
 * 插入记录值
 * @param tablename 数据库表名
 * @param values    插入的记录值{password:'123',name:'123'};
 * @returns {Promise}
 */
exports.addObject = function(tablename, values) {
  return new Promise(function(resolve, reject) {
    var sql = 'INSERT INTO ?? SET ?';
    execQuery(sql, [tablename, values], function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }

    });
  });
}

/**
 * 删除记录
 * @param tablename 数据库表名
 * @param values    满足条件的字段值{id:4}  单条件,不支持多条件
 * @returns {Promise}
 */
exports.deleteObject = function(tablename, values) {
  return new Promise(function(resolve, reject) {
    var sql = 'DELETE FROM ?? WHERE ?';
    execQuery(sql, [tablename, values], function(err, result) {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }

    });
  });
}

/**
 * 用户自定义sql文执行
 * @param sql
 * @returns {Promise}
 */
exports.execSql = function(sql){
  return new Promise(function(resolve, reject){
    execQuery(sql, function(err, result){
      if(err) {
        reject(err);
      } else {
        resolve(result);
      }
    })
  });
}
