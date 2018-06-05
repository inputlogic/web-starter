import withState from '/util/withState'
import Example from './example'

const MODALS = {
  Example
}

export default withState(
  (state) => ({modal: state.modal})
)(({modal}) => {
  const Modal = MODALS[modal]
  return Modal
    ? <div><Modal /></div>
    : null
})
