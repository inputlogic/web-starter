import {pipe} from 'wasmuth'
import {getState} from '/store'
import withState from '/util/mapStateToProps'
import withRequest from '/util/withRequest'

export const connect = mapper => props => {
  const result = mapper(getState(), props)
  return pipe.apply(this, [
    ...'withState' in result && [withState(() => result.withState)],
    ...'withRequest' in result && [withRequest(() => result.withRequest)]
  ])
}

export default connect
