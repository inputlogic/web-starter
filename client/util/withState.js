import {equal, filter, deepClone, toType} from 'wasmuth'

import {compose, setNodeName} from '/util/compose'

import {subscribe, getState} from '/store'
import {DEBUG} from '/settings'

const onlyDupes = (a1, a2) => filter(i => a1.indexOf(i) > -1, a2)

/**
 * Mapper is called whenever the state changes.
 * Whenever the result of mapper changes, the component rerenders
 *
 * mapper: (state, props) => props this component needs from state
 * Component: the component that needs the props
 *
 * @TODO: Eventually move this to wasmuth
 */
export default (nodeName, mapper) => {
  if (!mapper) {
    mapper = nodeName
    nodeName = 'Mapper'
  }
  return Component => compose(setNodeName(nodeName), {
    init () {
      const syncState = () => {
        const newProps = mapper(getState(), this.props)
        if (!equal(newProps, this.state._namespacedState)) {
          this.setState({_namespacedState: deepClone(newProps)})
        }
      }
      syncState()
      this.unsubscribe = subscribe(syncState)
    },
    componentWillUnmount () {
      this.unsubscribe()
    },
    render ({_namespacedState, ...props}) {
      if (DEBUG) {
        const dupes = onlyDupes(Object.keys(props), Object.keys(_namespacedState))
        if (dupes.length) {
          log.warning(
            `${nodeName} props are being defined twice.
            Avoid, \`...props,\` in mapper.
            ${dupes}`
          )
        }
        // Uncomment this to see a lot of warnings
        const funcs = Object.keys(filter(v => toType(v) === 'function', _namespacedState))
        if (funcs.length) {
          log.warning(
            `${nodeName} withState mapper returns an object with functions.
            You should rather only return values needed from state in this object.
            Build the functions in the component that receives withState
            props.
            [${funcs.join(', ')}]
            `
          )
        }
      }
      return <Component {...props} {..._namespacedState} />
    }
  })
}
