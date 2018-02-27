import {path} from 'wasmuth'
import withState from '/util/withState'
import Base from './base'

export const ErrorOrHint = withState(
  ({formErrors = {}}, {formName, name}) => ({error: path([formName, name], formErrors)})
)(({hint, error, name, formName, ...props}) => {
  !name && console.warn('ErrorOrHint component requires name prop')
  !formName && console.warn('ErrorOrHint component requires formName prop')
  return (!!error || !!hint) && Base({...props, error, hint})
})

export default ErrorOrHint
