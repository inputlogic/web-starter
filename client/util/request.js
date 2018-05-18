import {request} from 'wasmuth'
import getStorageItem from '/util/getStorageItem'
import {dispatch, set, getState} from '/store'
import {DEBUG} from '/settings'

/**
 * Stateful Request:
 * Make http request and keep it in the state.
 * options:
 * - withProgress (Boolean) will store request progress in state
 * - maxAge (Number) milliseconds before making a new request
 */
export default (args, options = {}) => {
  const identifier = args.method ? `${args.method}:${args.url}` : args.url

  if (typeof window !== 'undefined' && options.maxAge != null && options.maxAge > 0) {
    const state = getState()
    const existing = (state.requests || {})[identifier]
    if (existing) {
      const current = Date.now()
      const elapsed = current - existing.timestamp
      if (elapsed < options.maxAge) {
        if (DEBUG) {
          console.warn('Using cached result for: ', identifier)
        }
        return Promise.resolve({xhr: {}})
      }
    }
  }

  const {promise, xhr} = request({...args})
  dispatch(set(['requests', identifier, 'timestamp'], Date.now()))

  if (options.withProgress) {
    xhr.onprogress = (progress) => {
      const {loaded, total} = progress
      dispatch(set(['requests', identifier, 'progress'], {loaded, total}))
    }
  }

  const newPromise = new Promise((resolve, reject) => {
    promise
      .then(response => {
        dispatch(set(['requests', identifier, 'result'], response))
        resolve(response)
      })
      .catch(error => {
        dispatch(set(['requests', identifier, 'error'], error))
        reject(xhr)
      })
  })

  return {promise: newPromise, xhr}
}

export const getAuthHeader = () => {
  const authToken = getStorageItem('token')
  return authToken ? {Authorization: `Token ${authToken}`} : {}
}
