import {pick, find, map} from 'wasmuth'
import {dispatch, set} from '/store'
import withState from '/util/withState'
import Base from './base'

export const Image = withState(
  ({loadedImages = {}}, {images}) => ({
    loadedImages: pick(map(i => i.url, images), loadedImages)
  })
)(({images, loadedImages}) => {
  const bestAvailableImage = find(i => !!loadedImages[i.url], images.slice().reverse()) || {}
  return Base({
    images,
    imageDidLoad: i => dispatch(set(['loadedImages', i.url], true)),
    imageUrl: bestAvailableImage.url,
    imageClass: bestAvailableImage.class
  })
})

export default Image
