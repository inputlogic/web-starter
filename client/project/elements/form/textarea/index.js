import {path} from 'wasmuth'
import compose from '/util/compose'
import {dispatch, set} from '/store'
import withState from '/util/withState'
import {throttle} from 'throttle-debounce'
import Base from './base'

export const TextArea = withState(
  'TextArea',
  ({forms = {}}, {formName, name}) => ({value: path([formName, name], forms)})
)(compose({
  init () {
    this.setFocus = (() => {
      var done = false
      return (ref) => {
        if (done) return
        done = true
        ref.focus()
      }
    })()
  },
  render ({
    value,
    formName,
    name,
    trackOnInput,
    trackFocus,
    focus,
    setFocus,
    ...props
  }) {
    return Base({
      value,
      onChange: ev => {
        ev.preventDefault()
        if (!trackOnInput) {
          dispatch(set(['forms', formName, name], ev.target.value))
        }
      },
      onInput: throttle(200, ev => {
        if (trackOnInput) {
          ev.preventDefault()
          dispatch(set(['forms', formName, name], ev.target.value))
        }
      }, false),
      onFocus: ev => {
        trackFocus && dispatch(set(['formState', formName, 'focus', name], true))
      },
      onBlur: ev => {
        trackFocus && dispatch(set(['formState', formName, 'focus', name], false))
      },
      ref: ref => ref && focus && setTimeout(() => setFocus(ref), 100),
      ...props
    })
  }
}))

export default TextArea
