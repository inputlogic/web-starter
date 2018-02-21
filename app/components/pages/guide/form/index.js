import Base from './base'

export const ExampleForm = () => Base({
  formProps: {
    name: 'example',
    onSubmit: ({data, onComplete, onError}) => {
      console.log(data)
      window.setTimeout(onComplete, 3000)
    },
    validations: {
      name2: v => !v && 'Required',
      password: v => v && v.length < 3 && 'At least 3 characters',
      confirmPassword: (v, _, {password}) => v !== password && 'Must equal password'
    },
    initialData: {
      name: 'Initial Name!',
      checkbox: ['c1'],
      radio: 'r2',
      date: '2018-03-12'
    }
  }
})

export default ExampleForm
