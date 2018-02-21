import {SubmitButton, Input, Form, Field} from '/components/elements/form2'

export const ExampleForm = ({formProps}) =>
  <div>
    <Form {...formProps}>
      <Field fancy>
        <Input name='name' />
      </Field>
      <Field fancy>
        <Input name='name2' trackOnInput trackFocus />
      </Field>
      <Field fancy>
        <Input name='email' type='email' />
      </Field>
      <Field fancy>
        <Input name='password' type='password' />
      </Field>
      <Field fancy>
        <Input name='confirmPassword' type='password' />
      </Field>
      <Field>
        <Input name='checkbox' type='checkbox' value='c1' />
      </Field>
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
      <SubmitButton>submit</SubmitButton>
    </Form>
  </div>

export default ExampleForm
