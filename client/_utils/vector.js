/**
 * Light version of THREE.Vector3
 * Kind of like an enum of pointers to values: v[0] = v.x, v[1] = v.y ...
 * Bieng an array enables easy serialization
 */

const helpers = {}

const vector = (_vec = [0, 0, 0], ordering = 'xyzw') => {
  const vec = ordering.split('')
    .map((k, i) => _vec[i] !== undefined ? _vec[i] : _vec[k])
    .filter(v => v !== undefined)

  vec.forEach((v, i) =>
    Object.defineProperty(vec, ordering[i], {
      get() { return vec[i] },
      set(val) { vec[i] = val },
    })
  )

  Object.assign(vec, _.mapValues(helpers, helper => helper.bind(null, vec)))

  return vec
}

export const mapVectors = _.curry(
  (f, _vec0 = [0, 0, 0], _vec1 = [0, 0, 0]) => {
    const vec0 = vector(_vec0)
    const vec1 = vector(_vec1)
    return vector(vec0.map((v, i) => f(v, vec1[i])))
  },
  3
)
export const mapBy = mapVectors
helpers.mapBy = _.rearg(mapVectors, [1, 0, 2])

export const addVectors = mapVectors((v0, v1) => v0 + v1)
export const add = addVectors
helpers.add = addVectors

export const subVectors = mapVectors((v0, v1) => v0 - v1)
export const sub = subVectors
helpers.sub = subVectors

export const subtractVectors = mapVectors((v0, v1) => v0 - v1)
export const subtract = subtractVectors
helpers.subtract = subtractVectors

export const multiplyVectors = mapVectors((v0, v1) => v0 * v1)
export const multiply = multiplyVectors
helpers.multiply = multiplyVectors

export const vectorProduct = (...args) => multiplyVectors(...args).reduce((pv, v) => pv + v)
export const product = vectorProduct
helpers.product = vectorProduct

export const vectorSum = (...args) => addVectors(...args).reduce((pv, v) => pv + v)
export const sum = vectorSum
helpers.sum = vectorSum

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

/**
 * Useful for converting deltas from world co-ordinates (z, x, y) to local
 * co-ordinates (up, down, left, right, forwards, backwards)
 * @param  _vec   [x, y, z] (distance)
 * @param  _euler [x, y, z] (radians)
 * @return        [x, y, z] (distance)
 */
export const translateVectorByEuler = (_vec, _euler) => {
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

export const vectorMagnitude = vec =>
  vector(vec.map(val => val ** 2).reduce((pv, v) => pv + v, 0) ** 0.5)
export const magnitude = vectorMagnitude
export const mag = vectorMagnitude
helpers.magnitude = vectorMagnitude
helpers.mag = vectorMagnitude

export default vector
