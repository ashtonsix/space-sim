const {abs, PI} = Math

export const volume = radius => (4 * PI * radius ** 3) / 3
// pass points as array: distance([0, 1, 2], [x, y, z])
// any dimension is fine
export const distance = (p1, p2) =>
  _.zip(p1, p2).map(([i1, i2]) => abs(i1 - i2) ** 2).reduce((pv, v = 0) => pv + v) ** 0.5
