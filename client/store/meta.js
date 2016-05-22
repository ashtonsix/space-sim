import {createReducer} from '_utils/redux-plus'

export default createReducer({
  TICK: state => ({
    ...state,
    age: state.age + 1,
  }),
}, {age: 0})
