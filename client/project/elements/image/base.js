import {map} from 'wasmuth'

export const Image = ({
  images,
  imageDidLoad,
  imageUrl,
  imageClass = '',
  className = ''
}) =>
  <div
    style={imageUrl ? {backgroundImage: `url(${imageUrl})`} : ''}
    className={`image ${className} ${imageClass}`}
  >
    {map(
      image =>
        <img
          style='display: none;'
          src={image.url}
          onload={() => imageDidLoad(image)}
          key={window.btoa(image.url)}
        />,
      images
    )}
  </div>

export default Image
