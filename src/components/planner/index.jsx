import React, { PropTypes } from 'react'
import _ from 'lodash'
import { NetApi } from '../../common/net-api'

/*
策划师主页
* */
const PlannerIndex = React.createClass({
  render() {
    return (
      <div>nihao</div>
    )
  },

  componentDidMount: function() {
    NetApi.get('/api',function(err, data){
      console.log('~~~~~~~~~~')
    })
  },
});

export { PlannerIndex }
