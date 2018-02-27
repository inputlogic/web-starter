import {path} from 'wasmuth'
import {dispatch, set} from '/store'
import withState from '/util/withState'
import Base from './base'

export const Select = withState(
  'Select',
  ({forms = {}}, {formName, name}) => ({value: path([formName, name], forms)})
)(({value, formName, name, ...props}) => Base({
  value,
  onChange: ev => {
    ev.preventDefault()
    dispatch(set(['forms', formName, name], ev.target.value))
  },
  ...props
}))

export default Select
