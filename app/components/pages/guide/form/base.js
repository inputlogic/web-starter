import {map} from 'wasmuth'
import SubmitButton from '/components/elements/form2/submit-button'
import {Error} from '/components/elements/form2/error'
import {Input} from '/components/elements/form2/input'
import {Form} from '/components/elements/form2/form'

export const ExampleForm = ({formProps}) =>
  <div>
    <Form {...formProps}>
      {map(
        C =>
          <div>
            <label>
              {C.attributes.name} {C.attributes.value || ''} <br /> {C}
              <br /><Error formName='example' name={C.attributes.name} />
            </label>
          </div>,
        [
          <Input name='name' formName='example' />,
          <Input name='name2' trackOnInput trackFocus formName='example' />,
          <Input name='email' type='email' formName='example' />,
          <Input name='password' type='password' formName='example' />,
          <Input name='confirmPassword' type='password' formName='example' />,
          <Input name='checkbox' type='checkbox' formName='example' value='c1' />,
          <Input name='checkbox' type='checkbox' formName='example' value='c2' />,
          <Input name='radio' type='radio' value='r1' formName='example' />,
          <Input name='radio' type='radio' value='r2' formName='example' />,
          <Input name='date' type='date' formName='example' />,
          <Input name='number' type='number' formName='example' />
        ]
      )}
      {/*
      {map(
        C => <label>{C.attributes.name} {C.attributes.value || ''} <br /> {C}</label>,
        [
          <Input name='name' formName='example' />,
          <Input name='name2' trackOnInput trackFocus formName='example' />,
          <Input name='email' type='email' formName='example' />,
          <Input name='password' type='password' formName='example' />,
          <Input name='confirmPassword' type='password' formName='example' />,
          <Input name='checkbox' type='checkbox' formName='example' value='c1' />,
          <Input name='checkbox' type='checkbox' formName='example' value='c2' />,
          <Input name='radio' type='radio' value='r1' formName='example' />,
          <Input name='radio' type='radio' value='r2' formName='example' />,
          <Input name='date' type='date' formName='example' />,
          <Input name='number' type='number' formName='example' />
        ]
      )}
      */}
      <SubmitButton name='example' >Submit</SubmitButton>
    </Form>
  </div>

export default ExampleForm
