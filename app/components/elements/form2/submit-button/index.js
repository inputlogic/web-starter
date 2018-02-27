import {path} from 'wasmuth'
import Ellipsis from '/components/elements/loader/ellipsis'
import withState from '/util/withState'
import Base from './base'

export const SubmitButton = withState(
  'SubmitButton',
  ({formState = {}}, {formName}) => ({submitting: path([formName, 'submitting'], formState)})
)(({submitting, children, submittingText, formName}) =>
  (!formName && console.warn('Submit button should have a formName')) ||
  Base({
    disabled: submitting,
    type: 'submit',
    children: submitting ? (submittingText || <Ellipsis />) : children
  })
)

export default SubmitButton
