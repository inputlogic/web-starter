import {request} from 'wasmuth'
import {dispatch, set} from '/store'

/**
 * Stateful Request:
 * Make http request and keep it in the state.
 * options:
 * - withProgress (Boolean) will store request progress in state
 */
export default (args, options = {}) => {
  // TODO: remove the nosafaricache query and make api support Cache-Control: no-cache header.
  const {promise, xhr} = request({...args, url: `${args.url}&nosafaricache=${Math.random()}`})
  // const {promise, xhr} = request(args)
  const identifier = args.method ? `${args.method}:${args.url}` : args.url
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
  // const authToken = getState().authToken
  const authToken = window.localStorage.getItem('token')
  return authToken ? {Authorization: `Token ${authToken}`} : {}
}
