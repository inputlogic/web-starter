import {pipe, path} from 'wasmuth'

const getRouteIdFromState =
  pipe(
    path(['route', 'args', 'id']),
    id => id && parseInt(id, 10)
  )

export default getRouteIdFromState
