import {confirmsField, minLength, validators, required} from '/components/elements/form2/validators'
import Base from './base'

export const ExampleForm = () => Base({
  formProps: {
    name: 'example',
    onSubmit: ({data, onComplete, onError}) => {
      console.log(data)
      window.setTimeout(onComplete, 3000)
    },
    validations: {
      name: validators([required, v => v !== 'Dale Cooper' && 'Must be Dale Cooper']),
      name2: v => !v && 'Required',
      password: minLength(3),
      confirmPassword: confirmsField('password')
    },
    initialData: {
      name: 'Initial Name!',
      checkbox: ['c1'],
      radio: 'r2',
      date: '2018-03-12',
      textarea: 'Hello',
      options: '1'
    }
  }
})

export default ExampleForm
