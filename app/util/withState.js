import {equal, filter} from 'wasmuth'

import {subscribe, getState} from '/store'
import {compose, setNodeName} from '/util/compose'

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
    componentWillMount () {
      const syncState = () => {
        const newProps = mapper(getState(), this.props)
        if (!equal(newProps, this.state._namespacedState)) {
          this.setState({_namespacedState: newProps})
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
          console.warn(
`${nodeName} props are being defined twice.
Avoid, \`...props,\` in mapper.
${dupes}
`)
        }
      }
      return <Component {...props} {..._namespacedState} />
    }
  })
}
