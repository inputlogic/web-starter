import {Field, Input} from '/project/elements/form'

export default ({focus, type, name, formName, ...props}) =>
  <Field formName={formName} {...props}>
    <Input focus={focus} type={type} formName={formName} name={name} />
  </Field>
