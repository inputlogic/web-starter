import {route} from 'preact-router'
import {getState} from '/store'

const isActive = (to) => W.pathEq(['route', 'url'], to, getState())

const handleClick = to => ev => {
  ev.preventDefault()
  ev.stopImmediatePropagation()
  window.scrollTo(0, 0)
  route(to)
}

export const Link = ({to, activeClass, className, children, ...props}) =>
  <a
    onClick={(e) => W.toType(to) === 'function' ? to(e) : handleClick(to)(e)}
    href={W.toType(to) === 'string' ? to : '#'}
    className={`${props.class || className} ${activeClass && isActive(to) ? activeClass : ''}`}
    {...props}
  >
    {children}
  </a>

export default Link
