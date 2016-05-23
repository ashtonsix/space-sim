import React from 'react'
import THREE from 'three'
import vertexShader from './sky.gl.vert'
import fragmentShader from './sky.gl.frag'

const Skydome = () => {
  const uniforms = {
    topColor: {type: 'c', value: new THREE.Color(0xff8844)},
    bottomColor: {type: 'c', value: new THREE.Color(0xffffff)},
    offset: {type: 'f', value: 33},
    exponent: {type: 'f', value: 0.6},
  }

  return (
    <mesh>
      <sphereGeometry
        radius={500}
        widthSegments={32}
        heightSegments={15}
      />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.BackSide}
      />
    </mesh>
  )
}

export default Skydome
