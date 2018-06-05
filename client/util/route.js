import queryString from 'querystringify'
import {
  map,
  reduce,
  find,
  equal,
  pipe,
  path,
  toPairs,
  toType,
  safeWindow
} from 'wasmuth'

import PreactRouter from 'preact-router'

import {compose, setNodeName} from '/util/compose'
import log from '/util/logger'

import {set, dispatch, getState} from '/store'
import routes from '/allRoutes'

/**
 * Add preact-router props into the atom state
 * Should only be used as child of Router component (above) the Router
 * coponent will replace the name prop given to this component
 * with the corresponding path as defined in the routes prop
 * given to the Router component
 * Because Router above wraps the preact-router Router component
 * this component is given the props "matches" and "name" by preact-router
 * Router. These props are added to the state.
 */
export const Route = compose(setNodeName('Route'), {
  updateState (newProps) {
    const currentValues = getState().route
    const newValues = {
      args: newProps.matches,
      url: safeWindow('location.pathname'),
      name: newProps.name
    }
    if (!equal(currentValues, newValues)) {
      dispatch(set('route', newValues))
      dispatch(set('mobileMenuOpen', false))
      dispatch(set('dropdowns', {}))
    }
  },
  init () {
    this.updateState(this.props)
  },
  componentDidUpdate () {
    this.updateState(this.props)
    const hash = safeWindow('location.hash')
    if (hash !== '') {
      safeWindow('requestAnimationFrame', () => {
        const id = hash.replace('#', '')
        const element = document.getElementById(id)
        element && element.scrollIntoView()
      })
    }
  },
  render ({name, isAuthed, matches, component: Component}) {
    if (toType(isAuthed) === 'function') {
      const authed = isAuthed(getState())
      if (!authed) {
        const NotAuthed = path(['_notAuthed', 'component'], routes)
        return NotAuthed ? <NotAuthed /> : null
      }
    } else if (isAuthed != null) {
      log.warning(`isAuthed for route "${name}" should be a function that accepts the current state and returns a Boolean!`)
    }
    const type = toType(Component)
    if (type === 'function') {
      safeWindow('requestAnimationFrame', () => safeWindow('scrollTo', 0, 0))
      return <Component />
    } else if (type === 'object') {
      const paths = toPairs(matches)
      const match = find(p => path(p, Component), paths)
      if (match) {
        const Match = path(match, Component)
        safeWindow('requestAnimationFrame', () => safeWindow('scrollTo', 0, 0))
        return <Match />
      }
    }
    log.warning(`Route failed to find a Component to render!`)
  }
})

/**
 * Use instead of preact-router Router component.
 * - Add key prop to Route children so that when route changes,
 *   the current route component will unmount and the new one will mount.
 */
export const Router = pipe(
  ({routes, url}) => ({keys: Object.keys(routes), routes, url}),
  ({keys, routes, url}) =>
    <PreactRouter url={url}>
      {map((name) =>
        <Route name={name} key={`route-${name}`} {...routes[name]} />
        , keys)}
    </PreactRouter>
)

/**
 * Get the path string for the route with name `name`
 * Best understood with an example:
 *
 * ```
 * const routes = {
 *  myRoute: '/some/:fancy/:route'
 * }
 *
 * urlFor('myRoute', {
 *   args: {fancy: 12, route: 'r2d2'},
 *   queries: {search: 'hi'}
 * })
 * > '/some/12/r2d2?search=hi'
 * ```
 */
export const urlFor = (name, {args = {}, queries = {}} = {}) => {
  const rule = routes[name]
  if (!rule) {
    log.warning('No route found for name: ' + name)
  }
  const replaced = reduce(
    (acc, k) => acc.replace(`:${k}`, args[k]),
    rule.path,
    Object.keys(args)
  )
  const hasQueries = Object.keys(queries).length > 0
  return `${replaced}${!hasQueries ? '' : '?' + queryString.stringify(queries)}`
}
