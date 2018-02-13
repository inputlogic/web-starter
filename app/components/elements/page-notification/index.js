import {guid, path} from 'wasmuth'
import {withState, dispatch, set, update, getState} from '/store'
import Base from './base'

export const PageNotification = withState(
  state => state.pageNotification || {}
)(({error, success, warning, isOpen}) => {
  const type = (error && 'error') || (success && 'success') || (warning && 'warning')
  const message = error || success || warning
  return Base({
    isOpen,
    type,
    message,
    didClickClose: () => dispatch(set(['pageNotification', 'isOpen'], false))
  })
})

export default PageNotification

export const showNotification = ({error, success, warning, length = 3000}) => {
  if (!length) {
    dispatch(set('pageNotification', {isOpen: true, error, success, warning}))
    return
  }
  const id = guid()
  dispatch(set('pageNotification', {isOpen: true, error, success, warning, id}))
  window.setTimeout(() => {
    const currentId = path(['pageNotification', 'id'], getState())
    if (currentId === id) {
      dispatch(update(['pageNotification'], {isOpen: false}))
    }
  }, length)
}
