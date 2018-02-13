import {createStore} from 'redux'
import {watchStore} from 'wasmuth'
import {composeWithDevTools} from 'redux-devtools-extension'

import {pathReducer, actions} from '/util/pathReducer'
import withStateUtil from '/util/withState'

import {DEBUG} from '/settings'

const combine = (reducers) => (state, action) =>
  reducers.reduce(
    (newState, reducer) => reducer(newState, action),
    state
  )

const initialState = {
  token: window.localStorage.getItem('token'),
  accountStatus: window.localStorage.getItem('accountStatus'),
  dropdowns: {},
  modal: null,
  invalidatedRequests: {}
}

const reducers = [
  pathReducer
]

if (DEBUG) {
  reducers.push((state, {type, payload = {}}) =>
    console.log(type, payload.path, payload.value) || state)
}

export const store = createStore(
  combine(reducers),
  initialState,
  composeWithDevTools()
)
export const dispatch = store.dispatch
export const getState = store.getState
export const subscribe = store.subscribe
export const set = actions.set
export const update = actions.update
export const remove = actions.remove
export const watchPath = watchStore(store)
export const withState = withStateUtil
export default store
