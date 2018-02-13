import emailRegex from 'email-regex'
import {path, pathOr, some, filter} from 'wasmuth'
import {throttle as debounceFunction} from 'throttle-debounce'

import {
  dispatch,
  set,
  update,
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

const validatePhone = (formName, field = 'phone') => debounceFunction(200, (phone) => {
  const phoneRe = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
  if (!phoneRe.test(phone)) {
    dispatch(set(
      ['formErrors', formName, field],
      'Please enter a valid phone (e.g. 18005551234)'
    ))
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
  (type === 'tel' && validatePhone(formName, name)(value)) ||
  (type === 'password' && rules.min && validatePassword(formName, name)(value, rules))

const updateProps = (children, {formName}) => {
  const names = ['TextField', 'RadioField', 'Radio', 'Checkbox', 'SubmitButton', 'Select', 'TextArea']
  for (var x = 0; x < children.length; x++) {
    if (children[x] && children[x].nodeName && names.indexOf(children[x].nodeName.name) > -1) {
      children[x] = cloneElement(children[x], {formName})
    }
    if (children[x] && children[x].children && children[x].children.length) {
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
    const errors = filter((k, v) => v, formErrors[name] || {})
    const resp = onSubmit({data, errors, name})
    if (!resp || !resp.then) {
      console.warn(
        `onSubmit for Form "${name}" does not return a Promise!
        You may need to set \`{submitting: false}\` manually.`
      )
    } else {
      resp
        .then(() =>
          dispatch(update(['formState', name], {submitting: false})))
        .catch(err => {
          dispatch(update(['formState', name], {submitting: false}))
          dispatch(update(['formErrors', name], err))
        })
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
  <div className='form-row'>
    {className.indexOf('fancy-label') !== -1 &&
      <div className='label-wrap'>
        {children}
        {label && <label htmlFor={name}>
          <div>{label}</div>
        </label>}
      </div>}

    {className.indexOf('fancy-label') === -1 &&
      <div className='form-row'>
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

export const FormHeading = ({className, children}) =>
  <div class={className + ' form-heading'}>{children}</div>

export const FieldSet = ({className, children}) =>
  <fieldset class={className || ''}>{children}</fieldset>

export const Select = mapStateToProps(
  'Select',
  ({forms = {}, formErrors = {}}, {formName, name}) => ({
    value: path([formName, name], forms)
  })
)(({
  name,
  label,
  className = '',
  children,
  formName,
  value,
  ...props
}) =>
  <div className='form-row'>
    <label>{label}</label>
    <div class={className + ' select'}>
      <select
        name={name}
        value={value}
        onChange={({target}) => {
          dispatch(update(
            ['forms', formName],
            {[name]: target[target.selectedIndex].value}
          ))
        }}
        {...props}
      >
        {children}
      </select>
    </div>
  </div>
)

export const TextArea = mapStateToProps(
  'TextArea',
  ({forms = {}}, {formName, name}) => ({
    value: path([formName, name], forms)
  })
)(({
  label,
  name,
  rows,
  value,
  formName,
  debounce,
  placeholder = ''
}) =>
  <div className='form-row'>
    <label>{label}</label>
    <textarea
      rows={rows}
      placeholder={placeholder}
      name={name}
      value={value}
      onInput={debounceFunction(debounce, (ev) =>
        ev.preventDefault() ||
        dispatch(update(['forms', formName], {[name]: ev.target.value}))
      )}
    />
  </div>
)

export const TextField = mapStateToProps(
  'TextField',
  ({forms = {}, formErrors = {}}, {formName, name}) => ({
    value: path([formName, name], forms),
    error: path([formName, name], formErrors)
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
      id={name}
      placeholder={placeholder}
      value={value}
      onInput={debounceFunction(debounce, (ev) =>
        ev.preventDefault() ||
        handleValidations(formName, name, type, rules, ev.target.value) ||
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
  ({forms = {}}, {formName, name}) => ({
    checked: pathOr(false, [formName, name], forms)
  })
)(({
  name,
  formName,
  checked,
  isLabelOuter,
  children,
  className = 'checkbox',
  ...props
}) => {
  const input = (
    <input
      className={className}
      type='checkbox'
      id={name}
      name={name}
      checked={checked}
      onChange={ev =>
        ev.preventDefault() ||
        dispatch(update(['forms', formName], {[name]: ev.target.checked}))
      }
    />
  )
  return isLabelOuter
    ? <label>
      {input}
      {children}
    </label>
    : <div className='no-label-check'>
      {input}
      <label for={name}>
        {children}
      </label>
    </div>
})

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
  ({forms = {}, formErrors = {}, formState = {}}, {formName}) => ({
    isDirty: some(x => x, forms[formName] || {}),
    isSubmitting: pathOr(false, [formName, 'submitting'], formState),
    hasError: some(x => x, formErrors[formName] || {})
  })
)(({
  disabled,
  isDirty,
  isSubmitting,
  hasError,
  className = '',
  Loading = () => <span>Loading...</span>,
  children
}) => {
  const isDisabled = disabled || (!isDirty || isSubmitting)
  return <button type='submit' className={className} disabled={isDisabled}>
    {isSubmitting
      ? <Loading />
      : children}
  </button>
})
