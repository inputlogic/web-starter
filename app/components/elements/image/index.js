import {pick, find, map} from 'wasmuth'
import {dispatch, set} from '/store'
import mapStateToProps from '/util/mapStateToProps'
import Base from './base'

export const Image = mapStateToProps(
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
