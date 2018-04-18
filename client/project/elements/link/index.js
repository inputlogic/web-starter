import check from 'check-arg-types'
import {route} from 'preact-router'
import {pathEq} from 'wasmuth'

import {getState} from '/store'

const toType = check.prototype.toType
const isActive = (to) => pathEq(['route', 'url'], to, getState())

const handleClick = to => ev => {
  ev.preventDefault()
  ev.stopImmediatePropagation()
  window.scrollTo(0, 0)
  route(to)
}

export const Link = ({to, activeClass, className, children, ...props}) =>
  <a
    onClick={(e) => toType(to) === 'function' ? to(e) : handleClick(to)(e)}
    href={toType(to) === 'string' ? to : '#'}
    className={`${props.class || className} ${activeClass && isActive(to) ? activeClass : ''}`}
    {...props}
  >
    {children}
  </a>

export default Link
