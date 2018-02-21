import {path} from 'wasmuth'
import Ellipsis from '/components/elements/loader/ellipsis'
import withState from '/util/withState'
import Base from './base'

export const SubmitButton = withState(
  ({formState = {}}, {name}) => ({submitting: path([name, 'submitting'], formState)})
)(({submitting, children, submittingText, name}) =>
  (!name && console.warn('Form button should have a name')) ||
  Base({
    disabled: submitting,
    type: 'submit',
    children: submitting ? (submittingText || <Ellipsis />) : children
  })
)

export default SubmitButton
