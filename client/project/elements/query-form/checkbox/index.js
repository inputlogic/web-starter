import {route} from 'preact-router'
import updateQuery from '/util/updateQuery'
import {withState} from '/store'

export const Checkbox = withState(
  (state, {name}) => ({
    checked: W.path(`route.args.${name}`, state) === 'true'
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
      onChange={ev => {
        ev.preventDefault()
        route(updateQuery({[name]: checked ? 'false' : 'true'}))
      }}
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
