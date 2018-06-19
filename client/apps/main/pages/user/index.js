import connect from '/util/connect'
import getRouteIdFromState from '/util/getRouteIdFromState'
import Base from './base'

export default connect({
  withRequests: state => {
    const id = getRouteIdFromState(state)
    console.log('id', id)
    return {
      ...!!id && {
        user: {
          url: 'https://jsonplaceholder.typicode.com/users/' + id,
          parse: res => {
            const user = res.result
            return {result: user, isLoading: user == null}
          }
        }
      }
    }
  }
})(({user: {result, isLoading}, ...props}) =>
  Base({
    user: result || {},
    isLoading,
    ...props
  })
)
