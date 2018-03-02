import {map} from 'wasmuth'

import DefaultLoader from '/components/elements/loader'

export const ListResource = ({
  isLoading = false,
  results = [],
  child,
  Loader,
  ...props
}) =>
  <div {...props}>
    {isLoading &&
      Loader
        ? <Loader />
        : <DefaultLoader className='med center' />}
    {map(child, results)}
  </div>

export default ListResource
