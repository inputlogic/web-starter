import {getSignedFile, uploadFile} from '/services/api'
import {dispatch, set, update} from 'store'

export default function uploadImage (formName, path, files) {
  return new Promise((resolve, reject) => {
    const file = files[0]
    let fileUrl
    getSignedFile()
      .then(({s3_data: s3Data, url}) => {
        fileUrl = url
        dispatch(update(['formState', formName], {uploading: true}))
        return uploadFile(file, s3Data)
      })
      .then(resp => {
        dispatch(update(['formState', formName], {uploading: false}))
        dispatch(set(['forms', formName, ...path], fileUrl))
        resolve(fileUrl)
      })
      .catch(err => {
        console.error('uploadImage', err)
        reject(err)
      })
  })
}
