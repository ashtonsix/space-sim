/**
 * An easy way to create api requests in reducers (using redux-loop)
 *
 * api('POST', '/api/endpoint')
 * api('POST', '/api/endpoint', {headers: {Authentication: 'password'}})
 * api({method: 'POST', url: '/api/endpoint', headers: {Authentication: 'password'}})
 * api((state, {payload}) => xr.post('/api/endpoint', payload))
 * api('POST', '/api/endpoint', (state) => ({counter: state.counter + 1, ...state}))
 */

import xr from 'xr'
import {loop} from '_utils/redux-plus'

const generateRequest = (config) =>
  typeof config === 'function' ? config :
    (state, {payload}) =>
      xr({[config.method === 'GET' ? 'params' : 'data']: payload, ...config})

const api = (requestConfig, updateConfig = s => _.get(s, '0', s)) => (state, action) => {
  const effect = () =>
    generateRequest(requestConfig)(state, action).then(
      response => ({type: `${action.type}_SUCCESS`, payload: response.data, meta: {response}}),
      error => ({type: `${action.type}_FAILURE`, payload: error}))
  return loop(updateConfig(state, action), effect)
}

export default (...args) =>
  typeof args[0] === 'string' && typeof args[1] === 'string' ?
    typeof args[2] !== 'function' ?
      api({method: args[0], url: args[1], ...args[2]}, args[3]) :
      api({method: args[0], url: args[1]}, args[2]) :
    api(...args)
