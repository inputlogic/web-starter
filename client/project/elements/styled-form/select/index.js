import {Select as Base} from '/project/elements/form'

export const Select = ({className = 'select', ...props}) =>
  <div className={className}>
    <Base {...props} />
  </div>
