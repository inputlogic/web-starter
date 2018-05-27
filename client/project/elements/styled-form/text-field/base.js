import Field from '../field'
import {Input} from '/project/elements/form'

export default ({focus, type, name, formName, trim, ...props}) =>
  <Field formName={formName} {...props}>
    <Input focus={focus} type={type} formName={formName} name={name} trim={trim} />
  </Field>
