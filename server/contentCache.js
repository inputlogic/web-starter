import apiUrl from '/util/apiUrl'
import {normalize} from '/project/elements/dynamic'
import request from 'request'
import fs from 'fs'

export default () => {
  request(apiUrl('content'), (err, res, body) => {
    if (err) {
      console.error(err)
      return
    }
    const content = normalize(JSON.parse(body))
    fs.writeFile(
      'public/contentCache.js',
      'export default ' + JSON.stringify(content),
      'utf8',
      (err) => {
        if (err) {
          console.error(err)
        }
      }
    )
  })
}
