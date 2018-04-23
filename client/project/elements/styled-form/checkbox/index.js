import {withState, dispatch, update} from '/store'

export const Checkbox = withState('Checkbox',
  ({forms = {}}, {formName, name}) => ({
    checked: W.pathOr(false, [formName, name], forms)
  })
)(({
  name,
  formName,
  checked,
  label,
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
  return <div>
    {input}
    <label for={name}>
      {label != null ? label : '\u00A0'}
      {children}
    </label>
  </div>
})

export default Checkbox
