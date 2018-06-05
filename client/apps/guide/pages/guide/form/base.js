import {TextArea, Select, SubmitButton, Input, Form} from '/project/elements/form'
import {Checkbox} from '/project/elements/styled-form/checkbox'
import {Field} from '/project/elements/styled-form/field'

const TextField = ({label, hint, ...props}) =>
  <Field fancy label={label} hint={hint} >
    <Input {...props} />
  </Field>

export const ExampleForm = ({formProps}) =>
  <div>
    <Form {...formProps}>
      <TextField className='textinput' name='name' />
      <Field fancy>
        <Input className='textinput' name='name2' trackOnInput trackFocus />
      </Field>
      <Checkbox name='checkbox' value='c1'>checkbox</Checkbox>
      <div>
        <Input name='radio' type='radio' value='r1' />
        <label for='example-radio-r1' >radio 1</label>
      </div>
      <div>
        <Input name='radio' type='radio' value='r2' />
        <label for='example-radio-r2' >radio 2</label>
      </div>
      <Field>
        <Input name='date' type='date' />
      </Field>
      <Field fancy>
        <Input className='textinput' name='number' type='number' />
      </Field>
      <Field>
        <Select name='options' >
          <option value='1'>Option 1</option>
          <option value='2'>Option 2</option>
        </Select>
      </Field>
      <Field>
        <TextArea className='textinput' name='textarea' trackOnInput trackFocus />
      </Field>
      <SubmitButton className='btn' >submit</SubmitButton>
    </Form>
  </div>

export default ExampleForm
