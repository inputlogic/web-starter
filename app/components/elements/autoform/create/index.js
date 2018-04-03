import {showNotification} from '/components/elements/page-notification'
import request, {getAuthHeader} from '/util/request'
import connect from '/util/connect'

import Base from './base'

const defaultOnSubmit = ({url, successMessage, name}) =>
  ({data, safelyParseJson}) =>
    new Promise((resolve, reject) => {
      const {promise} = request({
        url,
        method: 'POST',
        headers: getAuthHeader(),
        data
      })
      promise
        .then(res => {
          showNotification({success: successMessage})
          resolve()
        })
        .catch(err => {
          console.error(`Error creating ${name}`, err)
          showNotification({error: `Error creating ${name}`})
          reject(safelyParseJson(err.responseText))
        })
    })

export const Create = connect({
  withRequest: (state, {url}) => ({schema: {url, method: 'OPTIONS'}})
})(({
  schema,
  name,
  url,
  onSuccess,
  onSubmit,
  successMessage = 'created'
}) =>
  Base({
    schema,
    ...!!schema && {form: {
      name: `autoform${name}`,
      onSubmit: onSubmit || defaultOnSubmit({url, successMessage, name})
    }}
  })
)

export default Create
