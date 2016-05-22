import {createStore, compose} from '_utils/redux-plus'
import {install} from 'redux-loop'
import reducer from './_reducer'

const enhanceDispatch = next => (r, state) => {
  const s = next(r, state)
  const _dispatch = s.dispatch
  s.dispatch = (action, payload = null, exec = true) => {
    const newAction = typeof action === 'string' ? {type: action, payload} : action
    return exec ? _dispatch(newAction) : newAction
  }
  return s
}

const store = createStore(reducer, compose(
  enhanceDispatch,
  install(),
  window.devToolsExtension ? window.devToolsExtension({actionsBlacklist: ['TICK']}) : f => f,
))

window.SS.store = store
window.SS.dispatch = store.dispatch
window.SS.subscribe = store.subscribe
window.SS.getState = store.getState

export default store
export const {dispatch, subscribe, getState} = store
