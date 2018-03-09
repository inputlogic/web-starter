import {getSignedFile, uploadFile as uploadS3File} from '/services/api'

export default function uploadFile (file) {
  return new Promise((resolve, reject) => {
    let fileUrl
    let fileId
    let s3Data
    getSignedFile()
      .then(({data, url, file_id: id}) => {
        fileUrl = url
        fileId = id
        s3Data = data
        return uploadS3File(file, data)
      })
      .then(_ => {
        resolve({fileUrl, fileId, s3Data})
      })
      .catch(err => {
        console.error('Unable to uploadFile', err)
        reject(err)
      })
  })
}
