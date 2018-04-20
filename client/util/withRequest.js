import {equal, map, path} from 'wasmuth'
import {subscribe, getState, dispatch, update, remove} from '/store'
import request, {getAuthHeader} from '/util/request'
import compose from '/util/compose'
import root from '/util/root'

export const invalidate = url =>
  dispatch(update(['invalidatedRequests'], {[url]: true}))

export const withRequest = mapper => Component => compose({
  componentWillMount () {
    const syncState = () => {
      const requests = mapper(getState(), this.props)
      const changedRequests = this._requests
        ? diff(this._requests, requests, getState().invalidatedRequests)
        : requests

      this._requests = requests
      this._aborts = [...(this._aborts || []), ...performRequests(changedRequests)]
      this._polls = [...(this._polls || []), ...pollRequests(changedRequests)]

      if (requests) {
        const newProps = requestResults(requests)
        if (!equal(newProps, this.state._namespacedState)) {
          this.setState({_namespacedState: newProps})
        }
      }
    }
    syncState()
    this.unsubscribe = subscribe(syncState)
  },
  componentWillUnmount () {
    this.unsubscribe()
    abortRequests(this._aborts || [])
    abortPolls(this._polls || [])
  },
  render ({
    unsubscribe,
    _namespacedState,
    ...props
  }) {
    return <Component {...props} {..._namespacedState} />
  }
})

export default withRequest

const performRequests = requests =>
  map(
    k => {
      if (!requests[k]) {
        return
      }
      return singularRequest(requests[k].url)
    },
    Object.keys(requests)
  )

const pollRequests = requests =>
  map(
    k => {
      if (!requests[k]) {
        return
      }
      if (typeof requests[k].poll === 'number') {
        const id = pollRequest(requests[k].url, requests[k].poll)
        return () => root.clearInterval(id)
      } else if (typeof requests[k].poll === 'boolean') {
        const id = pollRequest(requests[k].url, 5000)
        return () => root.clearInterval(id)
      } else {
        return () => {}
      }
    },
    Object.keys(requests)
  )

const requestResults = requests => {
  const requestsState = getState().requests || {}
  return map(
    (k, v) => {
      const result = requestsState[v.url] || {}
      return v.parse ? v.parse(result) : result['result']
    },
    requests
  )
}

const abortRequests = aborts => map(a => a && a(), aborts)

const abortPolls = aborts => map(a => a && a(), aborts)

/**
 * Returns key / value in r2 when value.url is different in r1 and r2,
 * or if key is not in r1
 * or if `value.url` exists in r3
 */
const diff = (r1, r2, r3) => {
  const diff = {}
  const keys1 = Object.keys(r1)
  const keys2 = Object.keys(r2)
  const keys3 = Object.keys(r3)
  for (let x = 0; x < keys1.length; x++) {
    const k = keys1[x]
    if (path([k, 'url'], r1) !== path([k, 'url'], r2)) {
      diff[k] = r2[k]
    }
    // If this url has been invalidated, let's include it in diff so it's
    // request is made again.
    if (keys3.includes(path([k, 'url'], r2))) {
      dispatch(remove(['invalidatedRequests', path([k, 'url'], r2)]))
      diff[k] = r2[k]
    }
  }
  for (let z = 0; z < keys2.length; z++) {
    if (!r1[keys2[z]]) {
      diff[keys2[z]] = r2[keys2[z]]
    }
  }
  return diff
}

/*
 * xhr readyState returns an int, this is what the ints translate to
 */
const XHR_READY_STATE = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4
}

/**
 * Start request if not already in progress. Returns an abort function that
 * will abort the request if no other components are waiting on it.
 */
const singularRequest = (() => {
  const requests = {}
  const abort = (url) => () => {
    const request = requests[url]
    request.count = request.count - 1
    if (request.count === 0) {
      request.xhr.abort()
    }
  }
  const makeRequest = (url, keepCount = true) => {
    const existing = requests[url]
    if (!existing || (existing &&
        (existing.xhr.readyState === XHR_READY_STATE.DONE ||
        (existing.xhr.readyState === XHR_READY_STATE.UNSENT)))) {
      const {xhr} = request({url, headers: getAuthHeader()})
      requests[url] = {
        xhr,
        count: ((existing || {}).count || 0) + (keepCount ? 1 : 0)
      }
    } else {
      keepCount && requests[url].count ++
    }
    return abort(url)
  }
  return makeRequest
})()

/**
 * Repeat request every interval milliseconds
 * returns an abort function that should be called when polling is no longer needed
 */
const pollRequest = (url, interval = 5000) => {
  return root.setInterval(() => singularRequest(url, false), interval)
}
