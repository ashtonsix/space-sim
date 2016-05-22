import React from 'react'
import React3 from 'react-three-renderer'
import THREE from 'three'
import {connect} from '_utils/redux-plus'
import store from 'store'

const Scene = connect(
  state => ({cubeRotation: new THREE.Euler(..._.range(3).map(() => state.meta.age * 0.01))})
)(
class Scene extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.cameraPosition = new THREE.Vector3(0, 0, 5)
    this.firstCubePosition = new THREE.Vector3(0, 0, 0)
    this.secondCubePosition = new THREE.Vector3(2, 0, 2)
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    const box = i => (
      <mesh
        position={this[i ? 'secondCubePosition' : 'firstCubePosition']}
        rotation={this.props.cubeRotation}
      >
        <boxGeometry
          dynamic={false}
          width={1}
          height={1}
          depth={1}
        />
        <meshPhongMaterial
          color={0x00ff00}
        />
      </mesh>
    )

    return (
      <React3
        mainCamera="camera"
        width={width}
        height={height}
        onAnimate={() => store.dispatch('TICK')}
      >
        <scene>
          <perspectiveCamera
            name="camera"
            fov={75}
            aspect={width / height}
            near={0.1}
            far={1000}
            position={this.cameraPosition}
          />
          <pointLight
            color={0xffffff}
            position={this.cameraPosition}
          />
          <ambientLight
            color={0x111111}
            position={this.cameraPosition}
          />
          {box(0)}
          {box(1)}
        </scene>
      </React3>
    )
  }
})

export default Scene
