import apiUrl from '/util/apiUrl'
import Base from './base'

export const AutoForm = () =>
  Base({
    form: {
      name: 'user',
      // url: apiUrl('users')
      url: apiUrl('signup')
    }
  })

export default AutoForm
