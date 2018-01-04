import {createStore} from 'redux'
import {watchStore} from 'wasmuth'
import {composeWithDevTools} from 'redux-devtools-extension'

import {
  pathReducer,
  actions
} from '/util/pathReducer'
import mapStateToPropsUtil from '/util/mapStateToProps'

const initialState = {
  url: window.location.pathname,
  dropdowns: {},
  modal: null
}

export const store = createStore(
  pathReducer,
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
export const mapStateToProps = mapStateToPropsUtil
export default store
