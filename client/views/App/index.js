import React from 'react'
import {connect} from '_utils/redux-plus'
import Scene from './Scene'

const App = connect(state => ({state}))(
class App extends React.Component {
  render() {
    return (
      <div>
        <Scene />
        <pre>{JSON.stringify(this.props.location, null, 2)}</pre>
        <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
      </div>
    )
  }
})

export default App
