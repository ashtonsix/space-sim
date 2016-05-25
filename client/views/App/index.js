import React from 'react'
import {connect} from '_utils/redux-plus'
import Scene from '../Scene'

const App = connect(state => ({state}))(
({location, state}) => (
  <div>
    <div
      style={{
        padding: '20px 0',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Scene />
    </div>
    <pre>{JSON.stringify(location, null, 2)}</pre>
    <pre>{JSON.stringify(state, null, 2)}</pre>
  </div>
))

export default App
