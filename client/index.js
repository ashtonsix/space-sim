import React from 'react'
import ReactDOM from 'react-dom'
import {browserHistory} from 'react-router'
import store from 'store'

import Root from './views/Root'

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

setTimeout(() => {
  browserHistory.push('/example-location')
  store.dispatch('GET_DATA')
}, 2000)

function tick(i) {
  store.dispatch('TICK')
  if (i < 10) window.requestAnimationFrame(tick.bind(null, i + 1))
}

tick(0)
