import connect from '/util/connect'
import apiUrl from '/util/apiUrl'
import Base from './base'

export const AdminHeader = connect({
  withState: state => ({
    isAdmin: W.path(['requests', apiUrl('me'), 'result', 'isAdmin'], state)
  })
})(({isAdmin}) => isAdmin ? Base() : null)

export default AdminHeader
