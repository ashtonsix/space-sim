import React from 'react'

const createPlanet = ({name, position, radius}) => (
  <mesh
    key={name}
    position={new THREE.Vector3(...position.map(v => v / 5000000))}
  >
    <sphereGeometry
      radius={radius / 250000 + 0.2}
      widthSegments={32}
      heightSegments={32}
    />
    <meshPhongMaterial
      color={name === 'earth' ? 0x81b7e7 : 0xcccccc}
      emissive={name === 'sun' ? 0x333333 : 0x000000}
    />
  </mesh>
)

export default ({planets}) => {
  const planetElements = planets.map(createPlanet)

  return (
    <group>
      {planetElements}
    </group>
  )
}
