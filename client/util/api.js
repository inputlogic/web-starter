import {request} from 'wasmuth'

import {dispatch, set} from '/store'
import {API_URL} from '/settings'

const xhr = window.XMLHttpRequest
const nativeOpen = xhr.prototype.open

export const logout = () => {
  window.localStorage.removeItem('token')
  window.localStorage.removeItem('email')
  dispatch(set('token', null))
  window.location.replace('/')
}

xhr.prototype.open = function () {
  this.addEventListener('load', function () {
    if (this.responseURL.indexOf(API_URL) === -1) return
    switch (this.status) {
      case 401:
        log.warning('401', this.responseText)
        logout()
        break

      case 402:
        log.error('User subscription is no longer valid! @TODO: this need to be handled.')
        break

      case 403:
        log.warning('403', this.responseText)
        logout()
        break
    }
  })
  nativeOpen.apply(this, arguments)
}

const getAuthHeader = () => {
  const headers = {}
  const token = window.localStorage.getItem('token')
  if (token) {
    headers.Authorization = `Token ${token}`
  }
  return headers
}

// Helper functions for common requests/routes

export function login (username, password) {
  return post('auth', {data: {username, password}})
}

// Base request functions

export function get (endpoint, opts = {}) {
  return makeRequest(endpoint, {
    headers: getAuthHeader(),
    ...opts,
    method: 'GET'
  })
}

export function patch (endpoint, opts = {}) {
  return makeRequest(endpoint, {
    headers: getAuthHeader(),
    ...opts,
    method: 'PATCH'
  })
}

export function put (endpoint, opts = {}) {
  return makeRequest(endpoint, {...opts, method: 'PUT'})
}

export function post (endpoint, opts = {}) {
  opts.data = opts.data || {}
  return makeRequest(endpoint, {
    ...opts,
    method: 'POST',
    headers: getAuthHeader()
  })
}

export function remove (endpoint, opts = {}) {
  opts.data = opts.data || {}
  return makeRequest(endpoint, {...opts, method: 'DELETE'})
}

// Private functions

function makeRequest (endpoint, opts = {}) {
  if (endpoint[0] === '/') endpoint.slice(1)
  const {promise, xhr} = request({
    ...opts,
    url: `${API_URL}/${endpoint}`
  })
  return new Promise((resolve, reject) => {
    promise
      .then(res => {
        resolve(res, xhr)
      })
      .catch(() => {
        reject(safelyParseJson(xhr.responseText))
      })
  })
}

function safelyParseJson (str) {
  try {
    return JSON.parse(str)
  } catch (_) {
    return {non_field_errors: str}
  }
}
