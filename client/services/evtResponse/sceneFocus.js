import keyResponse from '_utils/interaction/keyResponse'
import store from 'store'

let refocusSceneOnShiftKeyUp = false
keyResponse('shift', () => {
  if (store.getState().meta.sceneIsFocussed) {
    store.dispatch('UNFOCUS_SCENE')
    refocusSceneOnShiftKeyUp = true
  }
})

keyResponse('shift', () => {
  if (refocusSceneOnShiftKeyUp) {
    store.dispatch('FOCUS_SCENE')
    refocusSceneOnShiftKeyUp = false
  }
}, 'keyup')

document.addEventListener('pointerlockchange', () => {
  if (!document.pointerLockElement) store.dispatch('UNFOCUS_SCENE')
})
