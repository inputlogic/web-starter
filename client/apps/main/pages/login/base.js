import {Form, SubmitButton, TextField, Checkbox} from '/project/elements/styled-form'

export const Login = ({form}) =>
  <div className='card spaced'>
    <h2>Login</h2>
    <Form {...form}>
      <TextField trim type='email' label='Your Email' name='username' />
      <TextField type='password' label='Your Password' name='password' />

      <Checkbox label='Subscibe to your newsletter?' name='newsletter' />

      <SubmitButton className='btn'>Log In</SubmitButton>
    </Form>
  </div>

export default Login
