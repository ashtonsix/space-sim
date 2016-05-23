import React from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'
import {connect} from '_utils/redux-plus'
import store from 'store'
import Camera from './Camera'
import Lights from './Lights'
import Planets from './Planets'
import Sky from './Sky'

const Scene = connect(
  state => ({planets: state.celestialObjects.planets})
)(
({planets}) => {
  const width = window.innerWidth
  const height = window.innerHeight
  const fog = new THREE.Fog(0xffffff, 1, 5000)
  fog.color.setHSL(0.6, 0, 1)

  return (
    <React3
      mainCamera="camera"
      width={width}
      height={height}
      alpha
      clearAlpha={0}
      onAnimate={() => store.dispatch('TICK')}
    >
      <scene
        fog={fog}
      >
        <Camera aspect={width / height} />
        <Lights />
        <Planets planets={planets} />
        <Sky />
      </scene>
    </React3>
  )
})

export default Scene
