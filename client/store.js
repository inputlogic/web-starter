import {createStore} from 'redux'
import {watchStore} from 'wasmuth'
import {composeWithDevTools} from 'redux-devtools-extension'

import {pathReducer, actions} from './util/pathReducer'
import getStorageItem from './util/getStorageItem'

import {DEBUG} from '/settings'

const initialState = {
  token: getStorageItem('token'),
  accountStatus: getStorageItem('accountStatus'),
  dropdowns: {},
  invalidatedRequests: {},
  ...(typeof window !== 'undefined') ? window.__initialStore : {}
}

export const store = createStore(
  pathReducer,
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
