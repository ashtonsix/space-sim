/**
 * Light version of THREE.Vector3
 * Kind of like an enum of pointers to values: v[0] = v.x, v[1] = v.y ...
 * Bieng an array enables easy serialization
 */

const helpers = {}

const vector = (_v = [0, 0, 0]) => {
  const values = {
    x: _v[0] !== undefined ? _v[0] : _v.x,
    y: _v[1] !== undefined ? _v[1] : _v.y,
    z: _v[2] !== undefined ? _v[2] : _v.z,
  }
  const v = []
  const map = {0: 'x', 1: 'y', 2: 'z', x: 'x', y: 'y', z: 'z'}

  _.mapValues(map, (k, kI) =>
    Object.defineProperty(v, kI, {
      enumerable: typeof kI === 'number',
      get() { return values[k] },
      set(val) { values[k] = val },
    })
  )

  Object.assign(v, _.mapValues(helpers, helper => helper.bind(null, v)))

  return v
}

export const addVectors = (_v0 = [0, 0, 0], _v1 = [0, 0, 0]) => {
  const v0 = vector(_v0)
  const v1 = vector(_v1)
  return vector(v0.map((v, i) => v + v1[i]))
}
helpers.add = addVectors

const {cos, sin} = Math
const splitHypotenuse = [
  (hypotenuse, theta) => {
    const x = cos(theta.y) * hypotenuse
    const z = -sin(theta.y) * hypotenuse
    return vector([x, 0, z])
  },
  (hypotenuse, theta) => {
    const y = cos(theta.x) * hypotenuse
    const zxHypotenuse = sin(theta.x) * hypotenuse
    const x = sin(theta.y) * zxHypotenuse
    const z = cos(theta.y) * zxHypotenuse
    return vector([x, y, z])
  },
  (hypotenuse, theta) => {
    const y = -(sin(theta.x) * hypotenuse)
    const zxHypotenuse = cos(theta.x) * hypotenuse
    const x = sin(theta.y) * zxHypotenuse
    const z = cos(theta.y) * zxHypotenuse
    return vector([x, y, z])
  },
]

export const translateVectorByEuler = (_vec, _euler) => {
  // ({w: [0, 0, -1], s: [0, 0, 1],
  //   a: [-cos(r.z), -sin(r.z), 0], d: [cos(r.z), sin(r.z), 0],
  //   r: [-sin(r.z), cos(r.z), 0], f: [sin(r.z), -cos(r.z), 0]})
  const rz = _euler[2]
  const vec = [
    (cos(rz) * _vec[0]) + (sin(rz) * _vec[1]),
    (sin(rz) * _vec[0]) - (cos(rz) * _vec[1]),
    _vec[2]]
  const euler = vector(_euler)
  const result = _.chain(vec)
    .map((val, i) => splitHypotenuse[i](val, euler))
    .reduce(addVectors)
    .value()

  return result
}
helpers.translateByEuler = translateVectorByEuler

export default vector
