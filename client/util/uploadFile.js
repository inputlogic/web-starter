import {post} from '/util/api'

const uploadToS3 = (file, s3Data) => {
  let formData = new window.FormData()
  for (const key in s3Data.fields) {
    formData.append(key, s3Data.fields[key])
  }
  formData.append('file', file)
  return window.fetch(s3Data.url, {method: 'POST', body: formData})
}

export default function uploadFile (file) {
  return new Promise((resolve, reject) => {
    let fileUrl
    let fileId
    let s3Data
    post('files')
      .then(({data, url, file_id: id}) => {
        fileUrl = url
        fileId = id
        s3Data = data
        return uploadToS3(file, data)
      })
      .then(_ => {
        resolve({fileUrl, fileId, s3Data})
      })
      .catch(err => {
        log.error('Unable to uploadFile', err)
        reject(err)
      })
  })
}
