import {route} from 'preact-router'
import {dispatch, set} from '/store'
import {urlFor} from '/util/route'
import {showNotification} from '/project/elements/page-notification'
import request from '/util/request'
import apiUrl from '/util/apiUrl'

import Base from './base'

export const Login = () =>
  Base({
    form: {
      name: 'Login',
      onSubmit: ({data}) => new Promise((resolve, reject) => {
        const {promise} = request({url: apiUrl('login'), method: 'POST', data})
        promise
          .then(({token, userId}) => {
            W.safeWindow('localStorage.setItem', 'token', token)
            dispatch(set('token', token))
            route(urlFor('home'))
          })
          .catch(err => {
            log.error(err)
            showNotification({error: 'Invalid login credentials'})
            reject(err)
          })
      })
    }
  })

export default Login
