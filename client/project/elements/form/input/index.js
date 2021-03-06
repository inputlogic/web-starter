import {throttle} from 'throttle-debounce'
import {path, filter} from 'wasmuth'

import compose from '/util/compose'
import withState from '/util/withState'

import {getState, dispatch, set} from '/store'

import Base from './base'

const addOrRemove = (formName, name, value) => {
  const currentValues = path(['forms', formName, name], getState()) || []
  return currentValues.indexOf(value) > -1
    ? filter(x => x !== value, currentValues)
    : [...currentValues, value]
}

const isChecked = (type, value, stateValue) => {
  if (type === 'checkbox') {
    return stateValue && stateValue.indexOf(value) !== -1
  }
  if (type === 'radio') {
    return stateValue === value
  }
}

/**
 * Mimic html input element but use redux
 * For performance, the default is to only update state
 * onChange (when element looses focus)
 * required:
 *   - formName
 *   - name
 *
 * some options:
 *   - trackOnInput: boolean, update state when a key is pressed
 *   - trackFocus: Store blur / focus of element in state under formState
 */
export const Input = withState(
  'Input',
  ({forms = {}}, {formName, name}) => ({stateValue: path([formName, name], forms)})
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
    name,
    formName,
    type = 'text',
    trackFocus = false,
    trackOnInput = false,
    trim = false,
    value,
    stateValue,
    focus,
    setFocus,
    ...props
  }) {
    !formName && log.warning('Formname not set for Input', name)
    type === 'checkbox' && !value && log.warning('Value not set for checkbox', name)
    type === 'radio' && !value && log.warning('Value not set for radio', name)

    const dispatchTextValue = ev => {
      dispatch(set(
        `forms.${formName}.${name}`,
        trim ? (ev.target.value || '').trim() : ev.target.value
      ))
    }

    return Base({
      onChange: ev => {
        ev.preventDefault()
        if (type === 'checkbox') {
          dispatch(set(
            ['forms', formName, name],
            addOrRemove(formName, name, value)
          ))
        } else if (type === 'radio' || !trackOnInput) {
          dispatchTextValue(ev)
        }
      },
      onInput: throttle(200, ev => {
        if (trackOnInput) {
          dispatchTextValue(ev)
        }
      }, false),
      onFocus: ev => {
        trackFocus && dispatch(set(['formState', formName, 'focus', name], true))
      },
      onBlur: ev => {
        trackFocus && dispatch(set(['formState', formName, 'focus', name], false))
      },
      type,
      name,
      ref: ref => ref && focus && setTimeout(() => setFocus(ref), 100),
      value: ['checkbox', 'radio'].indexOf(type) > -1 ? value : stateValue,
      checked: isChecked(type, value, stateValue),
      ...props
    })
  }
}))

export default Input
