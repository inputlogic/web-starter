import {path, reduce, some} from 'wasmuth'
import {getState, dispatch, set} from '/store'
import {compose} from '/util/compose'
import Base from './base'

export const Form = compose({
  componentWillMount () {
    this.props.initialData && dispatch(set(
      ['forms', this.props.name],
      this.props.initialData
    ))
  },
  render ({
    name,
    onSubmit,
    validations = {},
    initialData = {},
    ...props
  }) {
    return Base({
      onSubmit: ev => {
        ev.preventDefault()
        const data = path(['forms', name], getState())
        const errors = validate(data, validations)
        dispatch(set(['formErrors', name], errors))
        if (some(x => x, Object.values(errors))) {
          return
        }
        dispatch(set(['formState', name, 'submitting'], true))
        onSubmit({
          data,
          onComplete: () => dispatch(set(['formState', name, 'submitting'], false)),
          onError: (errors) => {
            errors && dispatch(set(['formErrors', name], errors))
            dispatch(set(['formState', name, 'submitting'], false))
          }
        })
      },
      ...props
    })
  }
})

export default Form

const validate = (data, validations) =>
  reduce(
    (acc, key) => ({
      [key]: validations[key](data[key], key, data),
      ...acc
    }),
    {},
    Object.keys(validations)
  )
