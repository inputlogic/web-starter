import connect from '/util/connect'
import Base from './base'

export default connect({
  withRequests: state => ({
    user: {
      url: 'https://jsonplaceholder.typicode.com/users/1'
    }
  })
})(props =>
  Base({
    url: 'https://jsonplaceholder.typicode.com/users',
    ...props
  })
)
