import {ErrorOrHint} from '/project/elements/form/error-or-hint'

export const Field = ({id, formName, name, label, hint = '', children}) =>
  <div className='form-row'>
    <label htmlFor={id}>{label}</label>
    {children}
    <ErrorOrHint formName={formName} name={name} hint={hint} />
  </div>

export const FancyField = ({id, formName, name, label, hint = '', children}) =>
  <div className='form-row'>
    <div className='label-wrap'>
      {children}
      <label htmlFor={id}><div>{label}</div></label>
    </div>
    <ErrorOrHint formName={formName} name={name} hint={hint} />
  </div>

export default Field
