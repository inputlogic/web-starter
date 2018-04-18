import {withState} from '/store'
import Base from './base'

export const NotFound = withState(
  ({route}) => ({notFound: !route})
)(({notFound}) => notFound ? Base({notFound}) : null)

export default NotFound
