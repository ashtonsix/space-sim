import React from 'react'
import {connect} from '_utils/redux-plus'
import {browserHistory} from 'react-router'

const App = connect(state => ({state}))(
class App extends React.Component {
  constructor() {
    super()
    setTimeout(() => browserHistory.push('/example-location'), 2000)
  }
  render() {
    return (
      <div>
        <pre>{JSON.stringify(this.props.location, null, 2)}</pre>
        <pre>{JSON.stringify(this.props.state, null, 2)}</pre>
      </div>
    )
  }
})

export default App
