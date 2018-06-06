import Helmet from 'preact-helmet'
import {urlFor} from '/util/route'
import ListResource from '/project/elements/list-resource'

export const Users = ({url}) =>
  <div>
    <Helmet
      title='Web Starter | Users'
      meta={[
        {name: 'description', content: 'Helmet application'},
        {property: 'og:type', content: 'article'}
      ]}
    />
    <h1>Users</h1>
    <ListResource url={url}>
      {({id, name, email}) =>
        <div>
          <h2><a href={urlFor('user', {args: {id}})}>{name}</a></h2>
          <p>{email}</p>
        </div>}
    </ListResource>
  </div>

export default Users
