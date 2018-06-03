import {route} from 'preact-router'
import {urlFor} from '/util/route'
import {dispatch} from '/store'
import connect from '/util/connect'
import apiUrl from '/util/apiUrl'
import Base from './base'

export const Header = connect({
  withRequests: state => ({
    ...!!state.token && {me: {url: apiUrl('me')}}
  })
})(({me}) => Base({
  isAuthenticated: !!me,
  onClickLogout: (ev) => {
    ev.preventDefault()
    W.safeWindow('localStorage.removeItem', 'token')
    dispatch({type: 'LOGOUT'})
    route(urlFor('login'))
  }
}))

export default Header
