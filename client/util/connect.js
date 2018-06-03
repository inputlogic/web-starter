import {pipe} from 'wasmuth'
import withStateFn from '/util/withState'
import withRequestFn from '/util/withRequest'

// TODO: deprecate withRequest
export const connect = ({withState, withRequest, withRequests}) => {
  withRequest && console.warn('withRequest will be deprecated. Use withRequests instead.')
  return pipe.apply(this, [
    ...!!withRequest && [withRequestFn(withRequest)],
    ...!!withRequests && [withRequestFn(withRequests)],
    ...!!withState && [withStateFn(withState)]
  ])
}

export default connect
