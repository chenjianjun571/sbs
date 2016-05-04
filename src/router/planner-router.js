/**
 * Created by chenjianjun on 16/4/29.
 */

import Router from 'koa-router'
import React, { PropTypes } from 'react'
import _ from 'lodash'
import { renderToString } from 'react-dom/server'

const plannerRouter = new Router()

plannerRouter.get('/planner/index', function *(next) {
  yield this.render('modules/default', {'main': 'planner/index'})
});

plannerRouter.get('/api', function *(next) {
  this.body={flg:true}
});

export { plannerRouter }
