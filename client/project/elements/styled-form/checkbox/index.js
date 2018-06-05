import {route} from 'preact-router'
import withState from '/util/withState'
import updateQuery from '/util/updateQuery'
import {Input} from '/project/elements/form'
import Base from './base'

export const Checkbox = ({
  name,
  formName,
  label,
  children,
  className = 'checkbox',
  ...props
}) => {
  const id = `${formName}-${name}`
  return Base({
    label,
    id,
    InputComponent: Input,
    input: {
      type: 'checkbox',
      name,
      formName
    }
  })
}

export const QueryCheckbox = withState(
  (state, {name}) => ({
    checked: W.path(`route.args.${name}`, state) === 'true'
  })
)(({label, name, checked, children, className = 'checkbox'}) => {
  const id = `query-checkbox-${name}`
  return Base({
    label,
    id,
    children,
    InputComponent: props => <input {...props} />,
    input: {
      type: 'checkbox',
      name,
      checked,
      className,
      onChange: ev => {
        ev.preventDefault()
        console.log('hi', checked)
        route(updateQuery({[name]: checked ? 'false' : 'true'}))
      }
    }
  })
})

export default Checkbox
