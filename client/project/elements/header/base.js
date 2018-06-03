import {Link} from 'preact-router/match'
import {urlFor} from '/util/route'

export default ({onClickLogout, isAuthenticated}) =>
  <div className='main-header'>
    <div>
      <Link href={urlFor('home')} activeClassName='active' >Home</Link>
      <Link href={urlFor('guide')} activeClassName='active' >Guide</Link>
    </div>
    <div>
      {isAuthenticated
        ? <a href='#' onClick={onClickLogout} >Logout</a>
        : <Link href='/login' activeClassName='active' >Login</Link>
      }
    </div>
  </div>
