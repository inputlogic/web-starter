import {path} from 'wasmuth'
import withState from '/util/withState'

/**
 * Pass the progress of `request` as a prop named `propName`.
 * The request is expected to exist in the state.
 * Progress is a float from 0 - 100 if progress is available, null otherwise.
 */
export default (request, {propName = 'progress'} = {}) =>
  withState((state, props) => {
    const {loaded, total} = path(['requests', request, 'progress'], state) || {}
    return {
      [propName]: typeof loaded === 'undefined' ? null : loaded / total
    }
  })
