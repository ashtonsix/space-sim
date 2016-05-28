/**
 * Light version of THREE.Vector3
 * Kind of like an enum of pointers to values: v[0] = v.x, v[1] = v.y ...
 * Bieng an array enables easy serialization
 */

const helpers = {}

const vector = (_vec = 3, _ordering) => {
  const ordering = typeof _ordering === 'string' ? _ordering : 'xyzw'
  const vec = typeof _vec === 'number' ?
    _.range(_vec).fill(0) :
    ordering.split('')
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

export const map = _.curry(
  (f, ..._vectors) => {
    const vectors = _vectors.map(vector)
    if (vectors.find(vec => vec.length !== vectors[0].length)) {
      return console.warning(`Vectors must be same size: [${_.map(vectors, 'length').join(', ')}]`)
    }
    const result = vector(_.range(vectors[0].length)
      .map(i => f(..._.map(vectors, i))))
    return result
  },
  2
)
helpers.map = _.rearg(map, [1, 0])

export const add = map((...values) => values.reduce((pv, v) => pv + v))
export const subtract = map((...values) => values.reduce((pv, v) => pv - v))
export const sub = subtract
export const multiply = map((...values) => values.reduce((pv, v) => pv * v))
export const mult = multiply
export const product = (...args) => multiply(...args).reduce((pv, v) => pv + v)
export const sum = (...args) => add(...args).reduce((pv, v) => pv + v)
export const magnitude = vec => vec.map(val => val ** 2).reduce((pv, v) => pv + v, 0) ** 0.5
export const mag = magnitude
helpers.add = add
helpers.subtract = subtract
helpers.sub = subtract
helpers.multiply = multiply
helpers.mult = mult
helpers.product = product
helpers.sum = sum
helpers.magnitude = magnitude
helpers.mag = magnitude

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
  const result = add(...vec
    .map((val, i) => splitHypotenuse[i](val, euler)))

  return result
}
helpers.translateByEuler = translateVectorByEuler


export default vector
