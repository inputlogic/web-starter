import Helmet from 'preact-helmet'

// import ListResource from '/project/elements/list-resource'

export const Users = ({user = {}, url}) =>
  <div>
    <Helmet
      title={`Web Starter | ${user.name}`}
      meta={[
        {name: 'description', content: 'Helmet application'},
        {property: 'og:type', content: 'article'}
      ]}
    />
    <h1>Users</h1>
    {user.name}
  </div>

export default Users
