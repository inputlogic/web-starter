import {post} from '/services/api'
import connect from '/util/connect'

import Base from './base'

export const Create = connect({
  withRequest: (state, {url}) => ({schema: {url, method: 'OPTIONS'}})
})(({
  schema,
  name,
  url,
  successMessage = 'created'
}) =>
  Base({
    schema,
    ...!!schema && {form: {
      name: `autoform${name}`,
      onSubmit: ({data, safelyParseJson, showNotification}) =>
        new Promise((resolve, reject) => {
          post({url, data})
            .then(res => {
              showNotification({success: successMessage})
              resolve()
            })
            .catch(err => {
              console.error(`Error creating ${name}`, err)
              reject(safelyParseJson(err.responseText))
            })
        })
    }}
  })
)

export default Create
