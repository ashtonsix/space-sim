import React from 'react'

export default ({aspect}) => (
  <perspectiveCamera
    name="camera"
    fov={75}
    aspect={aspect}
    near={1}
    far={1000}
    position={new THREE.Vector3(0, 0, 150)}
  />
)
