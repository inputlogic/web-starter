import {QueryCheckbox} from '/project/elements/styled-form/checkbox'
export const AdminHeader = () =>
  <div className='admin-header' >
    <a href='http://localhost:8000/admin' target='_blank' native>admin</a>
    <QueryCheckbox name='editMode'>edit mode</QueryCheckbox>
  </div>

export default AdminHeader
