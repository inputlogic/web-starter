import withState from '/util/withState'
import Base from './base'

export const NotFound = withState(
  ({route}) => ({notFound: !route})
)(({notFound}) => notFound ? Base({notFound}) : null)

export default NotFound
