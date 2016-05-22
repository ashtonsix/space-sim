import React from 'react'
import ReactDOM from 'react-dom'
import store from 'store'

import Root from './views/Root'

ReactDOM.render(
  <Root />,
  document.getElementById('root')
)

function tick(i) {
  store.dispatch('TICK')
  if (i < 10) window.requestAnimationFrame(tick.bind(null, i + 1))
}

tick(0)
