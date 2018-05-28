import {cloneElement} from 'preact'

import {getState, dispatch, set} from '/store'

import {compose} from '/util/compose'

import {isEmail, isPhoneNumber} from '/project/elements/form/validators'

import Base from './base'

const validate = (data, validations) =>
  W.reduce(
    (acc, key) => ({
      [key]: validations[key](data[key], key, data),
      ...acc
    }),
    {},
    Object.keys(validations)
  )

const getValidator = (formName, {name, type, rules}) =>
  (type === 'email' && isEmail) ||
  (type === 'tel' && isPhoneNumber)

const updateProps = (children, formName) => {
  const fieldsToValidate = {}
  const names = ['Input', 'SubmitButton', 'Select', 'TextArea', 'TextField', 'Checkbox']

  for (var x = 0; x < children.length; x++) {
    if (children[x] && children[x].nodeName && names.indexOf(children[x].nodeName.name) > -1) {
      children[x] = cloneElement(children[x], {formName})

      if (children[x].nodeName.name === 'TextField') {
        const validator = getValidator(formName, children[x].attributes)
        if (validator) {
          fieldsToValidate[children[x].attributes.name] = validator
        }
      }
    }
    if (children[x] && children[x].children && children[x].children.length) {
      const {childrenWithProps} = updateProps(children[x].children, formName)
      children[x].children = childrenWithProps
    }
  }

  return {childrenWithProps: children, fieldsToValidate}
}

export const Form = compose({
  init () {
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
    handleValidationErrors = false,
    children,
    ...props
  }) {
    const {childrenWithProps, fieldsToValidate = {}} = updateProps(children, name)
    return Base({
      onSubmit: ev => {
        ev.preventDefault()
        const data = W.path(['forms', name], getState())
        const errors = validate(data, {...validations, ...fieldsToValidate})
        const hasError = W.some(x => x, errors)
        dispatch(set(['formErrors', name], errors))
        if (!handleValidationErrors && hasError) {
          return
        }
        dispatch(set(['formState', name, 'submitting'], true))
        const promise = onSubmit({
          data,
          errors,
          hasError
        })
        if (!promise || !promise.then) {
          log.warning(`onSubmit for Form "${name}" does not return a Promise!`)
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
      children: childrenWithProps,
      ...props
    })
  }
})

export default Form
