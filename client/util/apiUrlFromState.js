import {path} from 'wasmuth'

import apiUrl from '/util/apiUrl'

export default function apiUrlFromState (apiUrlName, queries, state) {
  if (arguments.length < 3) {
    state = queries
    queries = {}
  }
  const {route} = state
  return apiUrl(apiUrlName, {
    page: path(['args', 'page'], route) || '1',
    queries
  })
}
