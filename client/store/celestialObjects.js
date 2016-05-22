import {createReducer} from '_utils/redux-plus'
import api from '_utils/api'

export default createReducer({
  GET_DATA: api('GET', '/api/data/solar-system'),
  GET_DATA_SUCCESS: (state, {payload}) => ({planets: payload}),
}, {planets: []})
