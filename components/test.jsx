import React, { PropTypes } from 'react'
import _ from 'lodash'

const Test = React.createClass({
  render () {
    return (
      <div>
        <button onClick={this.handle}>test</button>
      </div>
    )
  },

  handle() {
    fetch('/test', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstParam: 'yourValue',
        secondParam: 'yourOtherValue',
      })
    })
  }

})

export { Test }
