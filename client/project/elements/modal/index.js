import {dispatch, set, watchPath} from '/store'
import {closeModal} from './actions'
import BaseModal from './base'

// Watch for an open modal, if so add a class to body to prevent
// scrolling behind the modal.
if (typeof document !== 'undefined') {
  watchPath(['modal'], (modal, oldmodal) => {
    if (modal && modal !== oldmodal) {
      document.body.classList.add('modal-open')
    } else {
      document.body.classList.remove('modal-open')
    }
  })
}

// Watch for URL change, if so close all modals.
watchPath(['route'], (route, oldRoute = {}) => {
  if (route.name && oldRoute.name && route.name !== oldRoute.name) {
    dispatch(set('modal', null))
  }
})

const isOverlay = (el) =>
  (el.classList && el.classList.contains('modal-container'))

export default props => BaseModal({
  className: '',
  handleModalContainerClick: ev => {
    if (isOverlay(ev.target)) {
      props.onClose
        ? props.onClose()
        : dispatch(closeModal())
    }
  },
  dispatchCloseModal: () =>
    props.onClose
      ? props.onClose()
      : dispatch(closeModal()),
  ...props
})
