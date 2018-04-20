import Base from './base'

export default (props) =>
  Base({
    url: 'https://jsonplaceholder.typicode.com/users',
    ...props
  })
