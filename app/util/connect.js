import {pipe} from 'wasmuth'
import withState from '/util/withState'
import withRequests from '/util/withRequests'

/**
 * It is very common to need a component that
 *  - uses (and rerenders based on) some values in state
 *  - gets some data from an api
 *
 * This HOC is meant to accomplish these two things with
 * a minimum amount of boilerplate
 *
 * The mapper argument can either be:
 *   1. a function like `(state, props) => ({withState: {...}, withRequests: {...}})`
 *   2. or an object like `{withState: (state, props) => ({...}), withRequests: (state, props) => ({...})}`
 *
 * See withState and withRequests for instructions on what should be inside the objects `{...}`
 *
 * use option 1 when you need to use some value calculated in the mapper in both withState and withRequests,
 * use option 2 when this is not the case, or you just need one of withState or withRequests
 *
 */
export const connect = mapper => {
  if (typeof mapper === 'function') {
    return pipe.apply(this, [
      withRequests((state, props) => mapper(state, props).withRequests || {}),
      withState((state, props) => mapper(state, props).withState || {}),
    ])
  } else {
    const {withRequests: withRequestsMapper, withState: withStateMapper} = mapper
    return pipe.apply(this, [
      ...!!withRequests && [withRequests(withRequestsMapper)],
      ...!!withState && [withState(withStateMapper)]
    ])
  }
}

export default connect
