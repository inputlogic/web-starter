export const Base = ({input, InputComponent, id, label, children}) =>
  <div>
    <InputComponent id={id} {...input} />
    <label for={id}>
      {label != null ? label : '\u00A0'}
      {children}
    </label>
  </div>

export default Base
