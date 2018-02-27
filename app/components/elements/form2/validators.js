import {isEmail as isEmailCheck} from 'wasmuth'

export const validators = functions => (v, k, d) => {
  for (var i in functions) {
    let result = functions[i](v, k, d)
    if (result) {
      return result
    }
  }
}

export const minLength = length => value =>
  (!value || value.length < length) &&
  `Must be at least ${length} character${length === 1 ? '' : 's'} long.`

export const maxLength = length => value =>
  value && value.length > length &&
  `Can't be more than ${length} character${length === 1 ? '' : 's'} long.`

export const isEmail = value => !isEmailCheck(value) && 'Must be a valid email'

export const isPersonsName = value => {
  if (value) {
    const pieces = value.split(' ')
    if (pieces.length < 2 || pieces[1].length === 0) {
      return 'First and last name required.'
    }
  }
}

export const required = value => !value && 'Required.'

export const confirmsField = (field, name) => (value, _, data) =>
  value !== data[field] && `Must equal ${name || field}`
