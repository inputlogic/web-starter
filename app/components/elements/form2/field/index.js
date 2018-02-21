import Preact from 'preact'
import {filter} from 'wasmuth'
import Base, {FancyField as FancyBase} from './base'

const {cloneElement} = Preact

export const Field = ({children, label, hint}) => {
  const Child = children[0]
  const {formName, name, value, className} = Child.attributes
  const isFancy = (className || '').indexOf('fancy-label') !== -1
  const id = filter(x => x, [formName, name, value]).join('-')
  const BaseComponent = isFancy ? FancyBase : Base
  return BaseComponent({
    children: cloneElement(Child, {
      id,
      ...isFancy && {placeholder: ' '}
    }),
    label: label || value || name,
    hint,
    formName,
    id,
    name
  })
}

export default Field
