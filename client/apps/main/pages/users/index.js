import connect from '/util/connect'
import Base from './base'

export default connect({
  withRequest: state => ({
    user: {
      url: 'https://jsonplaceholder.typicode.com/users/1'
    }
  })
})(props =>
  console.log('users') ||
  Base({
    url: 'https://jsonplaceholder.typicode.com/users',
    ...props
  })
)
