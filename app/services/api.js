import check from 'check-arg-types'
import toCamelCase from 'to-camel-case'
import toSnakeCase from 'to-snake-case'
import queryString from 'query-string'
import {
  request,
  pipe,
  toPairs,
  fromPairs,
  map
} from 'wasmuth'

import {dispatch, set} from '/store'
import {API_URL, IG_REDIRECT_URL} from '/settings'

const toType = check.prototype.toType

const caseMapper = (fn) => pipe(
  toPairs,
  map(([k, v]) => ([
    fn(k),
    toType(v) === 'object'
      ? caseMapper(fn)(v)
      : v
  ])),
  fromPairs
)

const mapCamelCase = caseMapper(toCamelCase)
export const mapSnakeCase = caseMapper(toSnakeCase)

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
        console.warn('401', this.responseText)
        logout()
        break

      case 402:
        console.error('User subscription is no longer valid! @TODO: this need to be handled.')
        break

      case 403:
        console.warn('403', this.responseText)
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

export function getSignedFile (file) {
  return post(`files`, {
    headers: getAuthHeader(),
    mapResponse: false
  })
}

export function uploadFile (file, s3Data) {
  let formData = new window.FormData()
  for (const key in s3Data.fields) {
    formData.append(key, s3Data.fields[key])
  }
  formData.append('file', file)
  return makeExternalRequest(s3Data.url, {data: formData, method: 'POST'})
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
  if (opts.mapResponse === undefined) opts.mapResponse = true
  if (endpoint[0] === '/') endpoint.slice(1)
  const {promise, xhr} = request({
    ...opts,
    url: `${API_URL}/${endpoint}`
  })
  return new Promise((resolve, reject) => {
    promise
      .then(res => {
        if (!res || !opts.mapResponse) {
          resolve(res, xhr)
        } else {
          let mapped = (toType(res) === 'array')
            ? map(mapCamelCase, res)
            : mapCamelCase(res)
          if (mapped.results) {
            mapped.results = map(mapCamelCase, mapped.results)
          }
          resolve(mapped, xhr)
        }
      })
      .catch(() => reject(safelyParseJson(xhr.responseText)))
  })
}

function safelyParseJson (str) {
  try {
    return JSON.parse(str)
  } catch (_) {
    return {non_field_errors: str}
  }
}
