import {path} from 'wasmuth'
import {dispatch, set} from '/store'
import withState from '/util/withState'
import Base from './base'

export const TextArea = withState(
  'TextArea',
  ({forms = {}}, {formName, name}) => ({value: path([formName, name], forms)})
)(({value, formName, name, trackOnInput, trackFocus, ...props}) => Base({
  value,
  onChange: ev => {
    ev.preventDefault()
    if (!trackOnInput) {
      dispatch(set(['forms', formName, name], ev.target.value))
    }
  },
  onInput: ev => {
    if (trackOnInput) {
      ev.preventDefault()
      dispatch(set(['forms', formName, name], ev.target.value))
    }
  },
  onFocus: ev => {
    trackFocus && dispatch(set(['formState', formName, 'focus', name], true))
  },
  onBlur: ev => {
    trackFocus && dispatch(set(['formState', formName, 'focus', name], false))
  },
  ...props
}))

export default TextArea
