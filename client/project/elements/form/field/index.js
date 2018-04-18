import Preact from 'preact'
import {filter} from 'wasmuth'
import Base, {FancyField as FancyBase} from './base'

const {cloneElement} = Preact

export const Field = ({fancy, children, label, hint}) => {
  const Child = children[0]
  const {formName, name, value, className} = (Child.attributes || {})
  const id = filter(x => x, [formName, name, value]).join('-')
  const BaseComponent = fancy ? FancyBase : Base
  return BaseComponent({
    children: cloneElement(Child, {
      id,
      ...fancy && {placeholder: ' ', className: 'fancy-label ' + className}
    }),
    label: label || value || name,
    hint,
    formName,
    id,
    name
  })
}

export default Field
