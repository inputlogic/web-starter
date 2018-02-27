import {TextArea, Select, SubmitButton, Input, Form, Field} from '/components/elements/form2'

const TextField = ({label, hint, ...props}) =>
  <Field fancy label={label} hint={hint} >
    <Input {...props} />
  </Field>

const Checkbox = ({label, hint, ...props}) =>
  <Field label={label} hint={hint} >
    <Input type='checkbox' {...props} />
  </Field>

export const ExampleForm = ({formProps}) =>
  <div>
    <Form {...formProps}>
      <TextField name='name' />
      <Field fancy>
        <Input name='name2' trackOnInput trackFocus />
      </Field>
      <Field fancy >
        <Input name='email' type='email' />
      </Field>
      <Field fancy>
        <Input name='password' type='password' />
      </Field>
      <Field fancy>
        <Input name='confirmPassword' type='password' />
      </Field>
      <Checkbox name='checkbox' value='c1' />
      <Field>
        <Input name='checkbox' type='checkbox' value='c2' />
      </Field>
      <Field>
        <Input name='radio' type='radio' value='r1' />
      </Field>
      <Field>
        <Input name='radio' type='radio' value='r2' />
      </Field>
      <Field>
        <Input name='date' type='date' />
      </Field>
      <Field fancy>
        <Input name='number' type='number' />
      </Field>
      <Field>
        <Select name='options' >
          <option value='1'>Option 1</option>
          <option value='2'>Option 2</option>
        </Select>
      </Field>
      <Field>
        <TextArea name='textarea' trackOnInput trackFocus />
      </Field>
      <SubmitButton>submit</SubmitButton>
    </Form>
  </div>

export default ExampleForm
