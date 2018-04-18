import {pipe} from 'wasmuth'
import withStateFn from '/util/withState'
import withRequestFn from '/util/withRequest'

export const connect = ({withState, withRequest}) =>
  pipe.apply(this, [
    ...!!withRequest && [withRequestFn(withRequest)],
    ...!!withState && [withStateFn(withState)]
  ])

export default connect
