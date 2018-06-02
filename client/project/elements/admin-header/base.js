import {Checkbox} from '/project/elements/query-form/checkbox'
export const AdminHeader = () =>
  <div className='admin-header' >
    <a href='http://localhost:8000/admin' target='_blank' native>admin site</a>
    <Checkbox name='editMode'>edit mode</Checkbox>
  </div>

export default AdminHeader
