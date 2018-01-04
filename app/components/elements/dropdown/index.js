import {pathOr, pipe, filter} from 'wasmuth'

import {
  set,
  dispatch,
  getState,
  mapStateToProps
} from '/store'

import BaseDropdown from './base'

// DOM event to close all Dropdown's on off-click
const isDropdown = (el) =>
  (el.classList && el.classList.contains('dropdown-menu')) ||
  (el.classList && el.classList.contains('btn-dropdown'))

document.body.addEventListener('click', (ev) => {
  const dds = pipe(
    pathOr({}, ['dropdowns']),
    filter((val) => val),
    Object.keys
  )(getState())
  if (!dds.length) {
    return
  }
  let el = ev.target
  if (isDropdown(el)) return
  while (el.parentNode) {
    el = el.parentNode
    if (isDropdown(el)) return
  }
  dispatch(set(['dropdowns'], {}))
})

export default mapStateToProps(
  ({dropdowns}, {uid, ...props}) => {
    if (!uid) {
      console.warn('<Dropdown> must include a uid prop.')
    }
    return {
      uid,
      isOpen: !!dropdowns[uid],
      handleClick: (ev) =>
        ev.preventDefault() ||
        dispatch(set(['dropdowns', uid], !dropdowns[uid])),
      ...props
    }
  }
)(BaseDropdown)
