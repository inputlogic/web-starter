import {pathOr, pipe, filter} from 'wasmuth'

import withState from '/util/withState'

import {
  set,
  dispatch,
  getState
} from '/store'

import BaseDropdown from './base'

// DOM event to close all Dropdown's on off-click
const isDropdown = (el) =>
  (el.classList && el.classList.contains('dropdown-menu')) ||
  (el.classList && el.classList.contains('btn-dropdown'))

try {
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
} catch (_) {}

export default withState(
  ({dropdowns}, {uid}) => {
    if (!uid) {
      log.warning('<Dropdown> must include a uid prop.')
    }
    return {
      isOpen: !!dropdowns[uid],
      dropdowns
    }
  }
)(({isOpen, dropdowns, uid, ...props}) =>
  BaseDropdown({
    ...props,
    isOpen,
    handleClick: (ev) =>
      ev.preventDefault() ||
      dispatch(set(['dropdowns', uid], !dropdowns[uid]))
  })
)
