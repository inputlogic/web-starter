import Helmet from 'preact-helmet'
import {urlFor} from '/util/route'
import Loader from '/project/elements/loader'

export const Users = ({user, isLoading}) =>
  <div>
    <Helmet
      title={`Web Starter | ${user.name}`}
    />
    {isLoading
      ? <Loader className='med center' />
      : <div>
        <h1>{user.name}</h1>
        <p>{user.email}</p>
      </div>}
    <p><a href={urlFor('users')}>&larr; Back to all Users</a></p>
  </div>

export default Users
