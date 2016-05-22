import {combineReducers} from '_utils/redux-plus'
import meta from './meta'
import celestialObjects from './celestialObjects'

export default combineReducers({
  meta,
  celestialObjects,
})
