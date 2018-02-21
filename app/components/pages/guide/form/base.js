import {map} from 'wasmuth'
import {SubmitButton, Input, Form, Field} from '/components/elements/form2'

export const ExampleForm = ({formProps}) =>
  <div>
    <Form {...formProps}>
      {map(
        C =>
          <div>
            <Field>
              {C}
            </Field>
          </div>,
        [
          <Input name='name' />,
          <Input name='name2' trackOnInput trackFocus />,
          <Input name='email' type='email' />,
          <Input name='password' type='password' className='fancy-label' />,
          <Input name='confirmPassword' type='password' />,
          <Input name='checkbox' type='checkbox' value='c1' />,
          <Input name='checkbox' type='checkbox' value='c2' />,
          <Input name='radio' type='radio' value='r1' />,
          <Input name='radio' type='radio' value='r2' />,
          <Input name='date' type='date' />,
          <Input name='number' type='number' />
        ]
      )}
      <SubmitButton>Submit</SubmitButton>
    </Form>
  </div>

export default ExampleForm
