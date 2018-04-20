import ListResource from '/project/elements/list-resource'

export const Users = ({url}) =>
  <div>
    <h1>Users</h1>
    <ListResource url={url}>
      {({name, email}) =>
        <div>
          <h2>{name}</h2>
          <p>{email}</p>
        </div>}
    </ListResource>
  </div>

export default Users
