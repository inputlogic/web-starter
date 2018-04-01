import {withState} from '/store'
import Base from './base'

export const NotFound = withState(
  ({didMatchRoute}) => ({didMatchRoute})
)(Base)

export default NotFound
