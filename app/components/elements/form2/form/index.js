import {cloneElement} from 'preact'
import {path, reduce, some} from 'wasmuth'
import {getState, dispatch, set} from '/store'
import {compose} from '/util/compose'
import Base from './base'

export const Form = compose({
  componentWillMount () {
    this.props.initialData && dispatch(set(
      ['forms', this.props.name],
      this.props.initialData
    ))
  },
  render ({
    name,
    onSubmit,
    validations = {},
    initialData = {},
    children,
    ...props
  }) {
    return Base({
      onSubmit: ev => {
        ev.preventDefault()
        const data = path(['forms', name], getState())
        const errors = validate(data, validations)
        dispatch(set(['formErrors', name], errors))
        if (some(x => x, Object.values(errors))) {
          return
        }
        dispatch(set(['formState', name, 'submitting'], true))
        const promise = onSubmit({
          data
        })
        if (!promise || !promise.then) {
          console.warn(`onSubmit for Form "${name}" does not return a Promise!`)
          return
        }
        promise
          .then(() => dispatch(set(['formState', name, 'submitting'], false)))
          .catch(err => {
            if (err instanceof Error) {
              throw err
            }
            dispatch(set(['formErrors', name], err))
            dispatch(set(['formState', name, 'submitting'], false))
          })
      },
      children: addFormNameToChildren(children, name),
      ...props
    })
  }
})

export default Form

const validate = (data, validations) =>
  reduce(
    (acc, key) => ({
      [key]: validations[key](data[key], key, data),
      ...acc
    }),
    {},
    Object.keys(validations)
  )

const addFormNameToChildren = (children, formName) => {
  const names = ['Input', 'SubmitButton', 'Select', 'TextArea', 'TextField', 'Checkbox']
  for (var x = 0; x < children.length; x++) {
    if (children[x] && children[x].nodeName && names.indexOf(children[x].nodeName.name) > -1) {
      children[x] = cloneElement(children[x], {formName})
    }
    if (children[x] && children[x].children && children[x].children.length) {
      children[x].children = addFormNameToChildren(children[x].children, formName)
    }
  }
  return children
}
