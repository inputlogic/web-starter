import {createStore} from 'redux'
import {watchStore, safeWindow} from 'wasmuth'
import {composeWithDevTools} from 'redux-devtools-extension'

import {pathReducer, actions} from '/util/pathReducer'

import {DEBUG} from '/settings'

const keepStateOnLogout = ['loadedImages', 'route']

const combine = reducers => (state, action) =>
  reducers.reduce(
    (newState, reducer) => reducer(newState, action),
    state
  )

const initialState = {
  // the line below breaks logout :/
  // ...(typeof window !== 'undefined') ? window.__initialStore : {},
  token: safeWindow('localStorage.getItem', 'token'),
  accountStatus: safeWindow('localStorage.getItem', 'accountStatus'),
  dropdowns: {},
  invalidatedRequests: {}
}

const reducers = [
  (state, {type}) => type === 'LOGOUT' ? {
    ...W.pick(keepStateOnLogout, state),
    ...W.without(['token'], initialState)
  } : state,
  pathReducer
]

export const store = createStore(
  combine(reducers),
  initialState,
  DEBUG ? composeWithDevTools() : undefined
)
export const dispatch = store.dispatch
export const getState = store.getState
export const subscribe = store.subscribe
export const set = actions.set
export const update = actions.update
export const remove = actions.remove
export const watchPath = watchStore(store)
export default store
