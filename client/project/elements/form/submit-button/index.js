import {pathOr, some} from 'wasmuth'
import Ellipsis from '/project/elements/loader/ellipsis'
import withState from '/util/withState'
import Base from './base'

export const SubmitButton = withState(
  'SubmitButton',
  ({forms = {}, formErrors = {}, formState = {}}, {formName}) => ({
    isDirty: some(x => x, forms[formName] || {}),
    isSubmitting: pathOr(false, [formName, 'submitting'], formState)
  })
)(({
  isDirty,
  isSubmitting,
  disabled,
  submittingText,
  className = '',
  children
}) => {
  const isDisabled = disabled || (!isDirty || isSubmitting)
  return Base({
    className,
    disabled: isDisabled,
    type: 'submit',
    children: isSubmitting ? (submittingText || <Ellipsis />) : children
  })
})

export default SubmitButton
