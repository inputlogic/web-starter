import {path} from 'wasmuth'
import withState from '/util/withState'
import Base from './base'

export const Error = withState(
  ({formErrors = {}}, {formName, name}) => ({error: path([formName, name], formErrors)})
)(({error, name, formName, ...props}) => {
  !name && console.warn('Error component requires have name prop')
  !formName && console.warn('Error component requires have formName prop')
  return !!error && Base({...props, children: error})
})

export default Error
