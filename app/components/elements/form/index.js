import emailRegex from 'email-regex'
import {debounce as debounceFunction} from 'throttle-debounce'
import {path, pathOr, some} from 'wasmuth'

import {
  set,
  update,
  dispatch,
  getState,
  mapStateToProps
} from '/store'

const {cloneElement} = Preact

const validateEmail = (formName, field = 'email') => debounceFunction(200, (email) => {
  if (email.length < 4) return
  if (!emailRegex({exact: true}).test(email)) {
    dispatch(set(['formErrors', formName, field], 'Please enter a valid Email Address'))
  } else {
    dispatch(set(['formErrors', formName, field], null))
  }
})

const validatePassword = (formName, field = 'password') => debounceFunction(200, (password = '', {min}) => {
  if (password.length > 3 && password.length < min) {
    dispatch(set(['formErrors', formName, field], `Password should be at least ${min} characters`))
  } else {
    dispatch(set(['formErrors', formName, field], null))
  }
})

const handleValidations = (formName, name, type, rules, value) =>
  (type === 'email' && validateEmail(formName, name)(value)) ||
  (type === 'password' && rules.min && validatePassword(formName, name)(value, rules))

const updateProps = (children, {formName}) => {
  const names = ['TextField', 'RadioField', 'Radio', 'SubmitButton']
  for (var x = 0; x < children.length; x++) {
    if (children[x].nodeName && names.indexOf(children[x].nodeName.name) > -1) {
      children[x] = cloneElement(children[x], {formName})
    }
    if (children[x].children && children[x].children.length) {
      children[x].children = updateProps(children[x].children, {formName})
    }
  }
  return children
}

export const Form = ({
  name,
  onSubmit,
  children,
  ...props
}) => {
  const childrenWithProps = updateProps(children, {formName: name})
  const handleSubmit = (ev) => {
    ev.preventDefault()
    dispatch(update(['formState', name], {submitting: true}))
    const {forms = {}, formErrors = {}} = getState()
    const data = forms[name]
    const errors = formErrors[name]
    const resp = onSubmit({data, errors})
    if (!resp || !resp.then) {
      console.warn(
        `onSubmit for Form "${name}" does not return a Promise!
        You may need to set \`{submitting: false}\` manually.`
      )
    } else {
      resp.then(() =>
        dispatch(update(['formState', name], {submitting: false})))
    }
  }
  return (
    <form onSubmit={handleSubmit} {...props}>
      {childrenWithProps}
    </form>
  )
}

export const Field = ({
  label,
  className = '',
  name,
  hint,
  error,
  children,
  ...props
}) =>
  <div>
    {className.indexOf('fancy-label') !== -1 &&
      <div className='label-wrap'>
        {children}
        {label && <label htmlFor={name}>
          <div>{label}</div>
        </label>}
      </div>}

    {className.indexOf('fancy-label') === -1 &&
      <div>
        {label && <label htmlFor={name}>
          <div>{label}</div>
        </label>}
        {children}
      </div>}

    {!!hint && !error &&
      <div className='field-hint'>{hint}</div>}
    {!!error &&
      <div className='field-hint is-error'>{error}</div>}
  </div>

export const TextField = mapStateToProps('TextField',
  ({forms = {}, formErrors = {}}, props) => ({
    ...props,
    value: path([props.formName, props.name], forms),
    error: path([props.formName, props.name], formErrors)
  })
)(({
  type = 'text',
  name,
  placeholder = ' ',
  debounce = 0,
  focus = false,
  rules = {},
  // Assigned by updateProps
  formName,
  value,
  ...props
}) =>
  <Field name={name} {...props}>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      onInput={debounceFunction(debounce, (ev) =>
        ev.preventDefault() ||
        handleValidations(formName, name, type, rules, ev.target.value) ||
        console.log('???', formName, name, value, ev.target.value) ||
        dispatch(update(['forms', formName], {[name]: ev.target.value}))
      )}
      // setTimeout is needed to wait till after the animation
      // @TODO: Probably better to use requestAnimationFrame
      ref={(ref) => ref && focus && setTimeout(() => ref.focus(), 100)}
      {...props}
    />
  </Field>
)

export const Checkbox = mapStateToProps('Checkbox',
  ({forms = {}}, props) => ({
    ...props,
    checked: pathOr(false, [props.formName, props.name], forms)
  })
)(({
  name,
  formName,
  checked,
  label,
  ...props
}) =>
  <div className='label-wrap'>
    <input
      type='checkbox'
      id={name}
      name={name}
      checked={checked}
      onChange={ev =>
        ev.preventDefault() ||
        dispatch(update(['forms', formName], {[name]: ev.target.checked}))
      }
      {...props}
    />
    {label && <label htmlFor={name}>
      <div>{label}</div>
    </label>}
  </div>
)

export const RadioField = ({name, label, value, checked, formName, ...props}) =>
  <Field label={name} name={name} {...props}>
    <input
      type='radio'
      name={name}
      checked={checked}
      onChange={(ev) =>
        ev.preventDefault() ||
        dispatch(update(['forms', formName], {[name]: value}))
      }
      {...props}
    />
  </Field>

export const SubmitButton = mapStateToProps('SubmitButton',
  ({forms = {}, formErrors = {}, formState = {}}, props) => ({
    ...props,
    isDirty: some(x => x, forms[props.formName] || {}),
    isSubmitting: pathOr(false, [props.formName, 'submitting'], formState),
    hasError: some(x => x, formErrors[props.formName] || {})
  })
)(({
  isDirty,
  isSubmitting,
  hasError,
  className = '',
  Loading = () => <span>Loading...</span>,
  children
}) => {
  const disabled = !isDirty || hasError || isSubmitting
  return <button type='submit' className={className} disabled={disabled}>
    {isSubmitting
      ? <Loading />
      : children}
  </button>
})
